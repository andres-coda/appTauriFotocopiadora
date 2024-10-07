import { useContext } from "react";
import { contexto } from "../../../contexto/contexto";
import useCoinsidencias from "../../coincidencias/useCoincidencias";
import useFormGeneral from "../../form/useFormGeneral";
import { errorPedidoInicial, pedidoLibroInicialLibro } from "./pedidoFormDefault";

function usePedidoAgregarLibro() {
  const { pedidos, currentPedidoIndex, datos } = useContext(contexto);

  const {info:libro, setInfo:setLibro, onchange:onChangeLibro} = useFormGeneral(null, null, pedidos[currentPedidoIndex].libro || {...pedidoLibroInicialLibro}, null, pedidos[currentPedidoIndex].error || {...errorPedidoInicial}, null);
  
  const { coincidencias: coincidenciasLibro, alertaCoincidencia: alertaCoincidenciaLibro, setSeleccion } = useCoinsidencias(datos.libros, { name: 'nombre', value: pedidos[currentPedidoIndex]?.libro.nombre || '' });

  const handleSelecLibro = (libroSelec) => {
    setLibro({
      nombre:libroSelec.nombre,
      idLibro:libroSelec.idLibro,
      cantidadPg: libroSelec.cantidadPg,
    });
    setSeleccion();
  }

  return {
    onChangeLibro, setLibro, libro,
    coincidenciasLibro, alertaCoincidenciaLibro, handleSelecLibro,
  }
}
export default usePedidoAgregarLibro;