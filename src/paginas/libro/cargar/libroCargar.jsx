import { useContext, useEffect, useState } from "react";
import { contexto } from "../../../contexto/contexto";
import Cargando from "../../../componentes/cargando/cargando";
import Formulario from "../../../componentes/formulario/formulario";
import Inputs from "../../../componentes/input/input";
import AlertaCoincidencias from "../../../componentes/alertas/alertaCoincidencias/alertaCoincidencias";
import ImgCargar from "./cargarImagen/ImgCargar";
import useLibroForm from "../../../hooks/libro/cargar/useLibroForm";

function LibroCargar({setAlerta}) {
  const { datos } = useContext(contexto);
  const [img, setImg] = useState(datos.libroAEditar?.img || '');
  const [ condicion, setCondicion] = useState(false);
  const { 
    handleForm, onchange, onChangeMateria,
    errorPost, loading, response, 
    errorPut, loadingPut, responsePut, 
    info:libro, errorFrom, claseError,
    coincidencias, alertaCoincidencia, handleSelecNombre,handleSelecMateria, 
    alerta
  } = useLibroForm(img);

  useEffect(()=>{
    if (loading || loadingPut) {
      setCondicion(true);
    }

    if (!loading && !loadingPut && condicion) {
      setAlerta(alerta);
    }
  }, [alerta])


  if (loading || loadingPut) return (
    <Cargando text={loading ? 'Se esta creando el libro ...' : 'Se esta actualizando el libro ...'} />
  );

  if (errorPost || errorPut) return (
    <Cargando text={errorPost ? errorPost : errorPut} />
  )

  if (response || responsePut) return (
    <Cargando text={response ? 'El libro se creó con exito' : 'El libro se actualizó con exito'} />
  )


  return (
    <Formulario
      handleForm={()=>handleForm()}
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