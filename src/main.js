import { render, initRouter } from "./router.js";
import { Navbar } from "./components/navbar.js";

/* preguntar al profe si se puede usar window.navigate o es mejor otra cosa */
import { navigate } from "./router.js";
window.navigate = navigate;
/* ------------------------------------------------------------------------ */

document.addEventListener("DOMContentLoaded", () => {

    //Carga el comportamiento de todas las cards de la app al contenedor de las vistas
    //Se utiliza event delegation
    const viewContainer = document.getElementById("view");

    viewContainer.addEventListener("click", (e) => {

        const card = e.target.closest(".card");
        if (!card) return;
        
        //si sigue es una driver card
        console.log("click en una card!.");

        
        //se usa localStorage para guardar valor para detail
        //para estandarizar mecanismo para todos los renders

        const detail_data_view = {  type: "driver",
                                    id: card.dataset.id,
                                    url: card.dataset.url,
                                    name: card.dataset.name
        };

        localStorage.setItem("detail_view", JSON.stringify(detail_data_view));

        window.navigate('/detail');

    });


    //renderiza Home
    initRouter();
  
    const nav = document.getElementById("nav");

    const nav_component = document.createElement("div");
    nav_component.innerHTML = Navbar();

    nav.replaceChildren(...nav_component.children);

    render();


    console.log("main js loaded");
});

