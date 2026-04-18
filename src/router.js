
import {Home} from "./views/home.js";
import { Busqueda } from "./views/busqueda.js";
import { Contacto } from "./views/contacto.js";
import { Detalle } from "./views/detalle.js";
import { Historial } from "./views/historial.js";
import { WishList } from "./views/wishList.js";

import { loadBehavior } from "./behavior/loadBehavior.js";

const routes = {
  "/": Home,
  "/search": Busqueda,
  "/contact": Contacto,
  "/detail": Detalle,
  "/history": Historial,
  "/wishList": WishList,
};


//detecta cambios en la URL (back/forward)
export function initRouter() {
  window.addEventListener("popstate", render);  
}

export function render() {

    const path = window.location.pathname;  //toma contenido de la URL
    const view = routes[path] || Home; //elige la funcion que contiene la vista

    const app = document.getElementById("view");
    const viewContent = view(); //ejecuta la funcion para obtener el contenido de la vista
  
    app.replaceChildren(...viewContent.children); 
    //reemplaza el contenido de app por los hijos de viewContent (sin el contenedor div)

    loadBehavior(path);

}


export function navigate(path) {
  window.history.pushState({}, "", path); //cambia la URL sin recargar la página
  render();                               //renderiza la vista
}



