import { Navbar } from "../components/navbar.js";
import { Footer } from "../components/footer.js";
import { Header } from "../components/header.js";
import { historyCard } from "../components/historyCard.js";

export function Historial() {

    //testeo de almacenamiento en localStorage
    const history_pages = ["home", "search", "detail"];
    localStorage.setItem("history_array", JSON.stringify(history_pages));

    const viewContainer = document.createElement("div");

    viewContainer.innerHTML += Header("Historial");

    let main = `<main>`;

    main += `<p>Historial de páginas visitadas (hardcoded)</p>`;

    //toma la info de localStorage
    const history_array = JSON.parse(localStorage.getItem("history_array"));

    //valida si existe y tiene datos
    if (history_array && history_array.length > 0)
    {
        main += `<div id="historial_card_container">`;
        history_array.forEach(element => {
            main += historyCard(element);
        });
        main += `</div>`;
    }
    else
    {
        main += "<p>No hay datos</p>";
    }
    
    main += `</main>`;

    viewContainer.innerHTML += main;

    viewContainer.innerHTML += Footer();

    return viewContainer;
}
