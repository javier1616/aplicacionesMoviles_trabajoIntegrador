
import { wiki_API, wiki_API_v2 } from "../config.js";  
import { getImage, getImageAndExtract } from "../api/http.js"

export async function detailBehavior() {

    let favorite_item;

    //toma la info de localStorage
    const detail_data_view = JSON.parse(localStorage.getItem("detail_view"));

    //viene algo como :
    // {
    //    type: "driver",       --> driver/circuit (por ahora solo esos)
    //    id: card.dataset.id,  --> id relativo al driver/circuit que estoy viendo 
    //    url:
    //    name: 
    // };


    console.log("Datos guardados desde la card que pasan a detai_data_view");
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

    //comportamiento del boton agregar a favoritos cuando clickeo
    favorite_btn.addEventListener("click", () =>{

        console.log("clic en estrella");

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

            //si no está lo agrego y pinto la estrella  
            //Guarda en favoritos los datos necesarios para mostrar la card...

            switch(detail_data_view.type){
                case("driver"):
                    favorite_item = {
                        type : detail_data_view.type,
                        id : detail_data_view.id,
                        url : detail_data_view.url,
                        name : detail_data_view.name,
                        img : "./src/assets/icons/casco2.png"
                       // code :       <li> Code: ${data.code} </li>,
                       // number :     <li> Number: ${data.permanentNumber}</li>,
                       // nacionality :   <li> Nacionality: ${data.nationality} </li>,
                       // date : new Date()
                    };
                break;

                case("circuit"):
                    favorite_item = {
                        type : detail_data_view.type,
                        id : detail_data_view.id,
                        url : detail_data_view.url,
                        name : detail_data_view.name,
                        img : "./src/assets/icons/circuito.png"
                        // country :   <li> Country: ${data.nationality} </li>,
                        //date : new Date()
                };
                break;

            };

            favorite_array.push(favorite_item);

            //reemplazo todo el array con la modificacion
            localStorage.setItem("favorite_array", JSON.stringify(favorite_array));

            //pinto la estrella
            img.src = "./src/assets/icons/star-full-yellow.svg";

        }

    })

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

}