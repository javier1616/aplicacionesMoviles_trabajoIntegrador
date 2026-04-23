
import { contactoBehavior } from "./contacto.behavior.js";
import { detailBehavior } from "./detail.behavior.js";
import { teamBehavior } from "./team.behavior.js";

import { getPilotos, getCircuitos, getTeam } from "../api/http.js";
import { initDataStore, getPilotosStore, getCircuitosStore, getNacionalidadesStore, getPaisesStore} from "../utils/store.js";
import { driverCard } from "../components/driversCard.js";
import { circuitCard } from "../components/circuitsCard.js";

import { validarFormulario, formularioVacio } from "../utils/validarFormulario.js";
import { sentinels_state, pilotos_filters_state, circuitos_filters_state } from "../utils/states.js";

export function loadBehavior(path) {

    switch(path){

        case "/":
            
            document.querySelectorAll(".home-team-button").forEach(button => {
                button.addEventListener("click", () => {

                    const constructorId = button.dataset.constructorid;

                    localStorage.setItem("constructorId", constructorId);

                    window.navigate('/team');

                });
            });


        break;

        case "/search":

            //se cargan los select cuando se renderiza la vista
            const select_nacionalidad = document.getElementById("select-nacionalidad");
            const select_pais = document.getElementById("select-pais");

            //necesito ejecutarla de este modo porque debo ejecutarla async
            initDataStore().then(() => {

                //no necesito lo que trae initDataStore, solo necesito
                //que haya cargado los datos

                console.log("verificacion de datos");
                console.log(getNacionalidadesStore());
                console.log(getPaisesStore());

                const nacionalidades = getNacionalidadesStore();
                const paises = getPaisesStore();

                nacionalidades.forEach(n => {
                    select_nacionalidad.innerHTML += `<option value="${n}">${n}</option>`;
                });

                paises.forEach(n => {
                    select_pais.innerHTML += `<option value="${n}">${n}</option>`;
                });

            });
            

            //comportamiento del accordion
            document.querySelectorAll(".accordion-item-header").forEach(button => {
                button.addEventListener("click", () => {

                    const item = button.parentElement;
                    const body = button.nextElementSibling;

                    const isOpen = item.classList.contains("active");

                    // cerrar todos (comportamiento accordion real)
                    document.querySelectorAll(".accordion-item").forEach(i => {
                        i.classList.remove("active");
                        i.querySelector(".accordion-collapse").style.height = null;
                    });

                    // abrir el actual si estaba cerrado
                    if (!isOpen) {
                        item.classList.add("active");
                        body.style.height = body.scrollHeight + "px";
                    }

                });
            });


            //comportamiento de los formularios
            //usa un debounce para no hacer un request en cada input (espera 300ms entre inputs)
            document.getElementById("pilotos-form")
                    .addEventListener("input", debounce(handlePilotosInput, 300));

            document.getElementById("circuitos-form")
                    .addEventListener("input", debounce(handleCircuitosInput, 300));

            

            //reseteo estado de los sentinels
            sentinels_state.circuitos.offset = 0;
            sentinels_state.circuitos.limit = 10;
            sentinels_state.circuitos.total = Infinity;
            
            sentinels_state.pilotos.offset = 0;
            sentinels_state.pilotos.limit = 10;
            sentinels_state.pilotos.total = Infinity;


            //comportamiento de los Sentinels
            const circuitosSentinel = document.getElementById("circuitos-sentinel");
            const pilotosSentinel = document.getElementById("pilotos-sentinel");


            //Se crea un IntersectionObserver para manejar ambos Sentinels
            //aquí va el comportamiento de los Sentinels
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;

                    if (entry.target.id === "pilotos-sentinel") {
                        console.log("pilotos sentinel detectado")
                        console.log("primeraVez ?: " + sentinels_state.pilotos.primeraVez)
                        if (sentinels_state.pilotos.primeraVez) {
                            sentinels_state.pilotos.primeraVez = false;
                            console.log("cambia a false");
                            return;
                        };

                        const form_pilotos = document.getElementById("pilotos-form");
                        const nombre = document.getElementById("pilotos-input-search").value;
                        const season = form_pilotos.querySelector('input[name="season"]:checked')?.value;
                        const nacionalidad = document.getElementById("select-nacionalidad").value;
    

                        console.log("Cargar más pilotos");
                        console.log("nombre: " + nombre + " season: " + season + " nacionalidad: " + nacionalidad );
                        if(!formularioVacio(nombre,season,nacionalidad))
                        {
                            //esta busqueda evita un bug --> abris accordion metes datos erroneos, lo cerras y lo abris

                            const error_nombre = document.getElementById("pilotos-error-nombre");
                            const error_season = document.getElementById("pilotos-error-season");

                            //guarda el estado del filtro
                            const errores = validarFormulario(nombre,season,nacionalidad,getNacionalidadesStore());
                            console.log("errores: ", JSON.stringify(errores));

                            if(Object.keys(errores).length > 0)
                            {
                                const errorNombre = errores.find(e => e.error === "nombre");
                                const errorSeason = errores.find(e => e.error === "season");
                            
                                if (errorNombre){
                                    error_nombre.textContent = errorNombre.message;
                                    error_nombre.style.display = "block";
                                }

                                if (errorSeason) {
                                    error_season.textContent = errorSeason.message;
                                    error_season.style.display = "block";
                                }

                                return;     //si hay errores corta la ejecución
                            } else {
                                console.log("no hay errores, buscando y filtrando...");
                            };

                            console.log("para que no tire error tenes que validar errores del formulario para que no cargue pilotos con datos erroneos")
                            
                            
                            cargarPilotos();  //carga mas pilotos cuando llega al sentinel
                        }
                        else
                        {
                            console.log("... ops, formulario vacio")
                        }

                        //recalcula espacio
                        const collapse = document.getElementById("accordion-pilotos");
                        collapse.style.height = collapse.scrollHeight + "px";
                        console.log("recalcula espacio");

                    }

                    if (entry.target.id === "circuitos-sentinel") {
                        console.log("circuitos sentinel detectado")
                        console.log("primeraVez ?: " + sentinels_state.circuitos.primeraVez)
                        if (sentinels_state.circuitos.primeraVez) {
                            sentinels_state.circuitos.primeraVez = false;
                            console.log("cambia a false");
                            return;
                        };

                        const form_circuitos = document.getElementById("circuitos-form");
                        const nombre = document.getElementById("circuitos-input-search").value;
                        const season = form_circuitos.querySelector('input[name="season"]:checked')?.value;
                        const pais = document.getElementById("select-pais").value;
    

                        console.log("Cargar más circuitos");

                        console.log("nombre: " + nombre + " season: " + season + " pais: " + pais );
                        if(!formularioVacio(nombre,season,pais))
                        {
                            //esta busqueda evita un bug --> abris accordion metes datos erroneos, lo cerras y lo abris

                            const error_nombre = document.getElementById("pilotos-error-nombre");
                            const error_season = document.getElementById("pilotos-error-season");

                            //guarda el estado del filtro
                            const errores = validarFormulario(nombre,season,pais,getPaisesStore());
                            console.log("errores: ", JSON.stringify(errores));

                            if(Object.keys(errores).length > 0)
                            {
                                const errorNombre = errores.find(e => e.error === "nombre");
                                const errorSeason = errores.find(e => e.error === "season");
                            
                                if (errorNombre){
                                    error_nombre.textContent = errorNombre.message;
                                    error_nombre.style.display = "block";
                                }

                                if (errorSeason) {
                                    error_season.textContent = errorSeason.message;
                                    error_season.style.display = "block";
                                }

                                return;     //si hay errores corta la ejecución
                            } else {
                                console.log("no hay errores, buscando y filtrando...");
                            };

                            console.log("para que no tire error tenes que validar errores del formulario para que no cargue pilotos con datos erroneos")


                            cargarCircuitos(); //carga mas circuitos cuando llega al sentinel
                        }
                        else
                        {
                            console.log("... ops, formulario vacio")
                        }

                        //recalcula espacio
                        const collapse = document.getElementById("accordion-circuitos");
                        collapse.style.height = collapse.scrollHeight + "px";
                        console.log("recalcula espacio");

                    }
                });

            });


        observer.observe(circuitosSentinel);
        observer.observe(pilotosSentinel);

        break;

        case "/detail":
            detailBehavior();
        break;

        case "/contact":
            contactoBehavior();
        break;

        case "/team":
            teamBehavior();
        break;

    }
}

