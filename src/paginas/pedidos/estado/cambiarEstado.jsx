import { useContext, useState } from "react";
import './cambiarEstado.css'
import { contexto } from "../../../contexto/contexto";
import { URL_GEST_ESTADO_PEDIDO } from "../../../endPoint/endpoint.ts";
import { cambiarEstadoLibroPedido } from "../../../servicios/pedido.service.js";
import Cargando from "../../../componentes/cargando/cargando.jsx";


function CambiarEstado({estadoClase, libroPedido, setModifEstado}) {
  const { datos } = useContext(contexto);
  const [cargando, setCargando] = useState(false);
  const [textoCargando, setTextoCargando] = useState('Efectuando cambio de estado')

  const handleCambiarEstado = async (estado) => {    
    setCargando(true);
    const idsEspecificaciones = libroPedido.especificaciones.map(e => e.idEspecificaciones);
    const libroAEnviar = {
      cantidad: libroPedido.cantidad,
      extras: libroPedido.extras,
      idLibroPedido: libroPedido.idLibroPedido,
      libro: {
        idLibro: libroPedido.libro.idLibro,
      },
      pedido: {
        idPedido: libroPedido.pedido ? libroPedido.pedido.idPedido : datos.pedidoActual.idPedido,
        cliente: {
          idPersona: libroPedido.pedido ? libroPedido.pedido.cliente.idPersona : datos.pedidoActual.cliente.idPersona,
        }
      },
      especificaciones: idsEspecificaciones,
      estadoPedido: libroPedido.estadoPedido,
    }
    const librosPedidos = [libroAEnviar];
    const dtoPedido = { librosPedidos, estado };
    const idPedido = libroPedido.pedido ? libroPedido.pedido.idPedido: datos.pedidoActual.idPedido;
    const endpoint = `${URL_GEST_ESTADO_PEDIDO}/${idPedido}`;
    const newPedido = await cambiarEstadoLibroPedido(endpoint,dtoPedido, setTextoCargando);

    if (newPedido) {
      setCargando(false);
      setModifEstado(false);
    }
  }
  if (cargando) return (
    <Cargando children={<p>{textoCargando}</p>} />
  )
  return (
    <div className="estados-modif">
      <>
        <h6>Cambiar el estado del pedido</h6>
        <div className={`estado-actual ${estadoClase}`}>
          <p>Estado actual: {libroPedido.estadoPedido.estado}</p>
          <p>Cantidad de libros: {libroPedido?.cantidad}</p>
        </div>
        <h6>Seleccionar nuevo estado</h6>
        <ul>
          {datos.estados.map((estado, index) => (
            <li key={`estado-${index}`} onClick={() => handleCambiarEstado(estado)}>{estado.estado}</li>
          ))}
        </ul>
      </>
    </div>
  )
}
export default CambiarEstado;