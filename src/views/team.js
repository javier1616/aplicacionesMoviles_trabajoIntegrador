import { Navbar } from "../components/navbar.js";
import { Footer } from "../components/footer.js";
import { Header } from "../components/header.js";

export function Team() {

    const viewContainer = document.createElement("div");

    viewContainer.innerHTML += Header("Escuderia");

    viewContainer.innerHTML += loadTeam();

    viewContainer.innerHTML += Footer();

    return viewContainer;
}


function loadTeam() {
    return `<main>
                <div id="team-container">
                    <div id="team-header">
                        <h3 id="team-title"></h3>
                    </div>
                    <img id="team-car-img">
                    <div id="team-driver-card-container">
                        Para hacer la relacion entre pilotos y team traete los datos de los pilotos de la primer carrera
                    </div>
                    <p id="team-text">
                        puntos del campeonato de constructores
                    </p>
                </div>
            </main>`;
}