import { estadoAdapter } from "./estado.adapter";
import { libroAdapterGeneral } from "./libro.adapter";
import { libroPedidoParticularAdapter } from "./libroPedidoParticular.adapter";


export const libroPedidoBusquedaAdapter = (lp) => {
    const libroPedido = libroPedidoParticularAdapter(lp);
    const libro = libroAdapterGeneral(lp.libro);
    const estado = estadoAdapter(lp.estadoPedido);  
    const lpFormateado ={
        ...libroPedido,
        libro:libro,
        estadoPedido: estado
    }   
    return lpFormateado;
}