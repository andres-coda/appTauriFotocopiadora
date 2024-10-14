import { estadoPedidoInicial } from "./default/inicialesDefault";

export const estadoAdapter = (estado) => {
    if (!estado) {
        const newEstado = {...estadoPedidoInicial};
        return newEstado;
    }
    const estadoFormateado = {
        idEstadoPedido: estado.idEstadoPedido,
        estado: estado.estado,
    }
    return estadoFormateado;
}