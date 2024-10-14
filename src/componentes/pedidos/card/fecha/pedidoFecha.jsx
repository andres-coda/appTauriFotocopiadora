import Calendario  from '../../../../assets/calendario.svg';
import { formatoFecha, formatoHora } from '../../../../funciones/utilidades.function.js';
import './pedidoFecha.css'

function PedidoFecha({pedido}) {
  return (
    <div className="pedido-fecha-container">
      <img src={Calendario} alt='Fecha' />
      <div className='pedido-fecha-container'>
        <div className='pedido-fecha-interno'  title={`Tomado a las ${formatoHora(pedido.fechaTomado)}`}>
          <h6>Tomado </h6>
          <h5>{formatoFecha(pedido.fechaTomado)}</h5>
        </div>
        <div className='pedido-fecha-interno'>
          <h6>Entrega </h6>
          <h5>{formatoFecha(pedido.fechaEntrega)}</h5>
        </div>
      </div>
    </div>
  )
}

export default PedidoFecha;