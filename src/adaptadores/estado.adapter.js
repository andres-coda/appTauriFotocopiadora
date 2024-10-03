export const estadoAdapter = (estado) => {
    const estadoFormateado = {
        idEstadoPedido: estado.idEstadoPedido,
        estado: estado.estado,
    }
    return estadoFormateado;
}