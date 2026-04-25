
export function circuitCard(data) {
    return`
    <div class="circuit-card card" data-type="circuit" data-id="${data.ciruitId}" data-url="${data.url}" data-lat="${data.Location.lat}" data-long="${data.Location.long}" data-locality="${data.Location.locality}">
        <img src="./src/assets/icons/circuito2.png" class="card-img-icon" alt="imagen">
        <div class="card-body">
            <ul class="card-description">
                <li> ${data.circuitName} </li>
                <li> Locality: ${data.Location.locality} </li>
                <li> Country: ${data.Location.country} </li>
            </ul>
        </div>
    </div>`;
}