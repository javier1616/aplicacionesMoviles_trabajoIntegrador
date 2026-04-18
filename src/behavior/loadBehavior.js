
//import { getCircuitos,getPilotos } from "./busqueda.behavior.js";
import { contactoBehavior } from "./contacto.behavior.js";
import { detailBehavior } from "./detail.behavior.js";

import { getPilotosPosta, getCircuitosPosta } from "../api/http.js";
import { driverCard } from "../components/driversCard.js";
import { circuitCard } from "../components/circuitsCard.js";

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

                const form_pilotos = document.getElementById("pilotos-form");
                const resultsContainer = document.getElementById("pilotos-card-container");

                resultsContainer.innerHTML = "";

                const nombre = document.getElementById("pilotos-input-search").value;
                const season = form_pilotos.querySelector('input[name="season"]:checked')?.value;
                const nacionalidad = document.getElementById("select-nacionalidad").value;

                console.log("Buscando piloto");
                console.log("nombre: " + nombre + " season: " + season + " nacionalidad: " + nacionalidad);

                const result = await getPilotosPosta(nombre,season,nacionalidad);

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

                const result = await getCircuitosPosta(nombre,season,pais);

                console.log("Datos obtenidos");
                console.log(result);

                result.forEach( elem => {
                    resultsContainer.innerHTML += circuitCard(elem);
                });

                //recalcula espacio
                const collapse = document.getElementById("accordion-pilotos");
                collapse.style.height = collapse.scrollHeight + "px";

            });
        break;

        case "/detail":
            detailBehavior();
        break;

        case "/contact":
            contactoBehavior();
        break;
    }
}