//crea un delay para que, al escribir una cadena de varios caracteres,
//no se dispare un request por cada input
function debounce(fn, delay) {

    let timeout;

    return function (...args) {
        clearTimeout(timeout); // cancela el anterior

        timeout = setTimeout(() => {
            fn.apply(this, args); // ejecuta después del delay
        }, delay);
    };
}

async function handlePilotosInput() {

    const resultsContainer = document.getElementById("pilotos-card-container");
    const form_pilotos = document.getElementById("pilotos-form");
    
    //limpia los resultados anteriores
    resultsContainer.innerHTML = "";

    //resetea espacio
    const collapse = document.getElementById("accordion-pilotos");
    collapse.style.height = "auto";

    console.log("cuando hago un input deberia pasar por aca");
    //reseteo mensajes de error
    const error_season = document.getElementById("pilotos-error-season");
    const error_nombre = document.getElementById("pilotos-error-nombre");
    error_season.style.display = "none";
    error_nombre.style.display = "none";

    
    const nombre = document.getElementById("pilotos-input-search").value;
    const season = form_pilotos.querySelector('input[name="season"]:checked')?.value;
    const nacionalidad = document.getElementById("select-nacionalidad").value;
    

    //guarda el estado del filtro
    const errores = validarFormulario(nombre,season,nacionalidad,getNacionalidadesStore());

    console.log("errores: ", JSON.stringify(errores));
    
    

    if(Object.keys(errores).length > 0)
    {
        const errorNombre = errores.find(e => e.error === "nombre");
        const errorSeason = errores.find(e => e.error === "season");

        if (errorNombre){
            error_nombre.textContent = errorNombre.message;
            error_nombre.style.display = "block";
        }

        if (errorSeason) {
            error_season.textContent = errorSeason.message;
            error_season.style.display = "block";
        }

        return;     //si hay errores corta la ejecución
    } else {
        console.log("no hay errores, buscando y filtrando...");
    };


    pilotos_filters_state.nombre = nombre
    pilotos_filters_state.season = season;
    pilotos_filters_state.nacionalidad = nacionalidad;
    
    //reseteo estados de los sentinels
    sentinels_state.pilotos.offset = 0;
    sentinels_state.pilotos.total = Infinity;
    sentinels_state.pilotos.loading = false;
    
    await cargarPilotos();

    //recalcula espacio
    collapse.style.height = collapse.scrollHeight + "px";

}

