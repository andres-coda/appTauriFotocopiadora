import './botonFormulario.css'
import Cerrar from '../../assets/menu.svg'

function BotonCerrar({ onClick, titulo }) {
  return (
    <button
      onClick={onClick}
      title={titulo || 'Cerrar'}
      type='button'
      className={`btn-cerrar`}
      aria-label={titulo || 'Cerrar'}
    >
      <img src={Cerrar} alt='Cerrar' />
    </button>
  )
}

export default BotonCerrar;