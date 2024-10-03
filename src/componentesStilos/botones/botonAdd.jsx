import './botonFormulario.css'
import Add from '../../assets/add.svg'

function BotonAdd({ onClick, titulo }) {
  return (
    <button
      onClick={onClick}
      title={titulo || 'Nuevo'}
      type='button'
      className={`btn-add`}
      aria-label={titulo || 'Nuevo'}
    >
      <img src={Add} alt='Nuevo' />
    </button>
  )
}

export default BotonAdd;