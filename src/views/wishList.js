import { Navbar } from "../components/navbar.js";
import { Footer } from "../components/footer.js";
import { Header } from "../components/header.js";
import { favoriteCard } from "../components/favoriteCard.js";

export function WishList() {

      //testeo de almacenamiento en localStorage
    const item1 = { img:"./src/assets/icons/crono1.png",
                    title:"Max Verstappen",
                    date:"12/3/2026"
    };
    const item2 = { img:"./src/assets/icons/crono1.png",
                    title:"Albert Park Circuit",
                    date:"12/3/2026"
    };
    const item3 = { img:"./src/assets/icons/crono1.png",
                    title:"Monza Circuit",
                    date:"12/3/2026"
    };
    const favorite_pages = [item1, item2, item3];
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
