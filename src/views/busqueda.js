import { Footer } from "../components/footer.js";
import { Header } from "../components/header.js";
import { accordion } from "../components/accordion.js";

export function Busqueda() {
    
    const viewContainer = document.createElement("div");

    viewContainer.innerHTML += Header("Buscar");

    viewContainer.innerHTML += loadBusqueda();

    viewContainer.innerHTML += Footer();

    return viewContainer;
}


function loadBusqueda() {

    return `<main>
                <div id="accordion-container">${accordion()}</div>
                <button id="pilotos_btn">Pilotos</button>
                <button id="circuitos_btn">Circuitos</button>
                <textarea id="response_data" name="response"></textarea> 
                <div id="results_container"></div>  
            </main>`;
    

}

