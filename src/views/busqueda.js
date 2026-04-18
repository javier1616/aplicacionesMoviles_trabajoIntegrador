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
            </main>`;
}

