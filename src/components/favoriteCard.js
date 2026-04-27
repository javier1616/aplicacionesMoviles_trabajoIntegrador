
export function favoriteCard(data) {
    return`
    <div class="favorite-card card" data-type="${data.type}" data-id="${data.id}" data-url="${data.url}" data-name="${data.name}">
        <img src=${data.img} class="card-img-icon" alt="imagen">
        <div class="card-body">
            <p class="card-title">${data.name}</p>
            <ul class="card-description">
                <li>${data.prioridadStars}</li>
                <li>Motivo: ${data.motivo}</li>
                <li>${data.comentario}</li>
            </ul>
        </div>
        <div class="card-footer">
            <button class="btn btn-primary favorite-remove-btn">
                <img src="./src/assets/icons/basura.png" class="favorite-remove-icon" alt="imagen">
            </button>
        </div>
    </div>`;
}