import { jolpica_url, jolpica_url_all, jolpica_constructors, jolpica_championship_drivers, jolpica_championship_constructors } from "../config.js";
import { drivers_response } from "../response_mocks/drivers_mock.js";
import { circuits_response } from "../response_mocks/circuits_mock.js";


//request generico (fetch) ---------------------------------------------------
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
//----------------------------------------------------------------------------


export async function getPilotos(season,limit,offset){

    let url = jolpica_url;

    if(season != "0"){
      url +=  season + "/"
    }

    url += `drivers/`

    //let params = `/?limit=${limit}&offset=${offset}`

    let pilotos = await request(url/*+params*/);       // --> POSTA
    //let pilotos = drivers_response;       // --> MOCK

    console.log("get Pilotos - url: " + url)
    
    return pilotos.MRData.DriverTable.Drivers;
}

//export async function getCircuitos(name,season,pais){
export async function getCircuitos(season,limit,offset){

    let url = jolpica_url;

    if(season != "0"){
        url +=  season + "/"
    }

    url += `circuits/`

    //let params = `/?limit=${limit}&offset=${offset}`

    let circuitos = await request(url/*+params*/);       // --> POSTA
    //let circuitos = circuits_response;       // --> MOCK

    console.log("getCircuitos - url: " + url)
    
    return circuitos.MRData.CircuitTable.Circuits;
}

//solo se usa para los logos de red bull y racing bull
export async function getImage(url){

    let wiki_result = await request(url);

    return wiki_result.thumbnail?.source;

}

/* Con algunos pilotos y equipos, no tengo datos en español, así que falla */
/*
export async function getImageAndExtract(url){

    let wiki_result = await request(url);

    const img_url = wiki_result.thumbnail?.source;
    const extract = wiki_result.extract;

    const result = {
        image_url : img_url,
        extract : extract
    }
    
    return result;
}*/


export async function getImageAndExtract(url, fallbackUrl){

    try {
        let wiki_result = await request(url);

        return {
            image_url: wiki_result.thumbnail?.source,
            extract: wiki_result.extract
        };

    } catch (error) {

        console.log("Fallo ES, probando EN...");

        try {
            let wiki_result = await request(fallbackUrl);

            return {
                image_url: wiki_result.thumbnail?.source,
                extract: wiki_result.extract
            };

        } catch (error2) {

            console.log("Fallo también EN");

            return {
                image_url: null,
                extract: "Sin información disponible"
            };
        }
    }
}


export async function getAllPilotos(){

    let limit = 100;
    let offset = 0;
    let total;
    let result = [];

    let url = jolpica_url_all;

    url += `drivers`

    console.log("solicitando pilotos...")

    let params = `/?limit=${limit}&offset=${offset}`;

    let pilotos = await request(url+params);
  
    offset += parseInt(pilotos.MRData.limit);
    total = pilotos.MRData.total;

    console.log("offset: "+ offset + " total: " + total);

    result.push(...pilotos.MRData.DriverTable.Drivers);


    while (offset < total){

      params = `/?limit=${limit}&offset=${offset}`
      pilotos = await request(url+params);
      
      offset += parseInt(pilotos.MRData.limit);
      total = pilotos.MRData.total;

      result.push(...pilotos.MRData.DriverTable.Drivers);

    }

    console.log("Total de pilotos encontrados: " + result.length);

    return result;

}

export async function getAllCircuitos(){

    let limit = 100;
    let offset = 0;
    let total;
    let result = [];

    let url = jolpica_url_all;

    url += `circuits`

    console.log("solicitando circuitos...")

    let params = `/?limit=${limit}&offset=${offset}`;

    let circuitos = await request(url+params);
  
    offset += parseInt(circuitos.MRData.limit);
    total = circuitos.MRData.total;

    console.log("offset: "+ offset + " total: " + total);

    result.push(...circuitos.MRData.CircuitTable.Circuits);


    while (offset < total){

      params = `/?limit=${limit}&offset=${offset}`
      circuitos = await request(url+params);
      
      offset += parseInt(circuitos.MRData.limit);
      total = circuitos.MRData.total;

      result.push(...circuitos.MRData.CircuitTable.Circuits);

    }

    console.log("Total de circuitos encontrados: " + result.length);

    return result;

}

export async function getTeam(id){

    let url = jolpica_constructors;

    let results = await request(url);
    
    let result = results.MRData.ConstructorTable.Constructors.find(c => 
                    c.constructorId === id);   
    
    return result;
}


export async function getResults(type,id){

    let limit = 100;
    let offset = 0;
    let total;
    let races = [];

    let url = jolpica_url + `${type}/${id}/results`

    let params = `?limit=${limit}&offset=${offset}`

    console.log("obteniendo estadísticas...");

    let results = await request( url + params );
  
    offset += parseInt(results.MRData.limit);
    total = results.MRData.total;

    console.log("offset: "+ offset + " total: " + total);

    races.push(...results.MRData.RaceTable.Races);


    while (offset < total){

        params = `/?limit=${limit}&offset=${offset}`
        results = await request( url + params );

        offset += parseInt(results.MRData.limit);
        total = results.MRData.total;

        races.push(...results.MRData.RaceTable.Races);

    }

    console.log("Total de registros encontrados: " + races.length);

    return races;

}

export async function getCurrentSeasonDriversChampionship(){

    let url = jolpica_championship_drivers;

    let results = await request(url);
    
    //let result = results.MRData.ConstructorTable.Constructors.find(c => 
    //                c.constructorId === id);
    
    console.log("obteniendo tabla de resultados del campeonato de pilotos")
    console.log(results);
    
    return results.MRData.StandingsTable.StandingsLists[0].DriverStandings;

}

export async function getCurrentSeasonConstructorsChampionship(){

    let url = jolpica_championship_constructors;

    let results = await request(url);
    
    //let result = results.MRData.ConstructorTable.Constructors.find(c => 
    //                c.constructorId === id);
    
    console.log("obteniendo tabla de resultados del campeonato de constructores")
    console.log(results);
    
    return results.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;

}