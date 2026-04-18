
export function favoriteCard(data) {
    return`
    <div class="favorite-card">
        <img src=${data.img} class="card-img-icon" alt="imagen">
        <div class="card-body">
        <h5 class="card-title">${data.title}</h5>
            <p class="card-text">
                Página visitada: ${data}
            </p>
        </div>
        <div class="card-footer">
            <button class="btn btn-primary">I</button>
            <button class="btn btn-primary">D</button>
        </div>
    </div>`;
}