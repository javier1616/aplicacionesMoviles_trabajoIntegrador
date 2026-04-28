import { Navbar } from "../components/navbar.js";
import { Footer } from "../components/footer.js";
import { Header } from "../components/header.js";

export function Contacto() {

    
    const viewContainer = document.createElement("div");

    viewContainer.innerHTML += Header("Contacto");

    viewContainer.innerHTML += loadContacto();

    viewContainer.innerHTML += Footer();

    return viewContainer;
}


function loadContacto() {
    return `<main>
                <div id="location-container">
                    <div id="map"></div>
                    <h3 id="location-title">Información de contacto</h3>
                    <ul id="datosDeContacto">
                        <li> Mendez Gabriel / Solís Javier </li>
                        <li> aplicacionesmoviles@unaj.edu.ar</li>
                        <li> (+54) 11 1234 5678</li>
                        <li> Calle 14, 1009 La Plata<br>Bs. As. Argentina </li>
                    </ul>
                </div>
            </main>`
}