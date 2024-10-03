import { libroAdapterGeneral } from "./libro.adapter.js"
import { libroPedidoAdapter } from "./libroPedido.adapter.js";
import { profeMateriaAdapter } from "./profeMateria.adapter.js";

export const libroParticularAdapter = (libro) => {
    const libroGenearl =  libroAdapterGeneral(libro);
    const librosPedidos = libro.librosPedidos?.map(lp=> libroPedidoAdapter(lp));
    const profeMaterias = libro.profeMaterias?.map(pm => profeMateriaAdapter(pm));
    const libroFormateado= {
        ...libroGenearl,
        librosPedidos:librosPedidos,
        profeMaterias: profeMaterias,
    }
    return libroFormateado;
} 