
import { useEffect } from "react";
import { useGlobalContext } from "../../../contexto/contexto";
import { validarEspecifPedidos } from "../../../funciones/validaciónForm/validarEspecifPedidos";
import useFormGeneral from "../../form/useFormGeneral";
import { pedidoLibroInicial } from "./pedidoFormDefault";



function useCargarPedidoLibroJunior(pedidoLibroInicialLocal, errorInicial, pedidoLibroEditar) {  
  const {datos, pedidos, currentPedidoIndex, setPedidos} = useGlobalContext();
  
  const {
    info: pedidoLibro, setInfo:setPedidoLibro, onchange: onChangePedidoLibro, 
  } = useFormGeneral(pedidoLibroInicialLocal, errorInicial, pedidoLibroEditar);

  useEffect(()=>{
    setPedidoLibro(pedidos[currentPedidoIndex].pedidoLibro)
  },[currentPedidoIndex]);

  const handleSelecEspecificaciones = (esp) => {
    const nuevaEspecificacion = validarEspecifPedidos(
      esp,
      pedidos[currentPedidoIndex].especificaciones,
      datos.especificaciones
    );

    setPedidos((prev)=>{
      const newPedidos = [...prev];
      newPedidos[currentPedidoIndex] = {...newPedidos[currentPedidoIndex], especificaciones: nuevaEspecificacion}
      return newPedidos; 
    })

  }

  const recetearPedidoLibro = () => {
    setPedidoLibro({...pedidoLibroInicial})
  }

  const isEspCheck = (esp) => {
  
    // Verificar si especificaciones es un array antes de usar .some()
    if (Array.isArray(pedidos[currentPedidoIndex].especificaciones)) {
      const isEspPresent = pedidos[currentPedidoIndex].especificaciones.some(item => item.idEspecificaciones === esp.idEspecificaciones);
      return isEspPresent;
    }    
    // Si no es un array, devolver false por defecto
    return false;
  }

  return {
    pedidoLibro, onChangePedidoLibro, recetearPedidoLibro, isEspCheck, setPedidoLibro,
    handleSelecEspecificaciones
  }

}

export default useCargarPedidoLibroJunior;