import Inputs from '../../../../componentes/input/input';
import '../pedidoCargar.css'

function CargarPedidoSaldo({onChangePedido, pedido,errorFrom}) {

  return (
    <>
      <Inputs
        name={'fechaEntrega'}
        texto={'Fecha de entrega'}
        tipo={'date'}
        error={errorFrom.fechaEntrega}
        handleOnChange={(e) => onChangePedido(e)}
        valor={pedido.fechaEntrega}
        clase={'alin-derecha'}
      />

      <div className="form-doble">
        <Inputs
          name={'importeTotal'}
          texto={'Total'}
          tipo={'text'}
          error={errorFrom.importeTotal}
          handleOnChange={(e) => onChangePedido(e)}
          valor={pedido.importeTotal}
          clase={'alin-derecha'}
        />
        <Inputs
          name={'sena'}
          texto={'Seña'}
          tipo={'text'}
          error={errorFrom.sena}
          handleOnChange={(e) => onChangePedido(e)}
          valor={pedido.sena}
          clase={'alin-derecha'}
        />


      </div>
      <div className='saldo'>
        <p>Saldo:</p>
        <p>${pedido.importeTotal - pedido.sena}</p>

      </div>
    </>
  )
}
export default CargarPedidoSaldo;