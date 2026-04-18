import { jolpica_url } from "../config.js";
import { drivers_response } from "../response_mocks/drivers_mock.js";
import { circuits_response } from "../response_mocks/circuits_mock.js";

//request generico (fetch)

export async function request(url, options = {}) {
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`HTTP error: ${res.status}`);
  }

  return await res.json();
}

export async function getPilotos() {
    //let pilotos = await request(jolpica_url_drivers);       // --> POSTA
    let pilotos = drivers_response;       // --> MOCK

    pilotos = pilotos.MRData.DriverTable.Drivers;
    
    const results = document.getElementById("pilotos-card-container");
    
    pilotos.forEach(element => {
        results.innerHTML += driverCard(element);
    });

}

export async function getCircuitos() {
    //let circuitos = await request(jolpica_url_circuits);    // --> POSTA
    let circuitos = circuits_response;   // --> MOCK

    circuitos = circuitos.MRData.CircuitTable.Circuits;
    
    const results = document.getElementById("circuitos-card-container");
    
    circuitos.forEach(element => {
        results.innerHTML += circuitCard(element);
    });

}

export async function getPilotosPosta(name,season,nacionalidad){

    let url = jolpica_url;

    if(season != "0"){
      url +=  season + "/"
    }

    //let pilotos = await request(url);       // --> POSTA
    let pilotos = drivers_response;       // --> MOCK
    
    return pilotos.MRData.DriverTable.Drivers;
}

export async function getCircuitosPosta(name,season,pais){

    let url = jolpica_url;

    if(season != "0"){
      url +=  season + "/"
    }

    //let pilotos = await request(url);       // --> POSTA
    let circuitos = circuits_response;       // --> MOCK
    
    return circuitos.MRData.CircuitTable.Circuits;
}