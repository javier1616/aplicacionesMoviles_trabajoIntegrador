import { getCurrentSeasonDriversChampionship } from "../api/http.js";
import { getCurrentSeasonConstructorsChampionship } from "../api/http.js";

import { driversChampionshipTable } from "../components/driversChampionshipTable.js";
import { constructorsChampionshipTable } from "../components/constructorsChampionshipTable.js";

export async function championshipBehavior() {

    const driversChampionshipContainer = document.getElementById("drivers-championship-container");
    const constructorsChampionshipContainer = document.getElementById("constructors-championship-container");

    const pilotos = await getCurrentSeasonDriversChampionship();
    const equipos = await getCurrentSeasonConstructorsChampionship();

    console.log("Pilotos: ", pilotos);
    console.log("Equipos: ", equipos);

    const driversTableContainer = document.getElementById("drivers-championship-container");
    const constructorsTableContainer = document.getElementById("constructors-championship-container");

    driversTableContainer.innerHTML = driversChampionshipTable(pilotos);
    constructorsTableContainer.innerHTML = constructorsChampionshipTable(equipos);

}