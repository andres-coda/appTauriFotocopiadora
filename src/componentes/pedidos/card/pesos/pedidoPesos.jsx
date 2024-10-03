import './pedidoPesos.css'
import Pesos  from '../../../../assets/pesos.svg';
function PedidoPesos({ pedido }) {
  return (
    <div className='pedido-pesos-container'>
      <img src={Pesos} alt='$' />
      <div className={`pedido-pesos-container`}>
        <div className='pedido-pesos-interno'>
          <h6>Total</h6>
          <h6>${pedido.importeTotal}</h6>
        </div>
        <div className='pedido-pesos-interno'>
          <h6>Seña</h6>
          <h6>${pedido.sena}</h6>
        </div>
        <div className='pedido-pesos-interno'>
          <h6>Saldo</h6>
          <h5>${pedido.importeTotal - pedido.sena}</h5>
        </div>

      </div>
    </div>
  )
}

export default PedidoPesos;