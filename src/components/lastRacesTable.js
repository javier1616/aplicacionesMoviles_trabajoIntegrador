
export function lastRacesTable(carreras) {
    
    let datosDeLaTabla = ``;

    carreras.forEach(element => {
        datosDeLaTabla += `<tr>
                                <td>${element.name}</td>
                                <td>${element.start}</td>
                                <td>${element.end}</td>
                                <td>${element.points}</td>
                            </tr>`
    });
    
    
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
                    ${datosDeLaTabla}
                </tbody>
            </table>`;
}