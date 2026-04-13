import { Navbar } from "../components/navbar.js";
import { Footer } from "../components/footer.js";
import { Header } from "../components/header.js";

export function Contacto() {

    
    const viewContainer = document.createElement("div");

    viewContainer.innerHTML += Header("Información de Contacto");

    viewContainer.innerHTML += loadContacto();

    viewContainer.innerHTML += Footer();

    return viewContainer;
}


function loadContacto() {
    return `<main>
                    <h5> Desarrolladores: </h5>
                    <h5> Email: </h5>
                    <h5> Teléfono: </h5>
                    <h5> Dirección: </h5>
                <h1>Ubicación</h1>
                <div id="map"></div>
            </main>`
}