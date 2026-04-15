import { request } from "../api/http.js";
import { jolpica_url_drivers, jolpica_url_circuits } from "../config.js";
import { drivers_response } from "../response_mocks/drivers_mock.js";
import { circuits_response } from "../response_mocks/circuits_mock.js";
import { driverCard } from "../components/driversCard.js";
import { circuitCard } from "../components/circuitsCard.js";


export async function getPilotos() {
    //let pilotos = await request(jolpica_url_drivers);       // --> POSTA
    let pilotos = drivers_response;       // --> MOCK

    pilotos = pilotos.MRData.DriverTable.Drivers;
    document.getElementById("response_data").value = JSON.stringify(pilotos);

    const results = document.getElementById("results_container");

    pilotos.forEach(element => {
        results.innerHTML += driverCard(element);
    });

}

export async function getCircuitos() {
    //let circuitos = await request(jolpica_url_circuits);    // --> POSTA
    let circuitos = circuits_response;   // --> MOCK

    circuitos = circuitos.MRData.CircuitTable.Circuits;
    document.getElementById("response_data").value = JSON.stringify(circuitos);

    const results = document.getElementById("results_container");

    circuitos.forEach(element => {
        results.innerHTML += circuitCard(element);
    });

}



