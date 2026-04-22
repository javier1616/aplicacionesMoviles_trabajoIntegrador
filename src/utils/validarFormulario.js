

export function validarFormulario(nombre,season,nacionalidad){

    console.log("Validar formulario: ");
    console.log("nombre: " + nombre + " season: " + season + " nacionalidad: " + nacionalidad);

    const result = []
    let response;

    response = validar(nombre,"nombre");

    if (Object.keys(response).length > 0) {
        result.push(response);
    }

    response = validar(season,"season");

    if (Object.keys(response).length > 0) {
        result.push(response);
    }

    /*  response = validar(nacionalidad,"nacionalidad");

    if (Object.keys(response).length > 0) {
        result.push(response);
    }*/

    return result;

}



const validadores = {
    cadenaVacia: value => value.trim() === "",
    //soloCaracteres_az_AZ: value => /^[a-zA-Z]+$/.test(value),  //no incluye cadena vacía
    soloCaracteres_az_AZ: value => /^[a-zA-Z]*$/.test(value),  // incluye cadena vacía
    
};

export function validar(cadena, tipo) {

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
        /*case "nacionalidad":
            if(!nacionalidad_array.includes(cadena))
            {
                response.error = tipo;
                response.message = "Error en campo nacionalidad";
            }; */       
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