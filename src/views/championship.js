import { Footer } from "../components/footer.js";
import { Header } from "../components/header.js";
import { driversChampionshipTable } from "../components/driversChampionshipTable.js";
import { constructorsChampionshipTable } from "../components/constructorsChampionshipTable.js";

export function Championship() {
    
    const viewContainer = document.createElement("div");

    viewContainer.innerHTML += Header("Campeonato");

    viewContainer.innerHTML += loadChampionship();

    viewContainer.innerHTML += Footer();

    return viewContainer;
}


function loadChampionship() {

    return `<main>
                <section id="championship-container">
                    <section id="championship-tables-container">
                        <section id="drivers-table-container">
                            <h3 id="drivers-championship-title" class="table-title">Campeonato de Pilotos</h3>   
                            <div id="drivers-championship-container"></div>
                        </section>
                        <section id="constructors-table-container">
                            <h3 id="constructors-championship-title" class="table-title">Campeonato de Constructores</h3>
                            <div id="constructors-championship-container"></div>
                        </section>
                    </section>
                </section>
            </main>`;
            
}