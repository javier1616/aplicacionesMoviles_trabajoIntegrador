
export function formatearDelta(valor) {
    if (valor < 0) {
        return {
            texto: Math.abs(valor).toFixed(2), // sin signo
            clase: "positivo", // verde (ganó posiciones)
            leyenda: "Gana posiciones",
            icono: "▲" // opcional
        };
    }

    if (valor > 0) {
        return {
            texto: valor.toFixed(2),
            clase: "negativo", // rojo (perdió posiciones)
            leyenda: "Pierde posiciones",
            icono: "▼"
        };
    }

    return {
        texto: "0.00",
        clase: "neutro", // amarillo
        leyenda: "Sin cambios",
        icono: "●"
    };
}