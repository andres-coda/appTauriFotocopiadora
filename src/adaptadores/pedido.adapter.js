import { pedidoInicial } from "./default/inicialesDefault";
import { libroPedidoAdapterPedido } from "./libroPedidoAdapterPedido.adapter";

export const pedidoAdapter = (pedido) => {
    if (!pedido) {
        const newPedido = {...pedidoInicial}
        return newPedido;
    }
    const librosPedidos = pedido.librosPedidos?.map(lp => libroPedidoAdapterPedido(lp));
    const cliente = pedido.cliente 
    ? { 
        idPersona:pedido.cliente.idPersona, 
        nombre:pedido.cliente.nombre, 
        email:pedido.cliente.email, 
        celular:pedido.cliente.celular, 
    } : null
    const pedidoFormateado = {
        idPedido: pedido.idPedido,
        fechaTomado: pedido.fechaTomado,
        fechaEntrega: pedido.fechaEntrega,
        importeTotal: pedido.importeTotal,
        sena: pedido.sena,
        cliente: cliente,
        archivos: pedido.archivos,
        anillados: pedido.anillados,
        librosPedidos: librosPedidos,
    }
    return pedidoFormateado;
}