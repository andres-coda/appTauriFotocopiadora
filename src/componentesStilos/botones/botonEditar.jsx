import './botonFormulario.css'
import Editar from '../../assets/edit.svg'

function BotonEditar({ onClick, titulo, clase }) {
  return (
    <button
      onClick={onClick}
      title={titulo || 'Editar'}
      type='button'
      className={`btn-editar ${clase?clase:''}`}
      aria-label={titulo || 'Editar'}
    >
      <img src={Editar} alt='Editar' />
    </button>
  )
}

export default BotonEditar;