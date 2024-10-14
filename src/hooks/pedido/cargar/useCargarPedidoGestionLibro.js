import { useGlobalContext } from "../../../contexto/contexto";
import { pedidoLibroInicialLibro, pedidoLibroInicial, errorPedidoInicial } from './pedidoFormDefault.js'
import useAgregarLibro from "./useAgregarLibro.js";
import useCargarPedidoLibroJunior from "./useCargarPedidoLibroJunior.js";

function useCargarPedidoGestionLibro() {
  const { pedidos, setPedidos, currentPedidoIndex } = useGlobalContext();

  const {
    onChangeLibro, recetearLibro, handleSelecLibro, setLibro,
    libro, coincidenciasLibro, alertaCoincidenciaLibro
  } = useAgregarLibro();

  const {
    recetearPedidoLibro, onChangePedidoLibro, handleSelecEspecificaciones, pedidoLibro, setPedidoLibro,isEspCheck,
  } = useCargarPedidoLibroJunior(
    pedidos[currentPedidoIndex].pedidoLibro || {...pedidoLibroInicial}, 
    pedidos[currentPedidoIndex].error || {...errorPedidoInicial}, 
  ); 

  const agregarLibroLista = () => {
    const newElemento= {
      ...pedidos[currentPedidoIndex].pedidoLibro,
      libro:{...pedidos[currentPedidoIndex].libro},
      especificaciones:[...pedidos[currentPedidoIndex].especificaciones]
    }
    const newLista =  [...pedidos[currentPedidoIndex].librosPedido, newElemento]
    setPedidos((prev)=>{
      const newPedidos = [...prev];
      newPedidos[currentPedidoIndex] = {
        ...newPedidos[currentPedidoIndex], 
        librosPedido: [...newLista],
        libro:{...pedidoLibroInicialLibro},
        especificaciones:[],
        pedidoLibro:{...pedidoLibroInicial}      
      }
      return newPedidos
    });
    recetearLibro();
    recetearPedidoLibro();
  }

  const quitarLibroLista = (pedidoLibroInterno) => {
    const newLista = pedidos[currentPedidoIndex].librosPedido.filter(item => item != pedidoLibroInterno);
    const pedidoLibro= { cantidad: pedidoLibroInterno.cantidad, extras: pedidoLibroInterno.extras}
    setPedidos((prev)=>{
      const newPedidos = [...prev];
      newPedidos[currentPedidoIndex] = {
        ...newPedidos[currentPedidoIndex], 
        librosPedido: [...newLista], 
        libro:{...pedidoLibroInterno.libro}, 
        pedidoLibro:{...pedidoLibro},
        especificaciones:[...pedidoLibroInterno.especificaciones]
      };
      return newPedidos
    });

    setLibro({...pedidoLibroInterno.libro});
    setPedidoLibro({...pedidoLibro})
  }

  return {
    onChangeLibro, recetearLibro, handleSelecLibro,
    libro, coincidenciasLibro, alertaCoincidenciaLibro,
    recetearPedidoLibro, onChangePedidoLibro, handleSelecEspecificaciones, pedidoLibro, isEspCheck,
    agregarLibroLista, quitarLibroLista,
  }

}

export default useCargarPedidoGestionLibro;