import { useContext, useEffect, useState } from "react";
import './libroEstadoCard.css'
import { useNavigate } from "react-router-dom";
import { contexto } from "../../../contexto/contexto";
import { caseClaseEstado } from "../../../funciones/utilidades.function.js";
import { filtrarPedidos } from "../../../servicios/pedido.service.js";
import { rutasGenerales } from "../../../rutas/rutas.jsx";
import EspecificacionesCard from "../../pedidos/especificaciones/especificacionesCard.jsx";

function LibroEstadoCard({stock}) {
  const [estadoClas, setEstadoClas] = useState(`pendiente`);
  const navigate = useNavigate()
  const { datos, setDatos } = useContext(contexto);
  const [error, setError] = useState('');
  
  useEffect(() => {
    caseClaseEstado(setEstadoClas, stock.estado.idEstadoPedido);
  }, [stock.estado.idEstadoPedido]);

  const handleCardClick = async () => {
    const espId = stock.especificaciones.map(esp=>esp.idEspecificaciones)
    const especificacionesStr = encodeURIComponent(JSON.stringify(espId));
    const endpoint = `?estado=${stock.estado.estado.toLowerCase()}&especificaciones=${especificacionesStr}&libro=${datos.libroActual.idLibro}`
    const listaPedidoLibrosAntigua ={ pedidoLibros:[], stock: stock.idStock, endpoint:endpoint}
    await filtrarPedidos(endpoint,setError, listaPedidoLibrosAntigua, setDatos );
    if (!error) {
      navigate(rutasGenerales.PEDIDOESPECIAL);
    }  
  }
  
  if (!stock || stock.cantidad<=0) return null
  return (
    <div className={`super-estado-card`} onClick={handleCardClick}>
      <div className={`super-estado-titulo ${estadoClas}`} >
      <h4>{stock.cantidad}</h4>
      </div>
      <div className="super-estado-interno">

      <h5>{stock.estado.estado}</h5>
      <EspecificacionesCard listaEspecificaciones={stock.especificaciones} clase={'especificaciones-horizontal'}/>
      </div>
    </div>

  )
}

export default LibroEstadoCard;