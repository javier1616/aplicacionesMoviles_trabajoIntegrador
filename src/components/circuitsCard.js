
export function circuitCard(data) {
    return`
    <div class="circuit-card">
        <img src="./src/assets/icons/pista.png" class="card-img-top" alt="imagen">
        <div class="card-body">
        <h5 class="card-title">${data.circuitName}</h5>
            <p class="card-text">
                Country: ${data.Location.country}
            </p>
        </div>
    </div>`;
}