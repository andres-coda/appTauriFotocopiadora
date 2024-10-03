import BotonFormulario from '../../componentesStilos/botones/botonFormulario';
import './formulario.css'
function Formulario({ children, handleForm, textBtn, subtitulo, error, classError }) {
    return (
      <>
        <h2 className='formulario-h2'>{subtitulo}</h2>
        <form onSubmit={(e)=>{e.preventDefault(), handleForm()}} className="formulario" autoComplete="off">
          {children}
          { textBtn ? (
            <>
              {error?(
                <span className={classError?classError:'error'}>{error}</span>
              ):(null)}
            <div className='formulario-botonera'>
              {//<button className='formulario-btn' onClick={handleAtras} title='Atras'><MdKeyboardArrowLeft /></button>
              }
              <BotonFormulario 
                tipo={'submit'}
                textBtn={textBtn}
              />
            </div>
              </>
          ) : (
            null
          )}
        </form>
      </>
    )
  }
  export default Formulario;