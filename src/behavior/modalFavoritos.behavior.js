export function openModal(detail_data_view,favorite_array) {

    const modal = document.getElementById("modal-container");

    modal.classList.remove("hidden"); //muestra el modal
    document.body.style.overflow = "hidden";    //bloquea el scroll

    //Comportamientos para cierre del modal
    //para que cierre el modal si toco ESC
    //si no existe el modal cuando toca ESC no pasa nada porque el modal existe
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeModal();
        }
    });

    const backdrop = document.getElementById("modal-backdrop")
    backdrop.addEventListener("click", (e) => {
        if (e.target === backdrop) { //e.target es el elemento exacto donde se clickea
            closeModal();
        }
    });

    const modal_cancel_btn = document.getElementById("modal-add-favorite-cancel-btn")
    backdrop.addEventListener("click", (e) => {
        if (e.target === modal_cancel_btn) {
            closeModal();
        }
    });

    console.log("modal abierto");

    const input = document.querySelector("#modal-input");
    input.focus();  //se activa ese campo en el modal


    //Comportamiento para agregar a favoritos
    const agregar_favoritos_btn = document.getElementById("modal-add-favorite-btn");

    agregar_favoritos_btn.addEventListener("click", (e) => {

//        if(!datosValidos())  return;     //si hay algo mal sale y NO cierra el modal

        let favorite_item;

        //si todo es correcto lo agrego y pinto la estrella  
        //Guarda en favoritos los datos necesarios para mostrar la card luego...
        switch(detail_data_view.type){
            case("driver"):
                favorite_item = {
                    type : detail_data_view.type,
                    id : detail_data_view.id,
                    url : detail_data_view.url,
                    name : detail_data_view.name,
                    img : "./src/assets/icons/casco2.png"
                   // code :       <li> Code: ${data.code} </li>,
                   // number :     <li> Number: ${data.permanentNumber}</li>,
                   // nacionality :   <li> Nacionality: ${data.nationality} </li>,
                   // date : new Date()
                };
            break;

            case("circuit"):
                favorite_item = {
                    type : detail_data_view.type,
                    id : detail_data_view.id,
                    url : detail_data_view.url,
                    name : detail_data_view.name,
                    img : "./src/assets/icons/circuito.png"
                    // country :   <li> Country: ${data.nationality} </li>,
                    //date : new Date()
            };
            break;

        };

        favorite_array.push(favorite_item);

        //reemplazo todo el array con la modificacion
        localStorage.setItem("favorite_array", JSON.stringify(favorite_array));

        //pinto la estrella
        const favorite_btn = document.getElementById("favorite-btn");
        const img = favorite_btn.querySelector('img');
        img.src = "./src/assets/icons/star-full-yellow.svg";

        alert("Agregado a favoritos");

        closeModal();

    });

}

    

export function closeModal() {
    console.log("cerrando el modal...");
    const modal = document.getElementById("modal-container");
    modal.classList.add("hidden");
    document.body.style.overflow = "";  // activa nuevamente el scroll
}

