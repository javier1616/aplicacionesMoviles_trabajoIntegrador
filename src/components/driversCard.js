
export function driverCard(data) {
    return`
    <div class="driver-card">
        <img src="./src/assets/icons/casco.png" class="card-img-top" alt="imagen">
        <div class="card-body">
        <h5 class="card-title"> Name: ${data.givenName} ${data.driverId}</h5>
            <p class="card-text">
                Página visitada: "otros datos"
            </p>
        </div>
    </div>`;
}