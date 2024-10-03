import './listaFiltros.css'
import Filtro from '../../assets/filter.svg'
import Orden from '../../assets/orden.svg'

function ListaFiltros({ lista, ordenar }) {
  if (lista.length <= 0) return null
  return (
    <div className='lista-filtros'>
      <ul>
        {!ordenar ? <img src={Filtro} alt='Filtro' /> : <img src={Orden} alt='Orden' />}
        {lista.map((filtro, index) => (
          <li key={`filtro-${index}`}>- {filtro.nombre || filtro.estado || filtro}</li>
        ))}
      </ul>
    </div>
  )
}
export default ListaFiltros;