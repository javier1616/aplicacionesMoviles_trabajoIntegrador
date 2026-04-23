import { Navbar } from "../components/navbar.js";
import { Footer } from "../components/footer.js";
import { Header } from "../components/header.js";
import { favoriteCard } from "../components/favoriteCard.js";

export function Favorite() {

        const viewContainer = document.createElement("div");
    
        viewContainer.innerHTML += Header("Favoritos");
    
        let main = `<main>`;
    
        //toma la info de localStorage
        const favorite_array = JSON.parse(localStorage.getItem("favorite_array"));

        //valida si existe y tiene datos
        if (favorite_array && favorite_array.length > 0)
        {

            //EL ORDENAMIENTO TIENE QUE SER POR OTRA COSA, QUIZA POR RATING
            let favorite_array_sortered = [...favorite_array].sort((a, b) => 
                b.id - a.id
            );
    
            main += `<div id="favorite-container">`;
            main += `<div id="favorite-card-container">`;
    
            console.log("antes de enviar a la card");

            favorite_array_sortered.forEach(element => {
                console.log(element);
                main += favoriteCard(element);
            });

            console.log("luego de la card");
    
            main += `</div>`;
            main += `</div>`;
        }
        else
        {

            /*
            main += `<div id="favorite-card-container">`;
            favorite_array.forEach(element => {
                main += favoriteCard(element);
            });
            main += `</div>`;
            */

            main += `<div id="favorite-container">
                        <p id="favorite-no-data">
                            No hay datos
                        </p>
                    </div>`;
        }
        
        main += `</main>`;
    
        viewContainer.innerHTML += main;
    
        viewContainer.innerHTML += Footer();
    
        return viewContainer;
    
}
