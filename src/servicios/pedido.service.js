import { pedidoAdapter } from "../adaptadores/pedido.adapter.js";
import { URL_GEST_ESTADO_PEDIDO, URL_LIBRO_PEDIDO, URL_PEDIDOS, URL_PEDIDO_COMPLETO } from "../endPoint/endpoint.ts";
import { fetchDelete, fetchGet, fetchPatCh, fetchPost } from "../funciones/fetch.function.js";

export const leerPedido = async (pedidoActual, setDatos, setError) => {
    try {
        const pedidoActualizado = await fetchGet(URL_PEDIDOS + '/' + pedidoActual.idPedido);
        if (pedidoActualizado) {
            const newPedidoActual = pedidoAdapter(pedidoActualizado);
          setDatos((prev) => ({ ...prev, pedidoActual: newPedidoActual }));  
        }
      } catch (error) {
        setError(error);
        console.log(error);
      }
}

export const retirarPedido = async (pedidoActual, dtoPedido, setError, setDatos) => {
  try {
    const result = await fetchPatCh(URL_GEST_ESTADO_PEDIDO + '/' + pedidoActual.idPedido,  dtoPedido, setError);
    if (result) {
      // Todas las solicitudes se completaron con éxito
      console.log("Todos los pedidos se actualizaron correctamente");
      setDatos((prev) => ({ ...prev, pedidoActual: result }));
    } else {
      // Manejar el caso en el que alguna solicitud falló
      setError("Algunos pedidos no se pudieron actualizar")
      console.error("Algunos pedidos no se pudieron actualizar");
    }
  } catch (error) {
    // Manejar errores de la solicitud
    setError(`Error al retirar los pedidos: ${error}`)
    console.error("Error al retirar los pedidos", error);
  }
}

export const filtrarPedidos = async (endpoint, setError, listaPedidoLibrosAntigua, setDatos) => {
  try {
    const listaLibrosP = await fetchGet(URL_LIBRO_PEDIDO + endpoint, setError);
    if (listaLibrosP) {
      const listaPedidoLibros = { ...listaPedidoLibrosAntigua, pedidoLibros: listaLibrosP, endpoint: endpoint }
      setDatos((prev) => ({ ...prev, listaPedidoLibros: listaPedidoLibros }));
    }
  } catch (error) {
    setError(error)
    console.error(error);
    
  }
}

export const cambiarEstadoLibroPedido = async (endpoint, dtoPedido, setError) => {
  try {
    const newPedido = await fetchPatCh(endpoint, dtoPedido);
    return newPedido;
  } catch (error) {
    setError(`Fallo la actualización: ${error}`);
    console.error('Fallo la actualización ' + error);
  }
}

export const eliminarPedido = async (pedido, setError) => {
  try {
    const eliminar = await fetchDelete(URL_PEDIDOS+'/'+pedido.idPedido,setError);
    if (eliminar) return eliminar;
  } catch (error) {
    setError(`Error al tratar de eliminar el pedido: ${error}`)
    console.error(`Error al tratar de eliminar el pedido: ${error}`);
    
  }
}

export const crearPedido = async ( pedidoCompleto, setDatos, setError) => {
  try {
    const nuevoPedido = await fetchPost(URL_PEDIDO_COMPLETO, pedidoCompleto, setError);
    if (nuevoPedido) {
      console.log('pedido cargado con exito');
      setDatos((prev)=>({...prev, pedidoActual:nuevoPedido}));
      return nuevoPedido;
    }
  } catch (error) {
    setError(error.message || 'Error desconocido al procesar la solicitud');
    console.error('Error al procesar la solicitud:', error.message);
  }
}