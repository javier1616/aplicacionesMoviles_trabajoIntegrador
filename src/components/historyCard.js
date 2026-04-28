
export function historyCard(data) {

    let fechaConFormato = new Date(data.date).toLocaleString('es-AR', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });

    return`
    <div class="history-card card" data-type="${data.type}" data-id="${data.id}" data-url="${data.url}" data-name="${data.name}">
        <img src=${data.img} class="card-img-icon" alt="imagen">
        <div class="card-body">
            <ul class="card-description">
                <li>${data.name}</li>
                <li>Visto: ${fechaConFormato}</li>
            </ul>
        </div>
    </div>`;
}