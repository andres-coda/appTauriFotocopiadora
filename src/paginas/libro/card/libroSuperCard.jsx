import React, { useState } from 'react';
import './libroSuperCard.css';
import { useGlobalContext } from '../../../contexto/contexto';
import BotonAdd from '../../../componentesStilos/botones/botonAdd';
import MostrarCursoInterno from '../../escuela/mostrar/mostrarCursoInterno';
import MostrarProfMat from '../../escuela/mostrar/mostrarProfMat';
import CargarCurso from '../../escuela/cargar/cargarCurso';
import MostrarCurso from '../../escuela/mostrar/mostrarCurso';
import Buscar from '../../../componentes/buscar/buscar';
import Modal from '../../../componentes/modal/modal';
import { useModalContext } from '../../../contexto/modalContexto';
import CargarEscuela from '../../escuela/cargar/cargarEscuela';
import usePantalla from '../../../hooks/visual/usePantalla';
import useLibroMostrar from '../../../hooks/libro/mostrar/useLibroMostrar';

function LibroSuperCard({ libro }) {
  const { mostrarElemento, descrRef } = usePantalla();
  const { setEstadoModal } = useModalContext();
  const {
    filtros,
    selecEscuela, setSelecEscuela, nuevaEscuela, setNuevaEscuela,
    agregarCurso, setAgregarCurso, nuevoCurso, setNuevoCurso, 
    handleAgregarCurso, handleQuitarCurso,
    errorFetch, loading, solicitud, setSolicitud,
  } = useLibroMostrar(libro)

  const { datos } = useGlobalContext()
  const [clase, setClase] = useState('super-desactivo');

  const [btnMas, setBtnMas] = useState('Ver más');

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
          <p><span> Cursos: </span></p>

          <button onClick={() => {setEstadoModal(true), setSelecEscuela(true)}} className='verMas'>Agregar curso</button>
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
                    <MostrarProfMat prMat={prMat} handleCurso={() => console.log(prMat)} eliminar={true} handleEliminarProfeMateria={handleQuitarCurso} />
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      {mostrarElemento && <button onClick={handleMore} className='verMas'>{btnMas}</button>}

      <Modal 
      children={
        <>
        {
          loading 
            ? (<h6>Procesando solicitud ...</h6>) 
            : errorFetch 
              ? (<h6>{`Error al procesar la solicitud: ${errorFetch}`}</h6>) 
              : <h6>{`Solicitud procesada con éxito`}</h6>
        }
              </>
      }
      modal={solicitud} setModal={setSolicitud}
    />     

      <Modal
        children={
          <Buscar
            handleNuevoElemento={() => { setSelecEscuela(false), setNuevaEscuela(true) }}
            lista={datos.escuelas}
            titulo={'Seleccionar escuela'}
            name={'nombre'}
            childrenAlerta={(elemento) =>
              <>
                <h6>{elemento.nombre}</h6>
              </>
            }
          />
        }
        modal={selecEscuela} setModal={setSelecEscuela}
      />
      <Modal
        children={<CargarEscuela />}
        modal={nuevaEscuela} setModal={setNuevaEscuela}
      />
      
      <Modal
        children={
          <>
          <BotonAdd
            onClick={() => setNuevoCurso(true)}
            titulo={'Nuevo curso'}
          />
          { !filtros.busqueda ? null : 
          (
            <>
            {
            datos.cursos
            .filter(item => 
              item.escuela && 
              item.escuela.nombre && 
              item.escuela.nombre.toUpperCase() === filtros.busqueda.nombre.toUpperCase())
              .map((curs, index) =>(
                <MostrarCurso curso={curs} key={`curso-${index}`} handleCurso={handleAgregarCurso} />
              ))
            }
            </>
            )}
          
          </>
        }
        modal={agregarCurso} setModal={setAgregarCurso}
      />

      <Modal
        children={<CargarCurso escuela={filtros.busqueda} setAgregarCurso={setNuevoCurso} />}
        modal={nuevoCurso} setModal={setNuevoCurso}
      />

    </>
  )
}
export default LibroSuperCard;