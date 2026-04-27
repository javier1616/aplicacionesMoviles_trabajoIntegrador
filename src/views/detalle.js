import { Navbar } from "../components/navbar.js";
import { Footer } from "../components/footer.js";
import { Header } from "../components/header.js";
import { modalFavoritos } from "../components/modalFavoritos.js";

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
                    <div id = "info-container">
                        <div id="detail-img-container">
                            <img src="" alt="imagen" id="detail-img">
                        </div>
                        <div id="stats-table-container">
                            <dl id="stats-table">
                                <hr>
                                <div class="stats-reg">
                                    <dt>Gran Prix disputados</dt>
                                    <dd id="carreras-data"></dd>
                                </div>
                                <hr>
                                <div class="stats-reg">
                                    <dt>Victorias</dt>
                                    <dd id="victorias-data"></dd>
                                </div>
                                <hr>
                                <div class="stats-reg">
                                    <dt>Podios</dt>
                                    <dd id="podios-data"></dd>
                                </div>
                                <hr>
                                <div class="stats-reg">
                                    <dt>Pole positions</dt>
                                    <dd id="pole-positions-data"></dd>
                                </div>
                                <hr>
                                <div class="stats-reg">
                                    <dt>Fast laps</dt>
                                    <dd id="fast-laps-data"></dd>
                                </div>
                                <hr>
                            </dl>
                        </div>
                    </div>
                    <div id="table-container">
                    <h3 id="last-races-title"></h3>
                    </div>
                    <!--div id="charts-container">
                        <div id="chart">
                            <h5 id="chart-title"> Carreras terminadas vs no terminadas </h5>
                            <canvas id="pieChart"></canvas>
                        </div>
                        <div id="avg-position-number-container">
                            <h5 id="avg-position-number-title"> Δ Posición (prom.) </h5>
                            <h4 id="avg-position-number"></h4>
                        </div>
                    </div-->
                    <div id="championship-table-position-container">
                    <h3 id="championship-one-row-title"></h3>
                    </div>
                    <p id="detail-text"></p>
                </div>
                
            </main>`;
}