
export function driverCard(data) {
    return`
    <div class="driver-card card" data-type="drivers" data-id=${data.driverId} data-url=${data.url} data-name="${data.givenName} ${data.familyName}">
        <img src="./src/assets/icons/casco2.png" class="card-img-icon" alt="imagen">
        <div class="card-body">
            <ul class="card-description">
                <li> Name: ${data.givenName} ${data.familyName}</li>
                <li> Code: ${data.code} </li>
                <li> Number: ${data.permanentNumber}</li>
                <li> Nacionality: ${data.nationality} </li>
            <ul>
        </div>
    </div>`;
}