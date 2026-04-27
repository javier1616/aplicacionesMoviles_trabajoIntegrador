import { validarFormularioFavoritos } from "../utils/validarFormulario.js";

export function openModal(detail_data_view) {

    const modal = document.getElementById("modal-container");

    modal.classList.remove("hidden"); //muestra el modal
    document.body.style.overflow = "hidden";    //bloquea el scroll

    //toma la info de localStorage. Si no existe cargo con []
    let favorite_array = JSON.parse(localStorage.getItem("favorite_array")) || [];

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


    //para que actualice mensajes de error cuando cambia el formulario
    document.getElementById("favoritos-form")
                    .addEventListener("input", handleFavoritosInput);

    //Comportamiento para agregar a favoritos
    const agregar_favoritos_btn = document.getElementById("modal-add-favorite-btn");

    agregar_favoritos_btn.addEventListener("click", (e) => {

        console.log("click handler ejecutado");

        //vuelve a validar errores para evitar alguna manipulacion de información

        const form_favoritos = document.getElementById("favoritos-form");
        const prioridad = form_favoritos.querySelector('input[name="priority"]:checked')?.value;
        const motivo = form_favoritos.querySelector('input[name="motivo"]:checked')?.value;
        const comentario = document.getElementById("favoritos-comentario").value;

        const error_prioridad = document.getElementById("favoritos-error-priority");
        const error_motivo = document.getElementById("favoritos-error-motivo");
        const error_comentario = document.getElementById("favoritos-error-comentario");

        const errores = validarFormularioFavoritos(prioridad,motivo,comentario);

        console.log("errores: ", JSON.stringify(errores));
        
        if(Object.keys(errores).length > 0)
        {

            const errorPrioridad = errores.find(e => e.error === "prioridad");
            const errorMotivo = errores.find(e => e.error === "motivo");
            const errorComentario = errores.find(e => e.error === "comentario");
        
            console.log(errorPrioridad);

            if (errorPrioridad){
                console.log("entra en error prioridad");
                error_prioridad.textContent = errorPrioridad.message;
                error_prioridad.style.display = "block";
            }
            else
            {
                error_prioridad.style.display = "none";
            }
        
            if (errorMotivo) {
                error_motivo.textContent = errorMotivo.message;
                error_motivo.style.display = "block";
            }
            else
            {
                error_motivo.style.display = "none";
            }

            if (errorComentario) {
                error_comentario.textContent = errorComentario.message;
                error_comentario.style.display = "block";
            }
            else
            {
                error_comentario.style.display = "none";
            }

            return;     //si hay errores corta la ejecución y no cierra el modal

        } else {

            console.log("no hay errores, agregando a favoritos...");

            error_prioridad.style.display = "none";
            error_motivo.style.display = "none";
            error_comentario.style.display = "none";

            let favorite_item;

            //si todo es correcto lo agrego y pinto la estrella  
            //Guarda en favoritos los datos necesarios para mostrar la card luego...
            switch(detail_data_view.type){
                case("drivers"):
                    favorite_item = {
                        type : detail_data_view.type,
                        id : detail_data_view.id,
                        url : detail_data_view.url,
                        name : detail_data_view.name,
                        img : "./src/assets/icons/casco2.png",
                        prioridad : prioridad,
                        motivo : motivo,
                        comentario: comentario.length > 0 ? comentario : ""
                       // code :       <li> Code: ${data.code} </li>,
                       // number :     <li> Number: ${data.permanentNumber}</li>,
                       // nacionality :   <li> Nacionality: ${data.nationality} </li>,
                       // date : new Date()
                    };
                    favorite_array.push(favorite_item);
                break;

                case("circuits"):
                    favorite_item = {
                        type : detail_data_view.type,
                        id : detail_data_view.id,
                        url : detail_data_view.url,
                        name : detail_data_view.name,
                        img : "./src/assets/icons/circuito2.png",
                        prioridad : prioridad,
                        motivo : motivo,
                        comentario: comentario.length > 0 ? comentario : ""
                        // country :   <li> Country: ${data.nationality} </li>,
                        //date : new Date()
                    };
                    favorite_array.push(favorite_item);
                break;

            };

            console.log("Favorite_array");
            console.log(favorite_array);

            //reemplazo todo el array con la modificacion
            localStorage.setItem("favorite_array", JSON.stringify(favorite_array));

            //pinto la estrella
            const favorite_btn = document.getElementById("favorite-btn");
            const img = favorite_btn.querySelector('img');
            img.src = "./src/assets/icons/star-full-yellow.svg";

            alert("Agregado a favoritos");

            closeModal();

        };
        
    });

}

export function closeModal() {
    console.log("cerrando el modal...");
    const modal = document.getElementById("modal-container");
    modal.classList.add("hidden");
    document.body.style.overflow = "";  // activa nuevamente el scroll
}


function handleFavoritosInput(){

    const form_favoritos = document.getElementById("favoritos-form");
    const prioridad = form_favoritos.querySelector('input[name="priority"]:checked')?.value;
    const motivo = form_favoritos.querySelector('input[name="motivo"]:checked')?.value;
    const comentario = document.getElementById("favoritos-comentario").value;

    console.log("datos del formulario");
    console.log("prioridad: " + prioridad + " motivo: " + motivo + " comentario: " + comentario);
    
    const error_prioridad = document.getElementById("favoritos-error-priority");
    const error_motivo = document.getElementById("favoritos-error-motivo");
    const error_comentario = document.getElementById("favoritos-error-comentario");

    const errores = validarFormularioFavoritos(prioridad,motivo,comentario);

    console.log("errores: ", JSON.stringify(errores));
    
    if(Object.keys(errores).length > 0)
    {

        const errorPrioridad = errores.find(e => e.error === "prioridad");
        const errorMotivo = errores.find(e => e.error === "motivo");
        const errorComentario = errores.find(e => e.error === "comentario");

        if (errorPrioridad){
            console.log("entra en error prioridad");
            error_prioridad.textContent = errorPrioridad.message;
            error_prioridad.style.display = "block";
        }
        else
        {
            error_prioridad.style.display = "none";
        }
    
        if (errorMotivo) {
            error_motivo.textContent = errorMotivo.message;
            error_motivo.style.display = "block";
        }
        else
        {
            error_motivo.style.display = "none";
        }

        if (errorComentario) {
            error_comentario.textContent = errorComentario.message;
            error_comentario.style.display = "block";
        }
        else
        {
            error_comentario.style.display = "none";
        }
    }
    else
    {
        error_prioridad.style.display = "none";
        error_motivo.style.display = "none";
        error_comentario.style.display = "none";
    }

}
