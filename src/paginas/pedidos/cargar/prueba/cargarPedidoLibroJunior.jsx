import '../pedidoCargar.css'
import Inputs from "../../../../componentes/input/input";
import { useGlobalContext } from "../../../../contexto/contexto";
import usePedidoManager from '../../../../hooks/pedido/cargar/usePedidoManager';

function CargarPedidoLibroJunior() {
  const {datos, pedidos, currentPedidoIndex} = useGlobalContext();

  const {
    pedidoLibro, handleSelecEspecificaciones, onChangePedidoLibro,errorFrom, isEspCheck,
  } = usePedidoManager()  

return(
    <>
    <Inputs 
      name={'cantidad'}
      texto={'Cantidad de libros'}
      tipo={'text'}
      handleOnChange={(e)=>onChangePedidoLibro(e)}
      valor={pedidos[currentPedidoIndex].pedidoLibro.cantidad}
      clase={'alin-derecha'}
      error={errorFrom.cantidad}
    />     
    <ul className='especificaciones'>
    {datos.especificaciones?.map((esp, index) => (
        <li key={`esp-${index}`} className='especificacion-item'>
          <label className='especificacion-label' htmlFor={esp.nombre}>
            <input 
              id={esp.nombre}
              type="checkbox" 
              checked={isEspCheck(esp)}
              onChange={(e) => handleSelecEspecificaciones(esp)} 
              className='especificacion-checkbox'
            /> 
            {esp.nombre}
          </label>
        </li>
      ))}
    </ul>
    <Inputs 
      name={'extras'}
      texto={'Detalles extras del pedido'}
      tipo={'text'}
      handleOnChange={(e)=>onChangePedidoLibro(e)}
      valor={pedidos[currentPedidoIndex].pedidoLibro.extras}
    /> 
  </>
)
}

export default CargarPedidoLibroJunior;