
export function graficoPie(elemId,label1,item1,label2,item2){

    //console.log("elemId: " + elemId + "item1: " + item1 + "item2" + item2 + "label1" + label1 + "label2" + label2);

    const ctx = document.getElementById(elemId);

    new Chart(ctx, {
        type: "pie",
        data: {
            labels: [label1, label2],
            datasets: [{
                data: [item1, item2],
                backgroundColor: ["#22c55e", "#ef4444"]
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: false
                }
            },
            responsive: true,
            aspectRatio: 1
        }
    });

}