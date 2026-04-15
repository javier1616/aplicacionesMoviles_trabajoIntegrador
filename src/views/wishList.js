import { Navbar } from "../components/navbar.js";
import { Footer } from "../components/footer.js";
import { Header } from "../components/header.js";
import { favoriteCard } from "../components/favoriteCard.js";

export function WishList() {

    //testeo de almacenamiento en localStorage
    const favorite_pages = ["home", "search", "detail"];
    localStorage.setItem("favorite_array", JSON.stringify(favorite_pages));

    const viewContainer = document.createElement("div");

    viewContainer.innerHTML += Header("Favoritos");

    let main = `<main>`;

    main += `<p>Favoritos (hardcoded)</p>`;

    //toma la info de localStorage
    const favorite_array = JSON.parse(localStorage.getItem("favorite_array"));

    //valida si existe y tiene datos
    if (favorite_array && favorite_array.length > 0)
    {
        main += `<div id="favorite_card_container">`;
        favorite_array.forEach(element => {
            main += favoriteCard(element);
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
