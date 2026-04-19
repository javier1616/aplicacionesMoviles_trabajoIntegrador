
export function historyCard(data) {
    return`
    <div class="history-card">
        <img src=${data.img} class="card-img-icon" alt="imagen">
        <div class="card-body">
            <h3 class="card-title">${data.name}</h3>
            <p class="card-text">
                Página visitada: ${data.date}
            </p>
        </div>
    </div>`;
}