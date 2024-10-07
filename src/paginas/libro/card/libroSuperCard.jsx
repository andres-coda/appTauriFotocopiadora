import React, { useContext, useEffect, useRef, useState } from 'react';
import './libroSuperCard.css';
import { contexto } from '../../../contexto/contexto';
import { agregarLibroProfeMateria, quitarLibroProfeMateria } from '../../../servicios/curso.service';
import AlertaCoincidencias from '../../../componentes/alertas/alertaCoincidencias/alertaCoincidencias';
import BotonAdd from '../../../componentesStilos/botones/botonAdd';
import AlertaFormulario from '../../../componentes/alertas/alertaFormulario/alertaFormulario';
import AlertaEliminar from '../../../componentes/alertas/alertaEliminar/alertaEliminar';
import MostrarCursoInterno from '../../escuela/mostrar/mostrarCursoInterno';
import MostrarProfMat from '../../escuela/mostrar/mostrarProfMat';
import CargarCurso from '../../escuela/cargar/cargarCurso';
import MostrarCurso from '../../escuela/mostrar/mostrarCurso';

function LibroSuperCard({ libro }) {
  const { datos, setDatos} = useContext(contexto);
  const [clase, setClase] = useState('super-desactivo');
  const [error, setError] = useState('');
  const [isAlerta, setIsAlerta] = useState(false);
  const [eliminarAlerta, setEliminarAlerta] = useState(false);
  const [cursoEliminar, setCursoEliminar] = useState(null);
  const [selectEscuela, setSelectEscuela] = useState('');
  const [escuelaCursoCargar, setEscuelaCursoCargar] = useState({});
  const [mostrarBoton, setMostrarBoton] = useState(false);
  const [btnMas, setBtnMas] = useState('Ver más');
  const [curso, setCurso] = useState({ cursos: [] });
  const descrRef = useRef(null);
  const [agregarCurso, setAgregarCurso] = useState(false);

  useEffect(() => {
    const elemento = descrRef.current;
    if (elemento && elemento.scrollHeight > elemento.clientHeight) {
      setMostrarBoton(true);
    } else {
      setMostrarBoton(false);
    }
  }, []);

  const handleEliminarCurso = (curso) => {
    setCursoEliminar(curso);
    setEliminarAlerta(true);
  };

  const handleQuitarCurso = async () => {
    await quitarLibroProfeMateria(cursoEliminar, libro, setError);
    if (!error) {
      setEliminarAlerta(false);
    }
  }

  const handleChangeEscuela = (event) => {
    setSelectEscuela(event.target.value);
  };

  const handleCrearCurso = () => {
    const escuela = datos.escuelas.find(esc => esc.nombre.toUpperCase() === selectEscuela.toUpperCase());
    setEscuelaCursoCargar(escuela);
    setAgregarCurso(true)
  }

  const handleAgregarCursoSelec = async () => {
    await actualizarCursos(setCurso)
    setIsAlerta(true);

  }


  const handleAgregarCurso = async (prMat) => {
    console.log(prMat);
    setCargando(true);
    await agregarLibroProfeMateria(prMat, libro, setError);
    
    if (!error) {
      setCargando(false);
      setSelectEscuela('');
      setIsAlerta(false);
      setEliminarAlerta(false);
    }
  }

  const handleMore = () => {
    if (clase == 'super-desactivo') {
      setClase('super-activo');
      setBtnMas('Ver menos');
    } else {
      setClase('super-desactivo');
      setBtnMas('Ver más');
    }
  }

  if (!libro) return null;

  return (
    <>
      <div className={`superCard-libro ${clase}`} ref={descrRef} >
        {libro.img ? (
          <img src={libro.img} alt={libro.nombre} />
        ) : (null)}
        <div className='superCard-descr-interna'>
          <h5>{libro.nombre}</h5>
          <p><span> Autor: </span>{libro.autor ? libro.autor : ''}</p>
          <p><span> Edición: </span>{libro.edicion ? libro.edicion : ''}</p>
          <p><span> Descripción: </span>{libro.descripcion ? libro.descripcion : ''}</p>
          <p><span> Cantidad de páginas:  </span>{libro.cantidadPg ? libro.cantidadPg : ''}</p>
          <p><span> Materia: </span>{libro.materia ? libro.materia.nombre : ''}</p>
          <AlertaCoincidencias
            isAlerta={isAlerta}
            children={
              <>
                <div className='filtro-buscar-libro'>
                  <ul>
                    <li>
                      <select id="select-esc" value={selectEscuela} onChange={(e) => handleChangeEscuela(e)}>
                        <option key={`materia-`} value={''}>Seleccionar una escuela</option>
                        {datos.escuelas?.map((esc, index) => (
                          <option key={`esc-${index}`} value={esc.nombre}>{esc.nombre}</option>
                        ))}
                      </select>
                    </li>
                  </ul>
                </div>
                {curso && curso.cursos.length > 0 ? (
                  <>{console.log(selectEscuela)}
                    {selectEscuela ? (
                      <div className='escuela-cursos'>
                        <BotonAdd 
                          onClick={()=>setAgregarCurso(true)}
                          titulo={'Nuevo curso'}
                        />
                      </div>) : (null)}
                    {
                      curso.cursos?.map((curs, index) => (
                        selectEscuela.toUpperCase() === curs.escuela.nombre.toUpperCase() ?
                          (
                            <MostrarCurso curso={curs} key={`curso-${index}`} handleCurso={handleAgregarCurso} />
                          ) : (null)
                      ))}
                  </>
                ) : (null)}
              </>
            }
          />
          <p><span> Cursos: </span></p>
          <button onClick={() => handleAgregarCursoSelec()} className='verMas'>Agregar curso</button>
          <div className='Escuela-cursos'> 

          {libro.profeMaterias
            ?.sort((a, b) => a.curso.escuela.nombre.localeCompare(b.curso.escuela.nombre))
            .map((prMat, index, array) => {
              const esPrimeroODiferente = index === 0 || prMat.curso.escuela.nombre !== array[index - 1].curso.escuela.nombre;
              const esPrimeroODiferenteGrado = index === 0 || prMat.curso.anio !== array[index - 1].curso.anio || prMat.curso.grado !== array[index - 1].curso.grado;
              
              return (
                <div className='escuela-cursos-super' key={`escuela-${index}`}>
                {esPrimeroODiferente && <h6>{` --  ${prMat.curso.escuela.nombre} --`}</h6>}
                {esPrimeroODiferenteGrado && <MostrarCursoInterno curso={prMat.curso} />}
                <MostrarProfMat prMat={prMat} handleCurso={() => console.log('')} eliminar={true} handleEliminarProfeMateria={handleEliminarCurso}/>
              </div>
            );
          })}
          </div>
        </div>
      </div>
      {mostrarBoton && <button onClick={handleMore} className='verMas'>{btnMas}</button>}
      
      <AlertaFormulario
        isAlerta={eliminarAlerta}
        setIsAlerta={setEliminarAlerta}
        children={
          <AlertaEliminar
            children={<h6>{`¿Quiere quitar el libro "${libro.nombre? libro.nombre: ''}" de la materia "${cursoEliminar? cursoEliminar.materia?.nombre: ''}" del profesor "${cursoEliminar?cursoEliminar.profesor?.nombre: ''}"?`}</h6>}
            setEliminar={setEliminarAlerta}
            handleEliminar={handleQuitarCurso}
          />
        }
      />
      <AlertaFormulario
          isAlerta={agregarCurso}
          setIsAlerta={setAgregarCurso}
          children={
            <CargarCurso escuela={escuelaCursoCargar} setAgregarCurso={setAgregarCurso}/>
          }
        />
    </>
  )
}
export default LibroSuperCard;