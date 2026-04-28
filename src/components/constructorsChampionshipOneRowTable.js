
export function constructorsChampionshipOneRowTable(constructor) {

    console.log("Constructor dentro de la funcion");
    console.log(constructor);

    return `<table id="constructors-championship-one-row-table">
                <thead>
                    <tr>
                        <th>Posicion</th>
                        <th>Puntos</th>
                        <th>Victorias</th>
                    </tr>
                </thead>
                <tbody id="table-body">
                    <tr>
                        <td>${constructor.position}</td>
                        <td>${constructor.points}</td>
                        <td>${constructor.wins}</td>
                    </tr>
                </tbody>
            </table>`;
}