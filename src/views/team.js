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
                    <img id="team-logo-image-url">
                    <img id="team-car-img">
                    <div id="constructors-championship-table-position-container">
                        <h3 id="constructors-championship-one-row-title"></h3>
                    </div>
                    <div id="team-drivers-container">
                        <div id="driver01" class="driver-container">
                            <div class="team-driver-img-container">
                                <img src="" alt="imagen" id="detail-img01" class="driver-img">
                            </div>
                            <small id="driver01-name"></small>
                        </div>
                        <div id="driver02" class="driver-container">
                            <div class="team-driver-img-container">
                                <img src="" alt="imagen" id="detail-img02" class="driver-img">
                            </div>
                            <small id="driver02-name"></small>
                        </div>
                    </div>
                    <p id="team-text">
                    </p>
                </div>
            </main>`;
}