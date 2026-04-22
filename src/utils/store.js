// utils/store.js

import { getAllPilotos,getAllCircuitos } from "../api/http.js";

let allPilotos = null;
let allCircuitos = null;
//let allNacionalidades = null;
//let allPaises = null;

//Por como está implementada, si las variables contienen datos termina,
//sino va a buscar los datos. Dicho de otro modo, cuesta llamarla la primera vez,
//luego del refresh o al inicio, las demas veces "es casi gratis"

export const initDataStore = async () => {
    // Si ya existen en memoria, no hacemos nada
    if (allPilotos && allCircuitos /*&& allNacionalidades && allPaises*/) return; 

    // Promise.all para traer en paralelo y ahorrar tiempo
    const [pilotos, circuitos/*, nacionalidades, paises*/] = await Promise.all([
        getAllPilotos(), 
        getAllCircuitos(),
        //getAllNacionalidades(),
        //getPaises()
    ]);

    allPilotos = pilotos;
    allCircuitos = circuitos;
    //allNacionalidades = nacionalidades;
    //allPaises = paises;

};

export const getPilotosStore = () => allPilotos;
export const getCircuitosStore = () => allCircuitos;
//export const getNacionalidadesStore = () => allCircuitos;
//export const getPaisesStore = () => allCircuitos;

