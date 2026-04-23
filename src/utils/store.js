// utils/store.js

import { getAllPilotos,getAllCircuitos } from "../api/http.js";

let allPilotos = null;
let allCircuitos = null;
let allNacionalidades = null;
let allPaises = null;

//Por como está implementada, si las variables contienen datos termina,
//sino va a buscar los datos. Dicho de otro modo, cuesta llamarla la primera vez,
//luego del refresh o al inicio, las demas veces "es casi gratis"

export const initDataStore = async () => {
    // Si ya existen en memoria, no hacemos nada
    if (allPilotos && allCircuitos && allNacionalidades /*&& allPaises*/) return; 

    // Promise.all para traer en paralelo y ahorrar tiempo
    const [pilotos, circuitos] = await Promise.all([
        getAllPilotos(), 
        getAllCircuitos()
    ]);

    allPilotos = pilotos;
    allCircuitos = circuitos;

    const [nacionalidades, paises] = await Promise.all([
        getAllNacionalidades(allPilotos),
        getAllPaises(allCircuitos)
    ]);

};

export const getPilotosStore = () => allPilotos;
export const getCircuitosStore = () => allCircuitos;
export const getNacionalidadesStore = () => allNacionalidades;
export const getPaisesStore = () => allPaises;



async function getAllNacionalidades(listaDePilotos){

    let nacionalidades = [];

    listaDePilotos.forEach(element => {
        nacionalidades.push(element.nationality);
    });

    //elimina: repetidos, undefined y null
    const lista_depurada = [...new Set(nacionalidades.filter(x => x != null))].sort();

    allNacionalidades = lista_depurada;

}

async function getAllPaises(listaDeCircuitos){

    let paises = [];

    listaDeCircuitos.forEach(element => {
        paises.push(element.Location.country);
    });

    //elimina: repetidos, undefined y null
    const lista_depurada = [...new Set(paises.filter(x => x != null))].sort();

    allPaises = lista_depurada;

}