
import { wiki_API, wiki_API_v2, wiki_API_v2_en } from "../config.js";  
import { getTeam } from "../api/http.js"
import { getImage, getImageAndExtract, getCurrentSeasonConstructorsChampionship, getCurrentSeasonDriversChampionship} from "../api/http.js";
import { constructorsChampionshipOneRowTable } from '../components/constructorsChampionshipOneRowTable.js'

export async function teamBehavior() {

    //toma la info de localStorage
    const constructor_id = localStorage.getItem("constructorId");

    const car_img = document.getElementById("team-car-img");


    //fetch a jolpica
    const team_info = await getTeam(constructor_id);

    console.log(team_info);

    const lastPart = team_info.url.split("/").pop();

    const image_url_and_extract = await getImageAndExtract( wiki_API_v2 + lastPart, wiki_API_v2_en + lastPart);
    
    
    const extract = image_url_and_extract.extract;
    let image_url = image_url_and_extract.image_url;


    //la imagen que trae la url es.wikipedia no corresponde al logo de la escuderia
    if(team_info.constructorId == "rb" || team_info.constructorId == "red_bull")
    {
        image_url = await getImage(wiki_API_v2_en + lastPart);
    }
    
    const img = document.getElementById('team-logo-image-url');
    img.src = image_url;       //aqui trae la url de la imagen


    car_img.src = `./src/assets/img/2026${constructor_id}carright.avif`;
    car_img.classList.add("source");


    const constructorsChampionshipOneRowTitle = document.getElementById("constructors-championship-one-row-title");
        constructorsChampionshipOneRowTitle.innerHTML = `Campeonato de constructores`;
    
    const constructorsChampionshipTable = document.getElementById("constructors-championship-table-position-container");
    
    //a diferencia de los pilotos, estas escuderías son activas
    const constructorsChampionshipResult = await getCurrentSeasonConstructorsChampionship();

    console.log("constructorsChampionshipResult");
    console.log(constructorsChampionshipResult);

    const constructorIndex = constructorsChampionshipResult.findIndex( elem => elem.Constructor.constructorId == team_info.constructorId);

    console.log(constructorIndex)

    console.log(constructorsChampionshipResult[constructorIndex]);
    
    constructorsChampionshipTable.innerHTML += constructorsChampionshipOneRowTable(constructorsChampionshipResult[constructorIndex]);

    const driversContainer = document.getElementById("team-drivers-container");

    const currentDrivers = await getCurrentSeasonDriversChampionship();

    console.log(team_info.constructorId);

    console.log(currentDrivers)

    const teamDrivers = currentDrivers.filter(driver => driver.Constructors[0].constructorId == team_info.constructorId);

    console.log("Pilotos de la escuderia");
    console.log(teamDrivers);

    const img_driver01 = document.getElementById("detail-img01");
    const img_driver02 = document.getElementById("detail-img02"); 

    const driver01_name = document.getElementById("driver01-name");
    const driver02_name = document.getElementById("driver02-name"); 

    const url_driver01 = teamDrivers[0].Driver.url;
    const lastPart_url_01 = url_driver01.split("/").pop();

    const url_driver02 = teamDrivers[1].Driver.url;
    const lastPart_url_02 = url_driver02.split("/").pop();

    //la imagen de Lando Norris es su firma
    if( ! lastPart_url_01.includes("Lando_Norris"))
    {
        img_driver01.src = await getImage(wiki_API_v2 + lastPart_url_01);
    }
    else
    {
        img_driver01.src = await getImage(wiki_API_v2_en + lastPart_url_01);
    }

    //No viene imagen de Russell
    if( ! lastPart_url_02.includes("George_Russell"))
    {
        img_driver02.src = await getImage(wiki_API_v2 + lastPart_url_02);
    }
    else
    {
        img_driver02.src = await getImage(wiki_API_v2_en + lastPart_url_02);
    }
    
    driver01_name.innerHTML = `${teamDrivers[0].Driver.givenName} ${teamDrivers[0].Driver.familyName}`;
    driver02_name.innerHTML = `${teamDrivers[1].Driver.givenName} ${teamDrivers[1].Driver.familyName}`;

    const team_text = document.getElementById("team-text");
    team_text.innerHTML = extract;

    return;

}