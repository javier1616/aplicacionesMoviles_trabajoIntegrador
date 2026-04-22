
import { contactoBehavior } from "./contacto.behavior.js";
import { detailBehavior } from "./detail.behavior.js";
import { teamBehavior } from "./team.behavior.js";

import { getPilotos, getCircuitos, getTeam } from "../api/http.js";
import { initDataStore, getPilotosStore, getCircuitosStore} from "../utils/store.js";
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

                            const error_nombre = document.getElementById("error-nombre");
                            const error_season = document.getElementById("error-season");

                            //guarda el estado del filtro
                            const errores = validarFormulario(nombre,season,nacionalidad);
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
                            return;
                        };

                        console.log("Cargar más circuitos");
                        cargarCircuitos(); //carga mas circuitos cuando llega al sentinel
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
    const error_season = document.getElementById("error-season");
    const error_nombre = document.getElementById("error-nombre");
    error_season.style.display = "none";
    error_nombre.style.display = "none";

    
    const nombre = document.getElementById("pilotos-input-search").value;
    const season = form_pilotos.querySelector('input[name="season"]:checked')?.value;
    const nacionalidad = document.getElementById("select-nacionalidad").value;
    

    //guarda el estado del filtro
    const errores = validarFormulario(nombre,season,nacionalidad);

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
            season,
            state.limit,
            state.offset
        );

    } else {

        console.log("buscando en store de pilotos");

        await initDataStore();

        data = getPilotosStore();

        console.log(data);

        
    }

    //algunos pilotos vienen incompletos. Tengo que validarlos
    //ejemplo: {"driverId": "arthur_leclerc","givenName": "Arthur","familyName": "Leclerc"}
    //filtro y uso los que tienen codigo de piloto

    let pilotos_validos = data.filter(piloto => "code" in piloto)

    let filtrados = pilotos_validos.filter(piloto =>
        piloto.givenName.toLowerCase().includes(nombre.toLowerCase()) ||
        piloto.familyName.toLowerCase().includes(nombre.toLowerCase())
    );

    state.total = filtrados.length;

    console.log("coincidencias: " + filtrados.length)


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
    console.log("cargarCircuitos todavia no esta implementada");
}




/*
            document.getElementById("circuitos-form").addEventListener("input", async (e) => {

                const form_circuitos = document.getElementById("circuitos-form");
                const resultsContainer = document.getElementById("circuitos-card-container");

                resultsContainer.innerHTML = "";

                const nombre = document.getElementById("circuitos-input-search").value;
                const season = form_circuitos.querySelector('input[name="season"]:checked')?.value;
                const pais = document.getElementById("select-pais").value;

                console.log("Buscando circuito");
                console.log("nombre: " + nombre + " season: " + season + " pais: " + pais);

                const result = await getCircuitos(nombre,season,pais);

                console.log("Datos obtenidos");
                console.log(result);

                result.forEach( elem => {
                    resultsContainer.innerHTML += circuitCard(elem);
                });

                //recalcula espacio
                const collapse = document.getElementById("accordion-pilotos");
                collapse.style.height = collapse.scrollHeight + "px";

            });*/



/*
async function cargarPilotos(){

    let result;

    if (pilotosState.loading) return;
    if (pilotosState.offset >= pilotosState.total) return;


    /*
                if( season == "2025" || season == "2026" )
                {
                    result = await getPilotos(nombre,season,nacionalidad, limit, offset);
                }
                else
                {
                    console.log("trae todos porque no tiene forma de filtrar por API + carga progresiva")
                    //ACA DEBO REVISAR Y ASEGURARME DE QUE ESTEN CARGADOS LOS DATOS
                    // Nos aseguramos que terminó (si ya terminó, pasa instantáneo)
                    await initDataStore(); 
                    result = getPilotosStore();
                }

                console.log("Datos obtenidos");
                console.log(result);

                result.forEach( elem => {
                    resultsContainer.innerHTML += driverCard(elem);
                });*

    

    pilotosState.loading = true;

    const { nombre, season, nacionalidad } = pilotosState.filtros;

    

    if (season == "2025" || season == "2026") {

        result = await getPilotos(
            nombre,
            season,
            nacionalidad,
            pilotosState.limit,
            pilotosState.offset
        );

        // ⚠️ depende de tu API
        pilotosState.total = result.total ?? Infinity;
        result = result.data ?? result;

    } else {

        await initDataStore();

        let data = getPilotosStore();

        pilotosState.total = data.length;

        result = data.slice(
            pilotosState.offset,
            pilotosState.offset + pilotosState.limit
        );
    }

    const container = document.getElementById("pilotos-card-container");

    result.forEach(elem => {
        container.innerHTML += driverCard(elem);
    });

    // 👉 avanzar paginación
    pilotosState.offset += pilotosState.limit;

    pilotosState.loading = false;

}
*/