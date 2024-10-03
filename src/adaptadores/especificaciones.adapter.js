export const especificacionesAdapter = (esp) => {
    const espFormateada = {
        idEspecificaciones: esp.idEspecificaciones,
        nombre: esp.nombre
    }
    return espFormateada;
}