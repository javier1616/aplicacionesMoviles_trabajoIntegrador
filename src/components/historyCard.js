
export function historyCard(data) {
    return`
    <div class="history-card" style="width: 18rem;">
        <img src="./src/assets/icons/crono1.png" class="card-img-top" alt="imagen" style="width: 10px; height: 10px;">
        <div class="card-body">
        <h5 class="card-title">Título</h5>
            <p class="card-text">
                Página visitada: ${data}
            </p>
        </div>
    </div>`;
}