import { render, initRouter } from "./router.js";
import { Navbar } from "./components/navbar.js";
import { initDataStore } from "./utils/store.js";
import { getPilotosStore, getCircuitosStore } from "./utils/store.js";
import { modalFavoritos } from "./components/modalFavoritos.js";
import { closeModal } from "./behavior/modalFavoritos.behavior.js";

/* preguntar al profe si se puede usar window.navigate o es mejor otra cosa */
import { navigate } from "./router.js";
window.navigate = navigate;
/* ------------------------------------------------------------------------ */

document.addEventListener("DOMContentLoaded", async () => {


    //Carga el comportamiento que debe tener cualquier card al contenedor de vistas
    //entonces, cualquier card de la app, hereda ese comportamiento (event delegation)
    const viewContainer = document.getElementById("view");

    viewContainer.addEventListener("click", (e) => {

        //Uso el mismo Listener para cargar los comportamientos
        //que deben tener los botones de remove de las cards de favoritos
        const remove_btn = e.target.closest(".favorite-remove-btn");
        if (remove_btn){

            console.log("clic en remove-btn")

            const card = remove_btn.closest(".card");
            const cardId = card.dataset.id;

            console.log("el remove btn es de la card:", cardId);

            //toma la info de localStorage. Siempre existe
            //porque se renderiza desde esa lista 
            const favorite_array = JSON.parse(localStorage.getItem("favorite_array"));

            //lo busco 
            const index = favorite_array.findIndex(elem => elem.id == cardId);

            if( index !== -1)
            {

                favorite_array.splice(index, 1); //borra un elemento a partir de ese indice
                //reemplazo todo el array con la modificacion
                localStorage.setItem("favorite_array", JSON.stringify(favorite_array));
            }

            window.navigate('/favorite');
            return;  //si no cortas sigue

        }        
        
        //Comportamiento de las cards
        const card = e.target.closest(".card");
        //if (!card) return;
        if(card){
        
            //si sigue es una driver card
            console.log("click en una card!.");

            //se usa localStorage para guardar los valores de la card
            //para renderizar la vista details
            //(estandariza mecanismo para todos los renders de todas las cards)


            const detail_data_view = {  type: card.dataset.type,
                                        id: card.dataset.id,
                                        url: card.dataset.url,
                                        name: card.dataset.name
            };

            localStorage.setItem("detail_view", JSON.stringify(detail_data_view));

            //toma el array de cards del historial. Si ya está actualiza date, sino lo guarda
            //si está vacío cargo history_array con []
            const history_array = JSON.parse(localStorage.getItem("history_array")) || [];

            //Busco el índice del elemento
            const index = history_array.findIndex(item => item.id === card.dataset.id);

            //Si lo encuentra actualizo, sino lo agrego
            if (index !== -1) {
                history_array[index].date = new Date();
                console.log("Elemento encontrado: se actualizó la fecha");
            } else {

                let history_item;


                //console.log("nombre que va a guardar en history_array: " + card.dataset.name);
                //card.dataset.name = "blabla bla";



                //Guarda en historial los datos necesarios para mostrar la card...
                switch(card.dataset.type){
                
                    case("driver"):
                        history_item = {
                            type : card.dataset.type,
                            id : card.dataset.id,
                            url : card.dataset.url,
                            name : card.dataset.name,
                            img : "./src/assets/icons/casco2.png",
                           // code :       <li> Code: ${data.code} </li>,
                           // number :     <li> Number: ${data.permanentNumber}</li>,
                           // nacionality :   <li> Nacionality: ${data.nationality} </li>,
                            date : new Date()
                        };
                    break;

                    case("circuit"):
                        history_item = {
                            type : card.dataset.type,
                            id : card.dataset.id,
                            url : card.dataset.url,
                            name : card.dataset.name,
                            img : "./src/assets/icons/circuito2.png",
                            // country :   <li> Country: ${data.nationality} </li>,
                            date : new Date()
                    };
                    break;

                };

                history_array.push(history_item);

            }

            //reemplazo todo el array con la modificacion
            localStorage.setItem("history_array", JSON.stringify(history_array));

            window.navigate('/detail');

            return;
        }

    });



    //renderiza Home
    initRouter();

    const nav = document.getElementById("nav");

    const nav_component = document.createElement("div");
    nav_component.innerHTML = Navbar();

    nav.replaceChildren(...nav_component.children);

    render();


    //cargo variable para filtrado global de pilotos y circuitos
    //no se usa AWAIT para que trabaje en segundo plano. Luego verifico,
    //en la vista que la necesito, si terminó de cargar...
    initDataStore();

    console.log("main js loaded");

    //para saber si cargan
    //console.log(JSON.stringify(getPilotosStore()));
    //console.log(JSON.stringify(getCircuitosStore()));
    
});

