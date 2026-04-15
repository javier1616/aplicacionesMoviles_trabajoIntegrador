
export function favoriteCard(data) {
    return`
    <div class="favorite-card" style="width: 18rem;">
        <img src="../assets/icons/crono1.png" class="card-img-top" alt="imagen">
        <div class="card-body">
        <h5 class="card-title">Título</h5>
            <p class="card-text">
                Página visitada: ${data}
            </p>
        </div>
    </div>`;
}