import './pedidoArchivo.css'
import Tilde from '../../../../assets/check.svg';
function PedidoArchivos({ pedido }) {
  return (
    <div className="pedido-archivo-container">
      <img src={Tilde} alt='Erchivos' />
      <div className={`pedido-archivo-container`}>
        <div className='pedido-archivo-interno'>
          <h5>{pedido.archivos}</h5>
          <h6>Archivo</h6>
        </div>
        <div className='pedido-archivo-interno'>
          <h5>{pedido.anillados}</h5>
          <h6>Anillado </h6>
        </div>
      </div>
    </div>
  )
}

export default PedidoArchivos;