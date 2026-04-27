
import { limpiarNombreDeEquipo } from "../utils/limpiarNombreDeEquipos.js";

export function driversChampionshipTable(drivers) {

    //Podes hacer cosas como 
    
    /*
    ${isDesktop ? `<td>${item.equipo}</td>` : ""}
      ${isDesktop ? `<td>${item.nacionalidad}</td>` : ""}
                        <td>${driver.Driver.familyName}</td>
    y le pasas isDesktop como parametro a la funcion,
    para mostrar u ocultar columnas segun el tamaño de pantalla.  
    
        <!--td>${driver.wins}</td-->
        <th>Victorias</th>

    */

    let datosDeLaTabla = ``;

    drivers.forEach(driver => {
        datosDeLaTabla += `<tr>
                        <td>${driver.position}</td>
                        <td>${driver.Driver.familyName}</td>
                        <td>${limpiarNombreDeEquipo(driver.Constructors[0].name)}</td>
                        <td>${driver.points}</td>
                    </tr>`
    });

    return `<table id="driver-championship-table" class="table">
                <thead>
                    <tr>
                        <th>Pos</th>
                        <th>Piloto</th>
                        <th>Equipo</th>
                        <th>Pts</th>
                        
                    </tr>
                </thead>
                <tbody id="table-body">
                    ${datosDeLaTabla}
                </tbody>
            </table>`;
}