import { useNavigate } from 'react-router-dom';
import './pedidoCard.css'
import { useContext, useEffect, useState } from 'react';
import { contexto } from '../../../contexto/contexto';
import { estadoPedido, nuevoCaseClaseEstado } from '../../../funciones/utilidades.function';
import { leerPedido } from '../../../servicios/pedido.service';
import PedidoFecha from './fecha/pedidoFecha'
import PedidoArchivos from './archivos/pedidoArchivos'
import PedidoPesos from './pesos/pedidoPesos'
import { rutasGenerales } from '../../../rutas/rutas';

function PedidoCard({pedido}) {
    const navigate = useNavigate();
  const { setDatos } = useContext(contexto);
  const [ nuevoPedido, setNuevoPedido] = useState(estadoPedido(pedido));
  const [error, setError ] = useState('')

  useEffect(() => {
    setNuevoPedido((prev)=>estadoPedido(pedido));
  }, [pedido]);

  const handlePedido = async (pedidoActual) => {
    leerPedido(pedidoActual, setDatos, setError);
    navigate(rutasGenerales.PEDIDOINDIVIDUAL);
  }
  return (
    <div className={`cliente-pedidos`} onClick={() => handlePedido(pedido)} title={nuevoPedido.estado.estado}>
      <div className={`cliente-pedidos-interno ${nuevoCaseClaseEstado(nuevoPedido.estado.idEstadoPedido)}`}>
        <PedidoFecha pedido={pedido}/>
      </div>
      <div className={`cliente-pedidos-interno ${nuevoCaseClaseEstado(nuevoPedido.estado.idEstadoPedido)}`}>
        <PedidoArchivos pedido={pedido} />
      </div>
      <div className={`cliente-pedidos-interno ${nuevoCaseClaseEstado(nuevoPedido.estado.idEstadoPedido)}`}>
        <PedidoPesos pedido={pedido} />
      </div>
    </div>
  )
}

export default PedidoCard;