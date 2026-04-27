export function limpiarNombreDeEquipo(nombre) {
  if (nombre.endsWith("F1 Team")) {
    return nombre.replace("F1 Team", "").trim();
  }
  return nombre;
}