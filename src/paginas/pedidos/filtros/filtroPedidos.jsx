import FiltroEstilo from "../../../componentesStilos/filtro/filtroEstilo.jsx";
import { useGlobalContext } from "../../../contexto/contexto.jsx";
import BotonFormulario from "../../../componentesStilos/botones/botonFormulario.jsx";
import useFiltro from "../../../hooks/filtros/useFiltro.js";

function FiltroPedidos() {
  const {handleFiltrar,handleChangeSelectEspecificaciones, handleChangeSelectEstado, 
    setFiltroActivo,
    opcionEspecificaciones, opcionEstado, filtroActivo,
    loading, errorFetch,
   } = useFiltro()
  const {datos} = useGlobalContext();

  if (loading || errorFetch ) return(
    <>
    {errorFetch
              ? (<h6>`Error al cargar el filtro: ${errorFetch}`</h6>)
              : <h6>Cargando filtros ...</h6>}
    </>
  )

  return (
    <FiltroEstilo
      childrenBtn={
        <BotonFormulario
          textBtn={'Filtrar'}
          onClick={handleFiltrar}
        />
      }
      childrenDerecha={
        <>
          <li
            onClick={()=>setFiltroActivo('estado')}
            className={filtroActivo === 'estado' ? 'filtro-activo' : ''}
            title='Estado'
          >Estado</li>
          <li
            onClick={()=>setFiltroActivo('especificaciones')}
            className={filtroActivo === 'especificaciones' ? 'filtro-activo' : ''}
            title='Especificaciones'
          >Especif...</li>
        </>
      }
      childrenIzquierda={
        <>
          {filtroActivo === 'estado' ? (
            <ul>
              {datos.estados.map((estadoPedido, index) => (
                <li key={`estado-${index}`}>
                  <input
                    type='checkbox'
                    onChange={handleChangeSelectEstado}
                    id={estadoPedido.estado}
                    name='filtro'
                    value={estadoPedido.idEstadoPedido}
                    checked={opcionEstado.some(option => option.idEstadoPedido === estadoPedido.idEstadoPedido)}
                  />
                  <label htmlFor={estadoPedido.estado} title={estadoPedido.estado}>{estadoPedido.estado}</label>
                </li>
              ))}
            </ul>

          ) : (
            <ul>
              {datos.especificaciones.map((esp, index) => (
                <li key={`esp-${index}`}>
                  <input
                    type='checkbox'
                    onChange={handleChangeSelectEspecificaciones}
                    id={esp.nombre}
                    name='filtro'
                    value={esp.idEspecificaciones}
                    checked={opcionEspecificaciones.some(option => option.idEspecificaciones === esp.idEspecificaciones)}
                  />
                  <label htmlFor={esp.nombre} title={esp.nombre}>{esp.nombre}</label>
                </li>
              ))}
            </ul>
          )}
        </>
      }
    />
  )
}
export default FiltroPedidos;