async function handleCircuitosInput() {

    const resultsContainer = document.getElementById("circuitos-card-container");
    const form_circuitos = document.getElementById("circuitos-form");
    
    //limpia los resultados anteriores
    resultsContainer.innerHTML = "";

    //resetea espacio
    const collapse = document.getElementById("accordion-circuitos");
    collapse.style.height = "auto";

    console.log("cuando hago un input deberia pasar por aca");
    //reseteo mensajes de error
    const error_season = document.getElementById("circuitos-error-season");
    const error_nombre = document.getElementById("circuitos-error-nombre");
    error_season.style.display = "none";
    error_nombre.style.display = "none";

    
    const nombre = document.getElementById("circuitos-input-search").value;
    const season = form_circuitos.querySelector('input[name="season"]:checked')?.value;
    const pais = document.getElementById("select-pais").value;
    

    //guarda el estado del filtro
    const errores = validarFormulario(nombre,season,pais,getPaisesStore());

    console.log("errores: ", JSON.stringify(errores));
    
    

    if(Object.keys(errores).length > 0)
    {
        const errorNombre = errores.find(e => e.error === "nombre");
        const errorSeason = errores.find(e => e.error === "season");

        if (errorNombre){
            error_nombre.textContent = errorNombre.message;
            error_nombre.style.display = "block";
        }

        if (errorSeason) {
            error_season.textContent = errorSeason.message;
            error_season.style.display = "block";
        }

        return;     //si hay errores corta la ejecución
    } else {
        console.log("no hay errores, buscando y filtrando...");
    };


    circuitos_filters_state.nombre = nombre
    circuitos_filters_state.season = season;
    circuitos_filters_state.pais = pais;
    
    //reseteo estados de los sentinels
    sentinels_state.circuitos.offset = 0;
    sentinels_state.circuitos.total = Infinity;
    sentinels_state.circuitos.loading = false;
    
    await cargarCircuitos();

    //recalcula espacio
    collapse.style.height = collapse.scrollHeight + "px";

}

