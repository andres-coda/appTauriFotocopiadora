import { especificacionesAdapter } from "./especificaciones.adapter.js"
import { estadoAdapter } from "./estado.adapter.js";

export const libroPedidoAdapter = (libroPedido) => {
    const esp = libroPedido.especificaciones?.map(lp=>especificacionesAdapter(lp));
    const estado = estadoAdapter(libroPedido.estadoPedido);
    const lpFormateado = {
        idLibroPedido: libroPedido.idLibroPedido,
        extras: libroPedido.extras,
        cantidad: libroPedido.cantidad,
        especificaciones: esp,
        estadoPedido: estado
    }
    return lpFormateado;
}