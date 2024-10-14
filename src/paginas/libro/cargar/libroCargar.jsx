import { useContext, useState } from "react";
import { contexto } from "../../../contexto/contexto";
import Cargando from "../../../componentes/cargando/cargando";
import Formulario from "../../../componentes/formulario/formulario";
import Inputs from "../../../componentes/input/input";
import AlertaCoincidencias from "../../../componentes/alertas/alertaCoincidencias/alertaCoincidencias";
import ImgCargar from "./cargarImagen/ImgCargar";
import useLibroForm from "../../../hooks/libro/cargar/useLibroForm";

function LibroCargar() {
  const { datos } = useContext(contexto);
  const [img, setImg] = useState(datos.libroAEditar?.img || '');
  const { 
    cargarLibro, onchange, onChangeMateria,
    errorPost, loading, response, 
    info:libro, errorFrom, claseError,
    coincidencias, alertaCoincidencia, handleSelecNombre,handleSelecMateria,
  } = useLibroForm(img);

  if (loading || errorPost || response) return (
    <>
        {
          loading 
            ? (<h6>{datos.libroAEditar ? `Editando libro ...` : `Creando libro ...`}</h6>) 
            : errorPost 
              ? (<h6>{datos.libroAEditar ? `Error al editar el libro: ${errorPost}` : `Error al crear libro: ${errorPost}`}</h6>) 
              : <h6>{datos.libroAEditar ? `Libro editado con exito` : `Libro creado con exito`}</h6>
        }
              </>
     
  )

  return (
    <Formulario
      handleForm={()=>cargarLibro()}
      subtitulo={datos.libroAEditar ? 'Editar libro' : 'Agregar libro'}
      textBtn={'Confirmar'}
      error={errorFrom.error}
      classError={claseError}
      children={
        <>
          <ImgCargar
            urlImg={img}
            setUrlImg={setImg}
          />
          <Inputs
            name={'nombre'}
            texto={'Nombre'}
            tipo={'text'}
            error={errorFrom.nombre}
            handleOnChange={(e) => onchange(e)}
            valor={libro.nombre || ""}
          />
          <AlertaCoincidencias
            isAlerta={alertaCoincidencia.nombre}
            children={
              <>
                {coincidencias.nombre.map((libro, index) => (
                  <li key={`nombre-${index}`} onClick={() => handleSelecNombre(libro)}>
                    <h6>{libro.nombre}</h6>
                    <div>
                      {libro.materia ? <p>Materia: {libro.materia.nombre}</p> : null}
                      <p>Edición: {libro.edicion}</p>
                      <p>Autor: {libro.autor}</p>
                      <p>Pg: {libro.cantidadPg}</p>
                    </div>
                  </li>
                ))}
              </>
            }
          />
          <Inputs
            name={'autor'}
            texto={'Autor'}
            tipo={'text'}
            error={errorFrom.autor}
            handleOnChange={(e) => onchange(e)}
            valor={libro.autor}
          />
          <Inputs
            name={'edicion'}
            texto={'Edición'}
            tipo={'text'}
            error={errorFrom.edicion}
            handleOnChange={(e) => onchange(e)}
            valor={libro.edicion}
          />
          <Inputs
            name={'descripcion'}
            texto={'Descripción'}
            tipo={'text'}
            error={errorFrom.descripcion}
            handleOnChange={(e) => onchange(e)}
            valor={libro.descripcion}
          />
          <Inputs
            name={'cantidadPg'}
            texto={'Cantidad de páginas'}
            tipo={'number'}
            error={errorFrom.cantidadPg}
            handleOnChange={(e) => onchange(e)}
            valor={libro.cantidadPg}
          />
          <Inputs
            name={'materia.nombre'}
            texto={'Materia'}
            tipo={'text'}
            error={errorFrom.materia}
            handleOnChange={(e) => onChangeMateria(e)}
            valor={libro.materia?.nombre || ""}
          />
          <AlertaCoincidencias
            isAlerta={alertaCoincidencia.materia}
            children={
              <>
                {coincidencias.materia.map((materia, index) => (
                  <li key={`mate-${index}`} onClick={() => handleSelecMateria(materia)}>{materia.nombre}</li>
                ))}
              </>
            }
          />
        </>
      }
    />
  )
}

export default LibroCargar;