async function cargarPilotos() {

    let result;
    let data;
    const state = sentinels_state.pilotos;

    if (state.loading) return;
    if (state.offset >= state.total) return;

    state.loading = true;

    const { nombre, season, nacionalidad } = pilotos_filters_state;

    console.log("Buscando por nombre: " + nombre + " season: " + season + " nacionalidad: "+ nacionalidad);

    if (season == "2025" || season == "2026") {
        
        data = await getPilotos(
            season/*,
            state.limit,
            state.offset*/
        );

    } else {

        console.log("buscando en store de pilotos");

        await initDataStore();

        data = getPilotosStore();

        console.log(data);

        
    }

    
    console.log("total registros: " + data.length)

    //algunos pilotos vienen incompletos. Tengo que validarlos
    //ejemplo: {"driverId": "arthur_leclerc","givenName": "Arthur","familyName": "Leclerc"}
    //filtro y uso los que tienen codigo de piloto

    let pilotos_validos = data.filter(piloto => "dateOfBirth" in piloto)
    console.log("pilotos validos: " + pilotos_validos.length)

    //let filtrados = data.filter( piloto =>
    let filtrados = pilotos_validos.filter(piloto =>
        (   piloto.givenName.toLowerCase().includes(nombre.toLowerCase())  ||
            piloto.familyName.toLowerCase().includes(nombre.toLowerCase())     ) &&
            piloto.nationality.toLowerCase().includes(nacionalidad.toLowerCase()) 
    );

    console.log("pilotos filtrados: " + filtrados.length)

    state.total = filtrados.length;

    console.log("coincidencias: " + filtrados.length)
    console.log(filtrados);


    //result tiene la cantidad de filtrados que voy a mostrar
    result = filtrados.slice(
        state.offset,
        state.offset + state.limit
    );


    const container = document.getElementById("pilotos-card-container");

    //cargo el result a la vista
    result.forEach(elem => {
        container.innerHTML += driverCard(elem);
    });


    //recalcula espacio - si lo quitas de aca falla el render en la carga progresiva
    const collapse = document.getElementById("accordion-pilotos");
    collapse.style.height = collapse.scrollHeight + "px";
    console.log("recalcula espacio");


    state.offset += state.limit;

    if (result.length < state.limit) {
        state.total = state.offset;
    }

    state.loading = false;
}



async function cargarCircuitos() {

    let result;
    let data;
    const state = sentinels_state.circuitos;

    if (state.loading) return;
    if (state.offset >= state.total) return;

    state.loading = true;

    const { nombre, season, pais } = circuitos_filters_state;

    console.log("Buscando por nombre: " + nombre + " season: " + season + " pais: "+ pais);

    if (season == "2025" || season == "2026") {
        
        data = await getCircuitos(
            season/*,
            state.limit,
            state.offset*/
        );

    } else {

        console.log("buscando en store de circuitos");

        await initDataStore();

        data = getCircuitosStore();

        console.log(data);

    }

    console.log("circuitos encontrados: " + data.length)

    //algunos pilotos vienen incompletos. Tengo que validarlos
    //PARA CIRCUITOS NI IDEA...
    //ejemplo: {"driverId": "arthur_leclerc","givenName": "Arthur","familyName": "Leclerc"}
    //filtro y uso los que tienen codigo de piloto
    //let pilotos_validos = data.filter(piloto => "code" in piloto)


    //let filtrados = circuitos_validos.filter(piloto =>

    let filtrados = data.filter( circuito =>
        circuito.circuitName.toLowerCase().includes(nombre.toLowerCase()) &&
        circuito.Location.country.toLowerCase().includes(pais.toLowerCase())
    );

    console.log("circuitos filtrados: " + filtrados.length)

    state.total = filtrados.length;

    console.log("coincidencias: " + filtrados.length)
    console.log(filtrados);


    //result tiene la cantidad de filtrados que voy a mostrar
    result = filtrados.slice(
        state.offset,
        state.offset + state.limit
    );


    const container = document.getElementById("circuitos-card-container");

    //cargo el result a la vista
    result.forEach(elem => {
        container.innerHTML += circuitCard(elem);
    });


    //recalcula espacio - si lo quitas de aca falla el render en la carga progresiva
    const collapse = document.getElementById("accordion-circuitos");
    collapse.style.height = collapse.scrollHeight + "px";
    console.log("recalcula espacio");


    state.offset += state.limit;

    if (result.length < state.limit) {
        state.total = state.offset;
    }

    state.loading = false;
}