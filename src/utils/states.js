

export const sentinels_state = {
    circuitos: {
        loading: false,
        primeraVez: true,   //cuando abro el accordion al inicio no deben cargar nada...
        offset: 0,
        limit:10,
        total: Infinity
    },
    pilotos: {
        loading: false,
        primeraVez: true,
        offset: 0,
        limit: 10,
        total: Infinity
    }
};

export const pilotos_filters_state ={
    nombre: "",
    season: "",
    nacionalidad: ""
};

export const circuitos_filters_state ={
    nombre: "",
    season: "",
    pais: ""
};
