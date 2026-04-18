
export async function contactoBehavior() {

    var map = L.map('map').setView([-34.9215, -57.9536], 12);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    var marker = L.marker([-34.9215, -57.9536]).addTo(map);

    marker.bindPopup("<b>Oficinas</b><br>Aquí están nuestras oficinas.").openPopup();

}