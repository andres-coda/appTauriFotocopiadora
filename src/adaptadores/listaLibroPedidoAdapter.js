import { libroPedidoBusquedaAdapter } from "./libroPedidoBusquedaAdapter.adapter";

function listaLibroPedidoAadapter(lista) {
    const newLista = lista.map(lp=> libroPedidoBusquedaAdapter(lp))
    return newLista;
}

export default listaLibroPedidoAadapter;