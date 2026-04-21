import { Navbar } from "../components/navbar.js";
import { Footer } from "../components/footer.js";
import { Header } from "../components/header.js";
import { historyCard } from "../components/historyCard.js";

export function Historial() {

    const viewContainer = document.createElement("div");

    viewContainer.innerHTML += Header("Historial");

    let main = `<main>`;

    //toma la info de localStorage
    const history_array = JSON.parse(localStorage.getItem("history_array"));

    //valida si existe y tiene datos
    if (history_array && history_array.length > 0)
    {

        let history_array_sortered = [...history_array].sort((a, b) => 
            new Date(b.date) - new Date(a.date)
        );

        main += `<div id="history-container">`;
        main += `<div id="history-card-container">`;

        history_array_sortered.forEach(element => {
            main += historyCard(element);
        });

        main += `</div>`;
        main += `</div>`;
    }
    else
    {
        main += `<div id="history-container"> <p id="history-no-data"> No hay datos </p> </div>`;
    }
    
    main += `</main>`;

    viewContainer.innerHTML += main;

    viewContainer.innerHTML += Footer();

    return viewContainer;
}
