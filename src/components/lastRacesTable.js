
export function lastRacesTable(carrera1,carrera2,carrera3) {
    return `<table id="last-races-table">
                <thead>
                    <tr>
                        <th>Grand Prix</th>
                        <th>Largada</th>
                        <th>Llegada</th>
                        <th>Pts</th>
                    </tr>
                </thead>
                <tbody id="table-body">
                    <tr>
                        <td>${carrera1.name}</td>
                        <td>${carrera1.start}</td>
                        <td>${carrera1.end}</td>
                        <td>${carrera1.points}</td>
                    </tr>
                    <tr>
                        <td>${carrera2.name}</td>
                        <td>${carrera2.start}</td>
                        <td>${carrera2.end}</td>
                        <td>${carrera2.points}</td>
                    </tr>
                    <tr>
                        <td>${carrera3.name}</td>
                        <td>${carrera3.start}</td>
                        <td>${carrera3.end}</td>
                        <td>${carrera3.points}</td>
                    </tr>
                </tbody>
            </table>`;
}