export function driversChampionshipOneRowTable(driver) {
    return `<table id="driver-championship-one-row-table">
                <thead>
                    <tr>
                        <th>Posicion</th>
                        <th>Puntos</th>
                        <th>Victorias</th>
                    </tr>
                </thead>
                <tbody id="table-body">
                    <tr>
                        <td>${driver.position}</td>
                        <td>${driver.points}</td>
                        <td>${driver.wins}</td>
                    </tr>
                </tbody>
            </table>`;
}