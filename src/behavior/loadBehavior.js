
import { getCircuitos,getPilotos } from "./busqueda.behavior.js";
import { contactoBehavior } from "./contacto.behavior.js";

export function loadBehavior(path) {

    switch(path){
        case "/search":
            document.getElementById("pilotos_btn")
            .addEventListener("click", () => getPilotos());

            document.getElementById("circuitos_btn")
            .addEventListener("click", () => getCircuitos());

            //comportamiento del accordion
            document.querySelectorAll(".accordion-item-header").forEach(button => {
                button.addEventListener("click", () => {

                const item = button.parentElement;
                const body = button.nextElementSibling;

                const isOpen = item.classList.contains("active");

                // cerrar todos (comportamiento accordion real)
                document.querySelectorAll(".accordion-item").forEach(i => {
                    i.classList.remove("active");
                    i.querySelector(".accordion-item-body").style.height = null;
                });

                // abrir el actual si estaba cerrado
                if (!isOpen) {
                    item.classList.add("active");
                    body.style.height = body.scrollHeight + "px";
                }
            });
});
        break;
        case "/contact":
            contactoBehavior();
        break;
    }
}