import './listaFiltros.css'
import Filtro from '../../assets/filter.svg'
import Orden from '../../assets/orden.svg'

function ListaFiltros({ lista, tipo }) {
  if (lista.length <= 0) return null;
    
  return (
    <div className='lista-filtros'>
      <ul>
        {!lista.tipo ==='orden' ? <img src={Filtro} alt='Filtro' /> : <img src={Orden} alt='Orden' />}
        {lista
        .filter((filtro)=>filtro.tipo === tipo)
        .map((filtro, index) => (
          <li key={`filtro-${index}`}>- {filtro.filtro.nombre || filtro.filtro.estado || filtro.filtro}</li>
        ))}
      </ul>
    </div>
  )
}
export default ListaFiltros;