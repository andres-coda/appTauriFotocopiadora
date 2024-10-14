import '../pedidoCargar.css'
import Inputs from '../../../../componentes/input/input';
import usePedidoManager from '../../../../hooks/pedido/cargar/usePedidoManager';

function PedidoFormSuperior({onChangePedido, pedido, errorFrom}) {
  
  return (
    <div className="form-doble">
      <Inputs
        name={'archivos'}
        texto={'Archivos'}
        tipo={'text'}
        error={errorFrom.archivos}
        handleOnChange={(e) => onChangePedido(e)}
        valor={pedido.archivos}
        clase={'alin-derecha'}
      />
      <Inputs
        name={'anillados'}
        texto={'Anillados'}
        tipo={'text'}
        error={errorFrom.anillados}
        handleOnChange={(e) => onChangePedido(e)}
        valor={pedido.anillados}
        clase={'alin-derecha'}
      />
    </div>
  )
}
export default PedidoFormSuperior;