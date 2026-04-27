export function constructorsChampionshipTable(constructors) {

     let datosDeLaTabla = ``;
    
    constructors.forEach(constructor => {
        datosDeLaTabla += `<tr>
                        <td>${constructor.position}</td>
                        <td>${constructor.Constructor.name}</td>
                        <td>${constructor.points}</td>
                    </tr>`
    });

    return `<table id="constructor-championship-table" class="table">
                <thead>
                    <tr>
                        <th>Posicion</th>
                        <th>Equipo</th>
                        <th>Puntos</th>
                    </tr>
                </thead>
                <tbody id="table-body">
                    ${datosDeLaTabla}
                </tbody>
            </table>`;
}