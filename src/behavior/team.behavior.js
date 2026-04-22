
//import { wiki_API, wiki_API_v2 } from "../config.js";  
import { getTeam } from "../api/http.js"

export async function teamBehavior() {

    //toma la info de localStorage
    const constructor_id = localStorage.getItem("constructorId");

    const title = document.getElementById("team-title");
    const car_img = document.getElementById("team-car-img");


    console.log(title);
    console.log(car_img);

    const team_info = await getTeam(constructor_id);

    title.innerHTML = team_info.name;
    car_img.src = `./src/assets/img/2026${constructor_id}carright.avif`;
    car_img.classList.add("source");

    console.log("team: " + JSON.stringify(team_info));

    //title.innerHTML = team_info.name;
    //car_img.classList.add = `../assets/img/2026${constructor_id}carright.avif`;



    //viene algo como :
    // {
    //    type: "driver",       --> driver/circuit (por ahora solo esos)
    //    id: card.dataset.id,  --> id relativo al driver/circuit que estoy viendo 
    //    url:
    //    name: 
    // };
/*
    if(detail_data_view.type)       //primero valido si existe
    {
        //cuando renderices distinto haces un if para cada caso
        //capaz tenes que separar por los fetches
        if(detail_data_view.type == "driver" || detail_data_view.type == "circuit")
        {

            const title = document.getElementById('detail-title');
            const img = document.getElementById('detail-img');
            const text = document.getElementById('detail-text');

            console.log("url en card: " + detail_data_view.url);

            const lastPart = detail_data_view.url.split("/").pop();

            //const image_url = await getImage( wiki_API + lastPart);
            const image_url_and_extract = await getImageAndExtract( wiki_API_v2 + lastPart);
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
    */

}