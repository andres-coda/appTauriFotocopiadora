import { clienteAdapter } from "./cliente.adapter";

const listaClientesAdapter= (res) => {
    const clientes = res?.map(cliente => clienteAdapter(cliente));
    return clientes
}

export default listaClientesAdapter;