
// jolpica - https://github.com/jolpica/jolpica-f1/tree/main/docs

export const jolpica_url = "https://api.jolpi.ca/ergast/f1/"
//export const jolpica_url_drivers = jolpica_url + "2026/drivers"
//export const jolpica_url_circuits = jolpica_url + "2026/circuits"

export const jolpica_url_all = "https://api.jolpi.ca/ergast/f1/"

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

export const wiki_API_v2 = "https://en.wikipedia.org/api/rest_v1/page/summary/"


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

//con esto obtengo la lista de escuderias
//const constructors = "https://api.jolpi.ca/ergast/f1/constructors"

//con esto podes relacionar qué escuderia corresponde a qué piloto
const results_escuderias_url = "https://api.jolpi.ca/ergast/f1/2026/3/results/"

//con esto averiguas ultima carrera para hacer la consulta anterior
const ultima_carrera_url = "https://api.jolpi.ca/ergast/f1/current/last/results/"


//fijate que la base es la misma para todos los endpoints

/* Resultados (por temporada) */

const results_season = "https://api.jolpi.ca/ergast/f1/2026/results/"
// example: "https://api.jolpi.ca/ergast/f1/2026/results/"

/* Resultados (por carrera) */

const results_race = "https://api.jolpi.ca/ergast/f1/2026/3/results/"
//example: "https://api.jolpi.ca/ergast/f1/2026/3/results/"


/* Teams (se pide por temporada pero solo usamos la ultima)*/
export const jolpica_constructors = "https://api.jolpi.ca/ergast/f1/2026/constructors"

