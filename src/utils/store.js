// utils/store.js

import { getAllPilotos,getAllCircuitos } from "../api/http.js";

let allPilotos = null;
let allCircuitos = null;

//Por como está implementada, si las variables contienen datos termina,
//sino va a buscar los datos. Dicho de otro modo, cuesta llamarla la primera vez,
//luego del refresh o al inicio, las demas veces "es casi gratis"

export const initDataStore = async () => {
    // Si ya existen en memoria, no hacemos nada
    if (allPilotos && allCircuitos) return; 

    // Promise.all para traer ambos en paralelo y ahorrar tiempo
    const [pilotos, circuitos] = await Promise.all([
        getAllPilotos(), 
        getAllCircuitos()
    ]);

    allPilotos = pilotos;
    allCircuitos = circuitos;
};

export const getPilotosStore = () => allPilotos;
export const getCircuitosStore = () => allCircuitos;
