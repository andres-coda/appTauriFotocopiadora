import './botonFormulario.css'
import Eliminar from '../../assets/deleted.svg'

function BotonEliminar({ onClick, titulo, clase }) {
  return (
    <button
      onClick={onClick}
      title={titulo || 'Eliminar'}
      type='button'
      className={`btn-eliminar ${clase?clase:''}`}
      aria-label={titulo || 'Eliminar'}
    >
      <img src={Eliminar} alt='Eliminar' />
    </button>
  )
}

export default BotonEliminar;