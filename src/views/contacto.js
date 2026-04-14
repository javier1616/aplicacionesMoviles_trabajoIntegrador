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
                <h3>Ubicación</h3>
                <div id="map"></div>
                <h3> Contactanos</h3>
                <ul id="datosDeContacto">
                    <li> Desarrolladores:<br>Mendez Gabriel / Solís Javier </li>
                    <li> Email: aplicacionesmoviles@unaj.edu.ar</li>
                    <li> Teléfono: (+54) 11 1234 5678</li>
                    <li> Dirección: Calle 14, 1009 La Plata<br>Bs. As. Argentina </li>
                </ul>
            </main>`
}