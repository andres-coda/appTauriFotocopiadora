import { useGlobalContext } from "../../../contexto/contexto";
import { URL_GEST_ESTADO_PEDIDO } from "../../../endPoint/endpoint.ts";
import useApi from "../../../servicios/Api/useApi";

function useCambiarEstado(libroPedido) {
  const { datos } = useGlobalContext();

  const idPedido = libroPedido.pedido ? libroPedido.pedido.idPedido : datos.pedidoActual.idPedido;
  const idPersona = libroPedido.pedido ? libroPedido.pedido.cliente.idPersona : datos.pedidoActual.cliente.idPersona;

  const {fetchData, response, errorFetch, loading} = useApi()

  const handleCambiarEstado = async (estado) => {

    const idsEspecificaciones = libroPedido.especificaciones.map(e => e.idEspecificaciones);
    const libroAEnviar = {
      cantidad: libroPedido.cantidad,
      extras: libroPedido.extras,
      idLibroPedido: libroPedido.idLibroPedido,
      libro: {
        idLibro: libroPedido.libro.idLibro,
      },
      pedido: {
        idPedido: idPedido,
        cliente: {
          idPersona: idPersona,
        }
      },
      especificaciones: idsEspecificaciones,
      estadoPedido: libroPedido.estadoPedido,
    }
    const librosPedidos = [libroAEnviar];
    const dtoPedido = { librosPedidos, estado };
    const endpoint = `${URL_GEST_ESTADO_PEDIDO}/${idPedido}`;
    
    await fetchData (endpoint, JSON.stringify(dtoPedido), 'PATCH');
  }

  return {response, errorFetch, loading, handleCambiarEstado}
}

export default useCambiarEstado;