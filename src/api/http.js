import { jolpica_url, jolpica_url_all, jolpica_constructors } from "../config.js";
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

    url += `drivers`

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

    url += `circuits`

    //let params = `/?limit=${limit}&offset=${offset}`

    let circuitos = await request(url/*+params*/);       // --> POSTA
    //let circuitos = circuits_response;       // --> MOCK

    console.log("getCircuitos - url: " + url)
    
    return circuitos.MRData.CircuitTable.Circuits;
}


export async function getImage(url){

    let wiki_result = await request(url + "&redirects=1&origin=*");
    //se le agregan esos parametros para que, si existen redirecciones las siga

    const pages = wiki_result.query.pages;

    // convierto el objeto en array y agarro el primero
    const page = Object.values(pages)[0];

    const imageUrl = page.original?.source ?? null;  //si no hay imagen devuelve null
    
    return imageUrl;
}


export async function getImageAndExtract(url){

    let wiki_result = await request(url);

    const img_url = wiki_result.thumbnail?.source;
    const extract = wiki_result.extract;

    const result = {
        image_url : img_url,
        extract : extract
    }
    
    return result;
}


export async function getAllPilotos(){

    let limit = 100;
    let offset = 0;
    let total;
    let result = [];

    let count = 2;

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

    let count = 2;

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