import { useContext } from "react";
import './cambiarEstado.css'
import { contexto } from "../../../contexto/contexto";
import useCambiarEstado from "../../../hooks/pedido/estado/useCambiarEstado.js";


function CambiarEstado({estadoClase, libroPedido}) {
  const { datos } = useContext(contexto);
  const {response, errorFetch, loading, handleCambiarEstado} = useCambiarEstado(libroPedido);

  if (loading || errorFetch || response) return (
    <>
        {
          loading 
            ? (<h6>Cambiando estado del pedido ...</h6>) 
            : errorFetch 
              ? (<h6>{`Error al cambiar el estdao del pedido: ${errorFetch}`}</h6>) 
              : <h6>Pedido cambiado con exito</h6>
        }
              </>
  );
  

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