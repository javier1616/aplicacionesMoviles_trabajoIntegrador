
export function favoriteCard(data) {
    return`
    <div class="favorite-card card" data-type="${data.type}" data-id="${data.id}" data-url="${data.url}" data-name="${data.name}">
        <p class="card-title">${data.name}</p>
        <div class="card-body">
            <img src=${data.img} class="card-img-icon" alt="imagen">
            <ul class="card-description">
                <li>${data.prioridadStars}</li>
                <li>${data.motivo}</li>
                <!--li>${data.comentario}</li-->
            </ul>
            <div class="card-footer">
                <button class="btn btn-primary favorite-remove-btn">
                    <img src="./src/assets/icons/basura.png" class="favorite-remove-icon" alt="imagen">
                </button>
            </div>
        </div>
        <p class="card-comentario">${data.comentario}</p>
    </div>`;
}