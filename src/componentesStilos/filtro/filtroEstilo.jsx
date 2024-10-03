import BotonFormulario from '../botones/botonFormulario';
import './filtro.css'

function FiltroEstilo({ childrenDerecha, childrenIzquierda, childrenBtn, titulo }) {
  return (
    <>
      <div className='conteiner-filtro'>
        {titulo ? (<h4>{titulo}</h4>) : (null)}
        <div className='filtro'>
          <div className='filtro-derecha'>
            <ul>
              {childrenDerecha}
            </ul>
          </div>
          <div className={`filtro-izquierda`}>
            {childrenIzquierda}
          </div>
        </div>
        {childrenBtn}
      </div>
    </>
  )
}

export default FiltroEstilo;