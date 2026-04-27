
import { wiki_API, wiki_API_v2, wiki_API_v2_en } from "../config.js";  
import { getCurrentSeasonDriversChampionship, getImage, getImageAndExtract, getResults } from "../api/http.js"
import { modalFavoritos } from "../components/modalFavoritos.js";
import { openModal } from "./modalFavoritos.behavior.js";
import { graficoPie } from "../components/graficoPie.js";
import { formatearDelta } from "../utils/formatearDelta.js";
import { lastRacesTable } from "../components/lastRacesTable.js";
import { driversChampionshipOneRowTable } from "../components/driversChampionshipOneRowTable.js";

export async function detailBehavior() {


    //toma la info de localStorage
    const detail_data_view = JSON.parse(localStorage.getItem("detail_view"));

    //viene algo como :
    // {
    //    type: "drivers",       --> drivers/circuits (por ahora solo esos)
    //    id: card.dataset.id,  --> id relativo al driver/circuit que estoy viendo 
    //    url:
    //    name: 
    // };


    console.log("Datos guardados desde la card que pasan a detail_data_view");
    console.log(detail_data_view);


    //toma la info de localStorage. Si no existe cargo con []
    const favorite_array = JSON.parse(localStorage.getItem("favorite_array")) || [];

    
    const favorite_btn = document.getElementById("favorite-btn");

    const img = favorite_btn.querySelector('img');

    // por default hay una estrella vacía, pero si está en favoritos
    // se cambia por una estrella llena
    if (favorite_array.some(elem => elem.id == detail_data_view.id)) {
        img.src = "./src/assets/icons/star-full-yellow.svg";
    }


    //comportamiento del boton agregar a favoritos (estrella) cuando clickeo
    favorite_btn.addEventListener("click", () =>{

        console.log("clic en estrella");

        //Se carga el modal para agregar a favoritos
        //SE CARGA ACA PARA EVITAR BUG DE DUPLICACION DE EVENTOS
        //si lo cargo en home, o en detalles, al no destruirlo
        //como los eventos estan en open modal, si no lo destruyo se van duplicando
        const modal_container = document.getElementById("modal-container");
        modal_container.innerHTML = modalFavoritos(); //inserta el modal

        //apenas presiono busco si está 
        const index = favorite_array.findIndex(elem => elem.id == detail_data_view.id);

        if( index !== -1)
        {

            //si ya estaba lo quito de la lista y despinto la estrella
            favorite_array.splice(index, 1); //borra un elemento a partir de ese indice
            //reemplazo todo el array con la modificacion
            localStorage.setItem("favorite_array", JSON.stringify(favorite_array));
            img.src = "./src/assets/icons/star-empty-yellow.svg";

        } else {

            //si no está tiene que aparecer el formulariooo....

            console.log("momento de abrir el modal y agregar a favoritos")
            openModal(detail_data_view);
            
        }
    });


    if(detail_data_view.type)       //primero valido si existe
    {
        //cuando renderices distinto haces un if para cada caso
        //capaz tenes que separar por los fetches


        const standings = await getResults(
                    detail_data_view.type,detail_data_view.id);

        console.log("estadísticas encontradas");
        console.log(standings);

        if(detail_data_view.type == "drivers")  //renderización para pilotos
        {

            let cantidad_victorias = 0;
            let cantidad_podios = 0;
            let cantidad_poles = 0;
            const cantidad_carreras = standings.length;
            let cantidad_fast_laps = 0;

            let retired_amount = 0;
            let finished_amount = 0;

            let avg_position_diff = 0;
            //promedio entre pos_grid y pos_finish global
            //sería algo así como la diferencia de gol por partido global

            let starting_grid = [
                { label:"P1", value: 0} ,
                { label:"P2", value: 0} ,
                { label:"P3", value: 0} ,
                { label:"P4", value: 0} ,
                { label:"P5", value: 0} ,
                { label:"P6", value: 0} ,
                { label:"P7", value: 0} ,
                { label:"P8", value: 0} ,
                { label:"P9", value: 0} ,
                { label:"P10", value: 0} ,
                { label:"P11", value: 0} ,
                { label:"P12", value: 0} ,
                { label:"P13", value: 0} ,
                { label:"P14", value: 0} ,
                { label:"P15", value: 0} ,
                { label:"P16", value: 0} ,
                { label:"P17", value: 0} ,
                { label:"P18", value: 0} ,
                { label:"P19", value: 0} ,
                { label:"P20", value: 0} ,
                { label:"P21", value: 0} ,
                { label:"P22", value: 0} ,
                { label:"P23", value: 0} ,
                { label:"P24", value: 0}
            ];

            let finish_grid = [
                { label:"P1", value: 0} ,
                { label:"P2", value: 0} ,
                { label:"P3", value: 0} ,
                { label:"P4", value: 0} ,
                { label:"P5", value: 0} ,
                { label:"P6", value: 0} ,
                { label:"P7", value: 0} ,
                { label:"P8", value: 0} ,
                { label:"P9", value: 0} ,
                { label:"P10", value: 0} ,
                { label:"P11", value: 0} ,
                { label:"P12", value: 0} ,
                { label:"P13", value: 0} ,
                { label:"P14", value: 0} ,
                { label:"P15", value: 0} ,
                { label:"P16", value: 0} ,
                { label:"P17", value: 0} ,
                { label:"P18", value: 0} ,
                { label:"P19", value: 0} ,
                { label:"P20", value: 0} ,
                { label:"P21", value: 0} ,
                { label:"P22", value: 0} ,
                { label:"P23", value: 0} ,
                { label:"P24", value: 0}
            ];

            //proceso las ultimas 3 carreras
            const lastRaces = standings.slice(-3);

            console.log("last races: "+ lastRaces)

            let carreras =[];

            lastRaces.forEach(elem => {

                console.log(elem.Circuit.circuitName);

                carreras.push({
                    name : elem.Circuit.circuitName,
                    start : elem.Results[0].grid,
                    end : elem.Results[0].position,
                    points : elem.Results[0].points
                });

            });

            /*
            const carrera1 = {
                name : lastRaces[0].Circuit.circuitName,
                start : lastRaces[0].Results[0].grid,
                end : lastRaces[0].Results[0].position,
                points : lastRaces[0].Results[0].points
            };

            const carrera2 = {
                name : lastRaces[1].Circuit.circuitName,
                start : lastRaces[1].Results[0].grid,
                end : lastRaces[1].Results[0].position,
                points : lastRaces[1].Results[0].points
            }

            const carrera3 = {
                name : lastRaces[2].Circuit.circuitName,
                start : lastRaces[2].Results[0].grid,
                end : lastRaces[2].Results[0].position,
                points : lastRaces[2].Results[0].points
            }
            */

            const lastSeason = lastRaces.at(-1).season; //el ultimo elemento

            const lastRacesTitle = document.getElementById("last-races-title");
            lastRacesTitle.innerHTML = `Ultimas carreras (${lastSeason})`;

            
            const tableContainer = document.getElementById("table-container");
            console.log("Carreras: " + JSON.stringify(carreras));
            tableContainer.innerHTML += lastRacesTable(carreras);

            standings.forEach( elem => {

                let position = elem.Results[0].position;
                console.log("end position: " + position);


                console.log("date: " + elem.date);
                console.log("position: " + position);

                //en 1963 largaron 110 autos en la parrilla
                if(position - 1 >= finish_grid.length)
                {
                    while( position -1 >= finish_grid.length)
                    {
                        finish_grid.push({label: `P${finish_grid.length+1}`, value: 0})
                    };
                    console.log("así me quedo al final")
                    console.log(finish_grid)
                    console.log("insertar: " + position);
                    finish_grid[position - 1].value++;
                }
                else
                {
                    finish_grid[position - 1].value++;
                }

                if(position == 1) cantidad_victorias = cantidad_victorias + 1;
                if(position < 4 && position > 0 ) cantidad_podios = cantidad_podios + 1;

                let start_position = elem.Results[0].grid;
                console.log("start position: " + start_position);

                //24-04-2019 Alex Albon - error en datos --> start_position = 0
                if(start_position > 0 && start_position <= starting_grid.length)
                {
                    starting_grid[start_position - 1].value++;
                } else
                {
                    //si hay un error suma a una posición del medio para reducir error
                    starting_grid[Math.floor(starting_grid.length / 2 ) - 1].value++;
                }

                if( start_position == 1) cantidad_poles = cantidad_poles + 1;

                //si es < 0 gana posiciones
                avg_position_diff += (position - start_position); 

                if (elem.Results[0].FastestLap && elem.Results[0].FastestLap.rank == 1)
                {
                    cantidad_fast_laps++;
                }

                let race_status = elem.Results[0].status;
                console.log("status: " + elem.Results[0].status);

                if(race_status.includes("Finished") || race_status.includes("Lap"))
                {
                    //finalizó con 0 o X vueltas respecto a la punta
                    finished_amount++;
                }
                else
                {
                    //no finalizó (hay muchos estados posibles)
                    retired_amount++;
                }

            });

            //si es negativo gana posiciones
            avg_position_diff = avg_position_diff / cantidad_carreras;


            const title = document.getElementById('detail-title');
            const img = document.getElementById('detail-img');
            const text = document.getElementById('detail-text');

            console.log("url en card: " + detail_data_view.url);

            const lastPart = detail_data_view.url.split("/").pop();

            //const image_url = await getImage( wiki_API + lastPart);
            //tiene la url en ingles como fallback por si falla
            const image_url_and_extract = await getImageAndExtract( wiki_API_v2 + lastPart, wiki_API_v2_en + lastPart);
            const extract = image_url_and_extract.extract;
            const image_url = image_url_and_extract.image_url;

            title.innerHTML = detail_data_view.name;
            text.innerHTML = extract;
            img.src = image_url;       //aqui trae la url de la imagen

            const table = document.getElementById("stats-table");

            console.log(table);

            console.log("cantidad de victorias: " + cantidad_victorias);

            table.querySelector("#victorias-data").innerHTML = cantidad_victorias;
            table.querySelector("#podios-data").innerHTML = cantidad_podios;
            table.querySelector("#carreras-data").innerHTML = cantidad_carreras;
            table.querySelector("#pole-positions-data").innerHTML = cantidad_poles;           
            table.querySelector("#fast-laps-data").innerHTML = cantidad_fast_laps;


            /* - SE ELIMINA LA VISUALIZACIÓN DEL GRAFICO Y DELTA POSITION */
            /*
            if( cantidad_podios == 0)
            {

                console.log("aun no logra podios");
                document.getElementById("chart-title").innerHTML = "Carreras terminadas";
                graficoPie("pieChart","Finalizadas",finished_amount,"No Finalizadas",retired_amount);
            }
            else
            {
                console.log("tiene al menos un podio");
                document.getElementById("chart-title").innerHTML = "Carreras terminadas en podio";
                graficoPie("pieChart","Terminadas sin podio",finished_amount-cantidad_podios,"Terminadas con podio",cantidad_podios);
            }


            //document.getElementById("avg-position-number").innerHTML = Number(avg_position_diff.toFixed(2));
            const deltaResult = formatearDelta(Number(avg_position_diff.toFixed(2)));

            const elemento = document.getElementById("avg-position-number");

            elemento.innerHTML = `
                <span class="${deltaResult.clase}">
                    ${deltaResult.icono} ${deltaResult.texto}
                </span>
                <small>${deltaResult.leyenda}</small>`;
            */

            const driversChampionshipOneRowTitle = document.getElementById("championship-one-row-title");
            driversChampionshipOneRowTitle.innerHTML = `Campeonato de pilotos`;

            const championshipTable = document.getElementById("championship-table-position-container");

            if( lastSeason < new Date().getFullYear())
            {
                championshipTable.innerHTML = `<h3 style="text-align:center;">No es un corredor activo</h3>`;
            }
            else
            {
                const championshipResult = await getCurrentSeasonDriversChampionship();
                
                const driverIndex = championshipResult.findIndex( elem => elem.Driver.driverId == detail_data_view.id);
                console.log(championshipResult[driverIndex]);
                championshipTable.innerHTML += driversChampionshipOneRowTable(championshipResult[driverIndex]);
            }

            return;

        }

        if(detail_data_view.type == "circuits")  //renderización para circuitos
        {

            const title = document.getElementById('detail-title');
            const img = document.getElementById('detail-img');
            const text = document.getElementById('detail-text');

            console.log("url en card: " + detail_data_view.url);

            const lastPart = detail_data_view.url.split("/").pop();

            //const image_url = await getImage( wiki_API + lastPart);
            //tiene la url en ingles como fallback por si falla
            const image_url_and_extract = await getImageAndExtract( wiki_API_v2 + lastPart, wiki_API_v2_en + lastPart);
            const extract = image_url_and_extract.extract;
            const image_url = image_url_and_extract.image_url;

            title.innerHTML = detail_data_view.name;
            text.innerHTML = extract;
            img.src = image_url;       //aqui trae la url de la imagen

            return;

        }

    }

    //no deberia llegar hasta esta linea
    console.log("Error: no hay datos en localStorage(detail_view)")
    return;

}