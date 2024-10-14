import BotonFormulario from "../../../../componentesStilos/botones/botonFormulario";
import PedidoLibroCardInterno from "../../libroPedido/pedidoLibroCardInterno";
import '../pedidoCargar.css'
import { useGlobalContext } from "../../../../contexto/contexto";
import usePedidoManager from "../../../../hooks/pedido/cargar/usePedidoManager";

function PedidoGestionLibro() {
  const {pedidos, currentPedidoIndex} = useGlobalContext()

  const { agregarLibroLista, quitarLibroLista } = usePedidoManager();

  return (
    <>
      {pedidos[currentPedidoIndex].pedidoLibro || pedidos[currentPedidoIndex].libro ? (
        <PedidoLibroCardInterno
          estadoClas={'cargando'}
          pedidoLibro={pedidos[currentPedidoIndex].pedidoLibro}
          libroCargando={pedidos[currentPedidoIndex].libro}
          especificaciones={pedidos[currentPedidoIndex].especificaciones}
        />
      ) : (<p>No hay libro que mostrar</p>)}
      <BotonFormulario
        textBtn={'Agregar libro'}
        onClick={()=>agregarLibroLista()}
        titulo={'Agregar libro'}
      />
      {pedidos[currentPedidoIndex].librosPedido.length > 0 ? (
        pedidos[currentPedidoIndex].librosPedido.slice().reverse().map((pedidoLibro, index) => (
          pedidoLibro ? (
            <PedidoLibroCardInterno
              estadoClas={'proceso'}
              pedidoLibro={pedidoLibro}
              key={`libro-${index}`}
              quitarLibro={() => quitarLibroLista(pedidoLibro)}
            />
          ) : null
        ))
      ) : (null)}
    </>
  )
}

export default PedidoGestionLibro;