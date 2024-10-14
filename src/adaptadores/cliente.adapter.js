import { clienteInicial } from "./default/inicialesDefault.js";
import { pedidoAdapter } from "./pedido.adapter.js";

export const clienteAdapter = (cliente) => {
   if (!cliente) {
      const newCliente = {...clienteInicial}
      return newCliente;
   }
   const pedidos = cliente && Array.isArray(cliente.pedidos) ? cliente.pedidos?.map(pedido => pedidoAdapter(pedido)) : [];
   const clienteFormateado = {
        idPersona: cliente.idPersona,
        nombre: cliente.nombre,
        celular: cliente.celular,
        email: cliente.email,
        pedidos: pedidos 
   } 
   return clienteFormateado;
}