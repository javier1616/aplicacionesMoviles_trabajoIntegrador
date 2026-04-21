
import { contactoBehavior } from "./contacto.behavior.js";
import { detailBehavior } from "./detail.behavior.js";

import { getPilotos, getCircuitos } from "../api/http.js";
import { initDataStore, getPilotosStore, getCircuitosStore} from "../utils/store.js";
import { driverCard } from "../components/driversCard.js";
import { circuitCard } from "../components/circuitsCard.js";

import { validarFormulario } from "../utils/validarFormulario.js";
import { sentinels_state } from "../utils/states.js";

export function loadBehavior(path) {

    switch(path){

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
            //detectan cambio -> cargan resultados -> recalculan espacio
            document.getElementById("pilotos-form").addEventListener("input", async (e) => {

                // variables para controlar paginacion ---------------------
                let offset = 0;
                const limit = 10;
                let loading = false;
                let total = Infinity; // después lo pisamos con la API
                // ---------------------------------------------------------

                const form_pilotos = document.getElementById("pilotos-form");
                const resultsContainer = document.getElementById("pilotos-card-container");

                //limpia los resultados anteriores
                resultsContainer.innerHTML = "";

                const nombre = document.getElementById("pilotos-input-search").value;
                const season = form_pilotos.querySelector('input[name="season"]:checked')?.value;
                const nacionalidad = document.getElementById("select-nacionalidad").value;

                validarFormulario(nombre,season,nacionalidad);

                let result;

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
                });

                //recalcula espacio
                const collapse = document.getElementById("accordion-pilotos");
                collapse.style.height = collapse.scrollHeight + "px";

            });

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

            });

            //reseteo estado de los sentinels

            sentinels_state.circuitos = {
                loading: false,
                primeraVez: true,
                offset: 0
            };

            sentinels_state.pilotos = {
                loading: false,
                primeraVez: true,
                offset: 0
            };

            //comportamiento de los Sentinels
            const circuitosSentinel = document.getElementById("circuitos-sentinel");
            const pilotosSentinel = document.getElementById("pilotos-sentinel");

            //Se crea un IntersectionObserver para manejar ambos Sentinels
            //aquí va el comportamiento de los Sentinels
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;

                    if (entry.target.id === "pilotos-sentinel") {
                        if (sentinels_state.pilotos.primeraVez) {
                            sentinels_state.pilotos.primeraVez = false;
                            return;
                        };

                        console.log("Cargar más pilotos");

                    }

                    if (entry.target.id === "circuitos-sentinel") {
                        if (sentinels_state.circuitos.primeraVez) {
                            sentinels_state.circuitos.primeraVez = false;
                            return;
                        };
                        console.log("Cargar más circuitos");
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
    }
}
