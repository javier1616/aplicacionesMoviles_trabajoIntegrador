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
                        <button id="favorite-btn">
                            <img src="./src/assets/icons/star-empty-yellow.svg">
                        </button>
                    </div>
                    <div id="detail-img-container">
                        <img src="" alt="imagen" id="detail-img">
                    </div>
                    <p id="detail-text"></p>
                </div>
            </main>`;
}