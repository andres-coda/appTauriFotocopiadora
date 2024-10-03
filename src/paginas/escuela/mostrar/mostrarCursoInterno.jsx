import './mostrarEscuela.css'
function MostrarCursoInterno({curso}){
    return(
        <div className='escuela-cursos-sup'>
              <p>{`Año: ${curso.anio}`}</p>
              <p>{`Grado: ${curso.grado}`}</p>
            </div>
    )
}

export default MostrarCursoInterno;