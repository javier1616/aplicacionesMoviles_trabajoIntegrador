
// jolpica - https://github.com/jolpica/jolpica-f1/tree/main/docs

export const jolpica_url = "https://api.jolpi.ca/ergast/f1/"
export const jolpica_url_drivers = jolpica_url + "2026/drivers"
export const jolpica_url_circuits = jolpica_url + "2026/circuits"

// examples:
// https://api.jolpi.ca/ergast/f1/2026/drivers
// https://api.jolpi.ca/ergast/f1/2026/circuits



//(Por ahora no se utiliza, pero se deja por las dudas)
// OpenF1API - https://openf1.org/docs/#api-endpoints
export const openf1API_url = "https://api.openf1.org/v1/"

//example: --> https://api.openf1.org/v1/car_data?driver_number=55&session_key=9159&speed>=315


//Como jopilca trae la pagina wiki de los circuitos/pilotos, podes usar la API publica de wikipedia
//para traer la imagen del circuito: 
// 1. Haces el request a jopilca
// 2. Extraes de la url que te trae el nombre del circuito
// 3. Lo colocas al final de esta URL
// 4. Te devuelve un JSON, con una url en la propiedad source. Esa es la url de la imagen del circuito
export const wiki_API = "https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles="

//EXAMPLE   --> https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=Circuit_of_the_Americas



/*

    "season": "https://api.jolpi.ca/ergast/f1/seasons",
    "circuit": "https://api.jolpi.ca/ergast/f1/circuits",
    "race": "https://api.jolpi.ca/ergast/f1/2026/races",
    "constructor": "https://api.jolpi.ca/ergast/f1/2026/constructors",
    "driver": "https://api.jolpi.ca/ergast/f1/2026/drivers",
    "result": "https://api.jolpi.ca/ergast/f1/2026/results",
    "sprint": "https://api.jolpi.ca/ergast/f1/2026/sprint",
    "qualifying": "https://api.jolpi.ca/ergast/f1/2026/qualifying",
    "pitstop": "https://api.jolpi.ca/ergast/f1/2026/1/pitstops",
    "lap": "https://api.jolpi.ca/ergast/f1/2026/1/laps",
    "driverstanding": "https://api.jolpi.ca/ergast/f1/2026/driverstandings",
    "constructorstanding": "https://api.jolpi.ca/ergast/f1/2026/constructorstandings",
    "status": "https://api.jolpi.ca/ergast/f1/status"

*/