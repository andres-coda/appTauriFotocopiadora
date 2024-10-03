import { libroAdapterGeneral } from "./libro.adapter";
import { libroPedidoAdapter } from "./libroPedido.adapter"

export const  libroPedidoAdapterPedido = (lp) => {
    const libroPedido = libroPedidoAdapter(lp);
    const libro = libroAdapterGeneral(lp.libro);
    const lpFormateado = {
        ...libroPedido,
        libro:libro,
    }
    return lpFormateado;
}