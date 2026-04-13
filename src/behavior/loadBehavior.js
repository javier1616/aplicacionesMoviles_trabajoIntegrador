
import { getCircuitos,getPilotos } from "./busqueda.behavior.js";

export function loadBehavior(path) {

    switch(path){
        case "/search":
            document.getElementById("pilotos_btn")
            .addEventListener("click", () => getPilotos());

            document.getElementById("circuitos_btn")
            .addEventListener("click", () => getCircuitos());
        break;
    }
}