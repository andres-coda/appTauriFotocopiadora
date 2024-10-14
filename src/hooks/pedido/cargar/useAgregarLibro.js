import { useEffect } from "react";
import { useGlobalContext } from "../../../contexto/contexto";
import useCoinsidencias from "../../coincidencias/useCoincidencias";
import useFormGeneral from "../../form/useFormGeneral";
import { errorPedidoInicial, pedidoLibroInicialLibro } from "./pedidoFormDefault";

const libroInicial = {...pedidoLibroInicialLibro}
const errorInicial = {...errorPedidoInicial}

function useAgregarLibro(infoAEditar=null) {
  const { datos, currentPedidoIndex, pedidos } = useGlobalContext();

  const {
    info:libro, setInfo:setLibro, onchange:onChangeLibro,
} = useFormGeneral(libroInicial,errorInicial, infoAEditar);
  
  const { 
    coincidencias: coincidenciasLibro, alertaCoincidencia: alertaCoincidenciaLibro, setSeleccion 
  } = useCoinsidencias(datos.libros, { name: 'nombre', value: libro && libro.nombre ? libro.nombre : '' });

  useEffect(()=>{    
    setLibro(pedidos[currentPedidoIndex].libro);
  },[currentPedidoIndex])

  const handleSelecLibro = (e,libroSelec) => {
    e.preventDefault()
    setLibro({
      nombre:libroSelec.nombre,
      idLibro:libroSelec.idLibro,
      cantidadPg: libroSelec.cantidadPg,
    });
    setSeleccion();
  }

  const recetearLibro = () => {   
    const libroInicialLocal = libroInicial;
    setLibro(libroInicialLocal);
  }  

  return {
    onChangeLibro, recetearLibro, libro, setLibro,
    coincidenciasLibro, alertaCoincidenciaLibro, handleSelecLibro,
  }
}
export default useAgregarLibro;