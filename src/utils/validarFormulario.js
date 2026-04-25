import { getNacionalidadesStore } from "./store.js";


export function validarFormulario(nombre,season,nac_o_pais,lista){

    console.log("Validar formulario: ");
    console.log("nombre: " + nombre + " season: " + season + " nacionalidad/pais: " + nac_o_pais);

    const result = []
    let response;

    response = validar(nombre,"nombre",[]);

    if (Object.keys(response).length > 0) {
        result.push(response);
    }

    response = validar(season,"season",[]);

    if (Object.keys(response).length > 0) {
        result.push(response);
    }

    response = validar(nac_o_pais,"nacionalidad",lista);

    if (Object.keys(response).length > 0) {
        result.push(response);
    }

    return result;

}



const validadores = {
    cadenaVacia: value => value.trim() === "",
    //soloCaracteres_az_AZ: value => /^[a-zA-Z]+$/.test(value),  //no incluye cadena vacía
    soloCaracteres_az_AZ: value => /^[a-zA-Z]*$/.test(value),  // incluye cadena vacía
    cantidadPermitida: value => value.length <= 50    
};

export function validar(cadena, tipo, lista) {

    const response = {}

    switch(tipo) {
        case "nombre":
            if(!validadores.soloCaracteres_az_AZ(cadena))
            {
                response.error = tipo;
                response.message = "Solo se permiten caracteres a-z,A-Z"
            };
            break;
        case "season":
            if(cadena != "2025" && cadena != "2026" && cadena != "0")
            {
                response.error = tipo;
                response.message = "Debe seleccionar una temporada";
            };
            break;
        case "nacionalidad":
            if(!lista.includes(cadena) && !validadores.cadenaVacia(cadena))
            {
                response.error = tipo;
                response.message = "Error en campo nacionalidad.";
            };  
            break;
        case "prioridad":
            if(!lista.includes(cadena))
            {
                response.error = tipo;
                response.message = "Debe seleccionar un nivel de prioridad.";
            };  
            break;
        case "motivo":
            if(!lista.includes(cadena))
            {
                response.error = tipo;
                response.message = "Debe seleccionar un motivo";
            };  
            break;
        case "comentario":
            if(!validadores.cantidadPermitida(cadena))
            {
                response.error = tipo;
                response.message = "Debe escribir como máximo 50 caracteres.";
            };  
            break;
    }

    return response;

}

export function formularioVacio(nombre,season,nacionalidad_pais){

    //season viene de un radio, esto es para salvar el undefined
    let valor_season = season ?? "";
    
    return (validadores.cadenaVacia(nombre) &&
            validadores.cadenaVacia(valor_season) &&
            validadores.cadenaVacia(nacionalidad_pais)
        );

}

export function validarFormularioFavoritos(prioridad,motivo,comentario){

    const result = []

    let response;

    response = validar(prioridad,"prioridad",["1","2","3","4","5"]);

    if (Object.keys(response).length > 0) {
        result.push(response);
    }

    response = validar(motivo,"motivo",["Rendimiento","Estrategia","Clasificación","Carrera"]);

    if (Object.keys(response).length > 0) {
        result.push(response);
    }

    response = validar(comentario,"comentario",[]);

    if (Object.keys(response).length > 0) {
        result.push(response);
    }
    

    return result;
    

}