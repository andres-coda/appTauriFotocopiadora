import { pedidoAdapter } from "./pedido.adapter.js";

export const clienteAdapter = (cliente) => {
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