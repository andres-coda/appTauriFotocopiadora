import { libroAdapterGeneral } from "./libro.adapter";
import { libroPedidoAdapter } from "./libroPedido.adapter"
import { pedidoAdapter } from "./pedido.adapter";

export const libroPedidoParticularAdapter = (lp) => {
    const libroPedido = libroPedidoAdapter(lp);
    const pedido = pedidoAdapter(lp.pedido);
    const lpFormateado = {
        ...libroPedido,
        pedido: pedido,
    }
    return lpFormateado;
}