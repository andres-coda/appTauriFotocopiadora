import { useGlobalContext } from "../../../contexto/contexto";
import FiltroEstilo from "../../../componentesStilos/filtro/filtroEstilo";
import Circulo from '../../../assets/circulo.svg'
import useFiltroOrdenar from "../../../hooks/filtros/useFiltroOrdenar";
import Cargando from "../../../componentes/cargando/cargando";


function FiltroOrdenarPedido() {
  const {datos} = useGlobalContext()
  const {
    ordenarPorFechaTomadoAsc, ordenarPorFechaTomadoDesc, ordenarPorFechaEntregaAsc, 
    ordenarPorFechaEntregaDesc, ordenarPorNombreLibroAsc, ordenarPorNombreLibroDesc,
    handleSelectEntrega, handleSelectTomado, handleSelectLibro, 
    filtroActivo,
  } = useFiltroOrdenar();

  if (!datos.listaPedidoLibros || datos.listaPedidoLibros.pedidoLibros ===0) {
    return (
      <Cargando text={'No hay pedidos para ordenar'}/>
    )
  }

  return (
      <FiltroEstilo 
        btn = {false}
        titulo={'Ordenar'}
        childrenDerecha={
          <>
            <li onClick={handleSelectEntrega} className={filtroActivo === 'entrega' ? 'filtro-activo' : ''}>Entrega</li>
            <li onClick={handleSelectTomado} className={filtroActivo === 'tomado' ? 'filtro-activo' : ''}>Tomado</li>
            <li onClick={handleSelectLibro} className={filtroActivo === 'libro' ? 'filtro-activo' : ''}>Libro</li>
          </>
        }
        childrenIzquierda={
          <>
            <ul>
              {filtroActivo!='libro' 
              ? (
                <>
                  <li onClick={filtroActivo==='entrega'? ordenarPorFechaEntregaAsc  : ordenarPorFechaTomadoDesc}><img src={Circulo} alt="Estado" />{filtroActivo==='entrega'? 'Más cercana': 'Más reciente'}</li>
                  <li onClick={filtroActivo==='entrega'? ordenarPorFechaEntregaDesc : ordenarPorFechaTomadoAsc}><img src={Circulo} alt="Estado" />{filtroActivo==='entrega'? 'Más lejana': 'Más antiguo'}</li>
                </>
              ) : (
                <>
                  <li onClick={ordenarPorNombreLibroAsc}><img src={Circulo} alt="Estado" />{'Libro  A-->Z'}</li>
                  <li onClick={ordenarPorNombreLibroDesc}><img src={Circulo} alt="Estado" />{'Libro  Z-->A'}</li>
                </>
              )}
            </ul>
          </>
        }
      />
  )
}
export default FiltroOrdenarPedido;