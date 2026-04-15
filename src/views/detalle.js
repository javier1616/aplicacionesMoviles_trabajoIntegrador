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
                <div id="details_container">
                    <div id="detail_header">
                        <h3 id="detail_title"></h3>
                        <button id="favorite_btn">Agregar a favoritos</button>
                    </div>
                    <img src="" alt="imagen" id="detail_image">
                    <p id="detail_text"></p>
                </div>
            </main>`;
}