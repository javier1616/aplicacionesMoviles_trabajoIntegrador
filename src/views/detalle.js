import { Navbar } from "../components/navbar.js";
import { Footer } from "../components/footer.js";
import { Header } from "../components/header.js";

export function Detalle() {

    
    const viewContainer = document.createElement("div");

    viewContainer.innerHTML += Header("Detalle");

    viewContainer.innerHTML += loadDetalle();

    viewContainer.innerHTML += Footer();

    return viewContainer;
}


function loadDetalle() {
    return `<main>
                <div id="detail-container">
                    <div id="detail-header">
                        <h3 id="detail-title"></h3>
                        <button id="favorite_btn">Agregar a favoritos</button>
                    </div>
                    <img src="" alt="imagen" id="detail-img">
                    <p id="detail_text"></p>
                </div>
            </main>`;
}