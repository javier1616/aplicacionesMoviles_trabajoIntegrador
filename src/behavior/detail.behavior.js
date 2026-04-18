


export async function detailBehavior() {

    //toma la info de localStorage
    const detail_data_view = JSON.parse(localStorage.getItem("detail_view"));

    //viene algo como :
    // {
    //    type: "driver",       --> driver/circuit (por ahora solo esos)
    //    id: card.dataset.id,  --> id relativo al driver/circuit que estoy viendo 
    // };

    if(detail_data_view.type)       //primero valido si existe
    {
        //cuando renderices distinto haces un if para cada caso
        //capaz tenes que separar por los fetches
        if(detail_data_view.type == "driver" || detail_data_view.type == "circuit")
        {

            const title = document.getElementById('detail-title');

            title.innerHTML = detail_data_view.id; //por ahora es solo para ver si levanta

            //tengo que hacer los fetches correspondientes

            return;

        }

    }

    //no deberia llegar hasta esta linea
    console.log("Error: no hay datos en localStorage(detail_view)")
    return;

}