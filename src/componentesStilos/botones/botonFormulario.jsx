import './botonFormulario.css'
function BotonFormulario({textBtn, onClick, tipo, titulo, clase}) {
  return (
    <button
      type={tipo || 'button'}
      onClick={onClick}
      className={`btn-formulario ${clase||''}`}
      title={titulo || ''}
      aria-label={titulo || ''}
    >
      {textBtn}
    </button>
  )
}
export default BotonFormulario;