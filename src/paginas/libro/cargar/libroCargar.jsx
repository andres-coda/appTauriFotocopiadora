import { useContext, useState } from "react";
import { contexto } from "../../../contexto/contexto";
import { actualizarNuevoLibro, cargarNuevoLibro } from "../../../servicios/libro.service";
import Cargando from "../../../componentes/cargando/cargando";
import Formulario from "../../../componentes/formulario/formulario";
import Inputs from "../../../componentes/input/input";
import AlertaCoincidencias from "../../../componentes/alertas/alertaCoincidencias/alertaCoincidencias";
import ImgCargar from "./cargarImagen/ImgCargar";

const errorInicial = {
  nombre: '',
  error: 'Nombre y cantidad de pg deben completarse',
  autor:'',
  descripcion:'',
  edicion: '',
  cantidadPg:'',
  materia: ''
}

function LibroCargar({setAlerta}) {
  const { datos, setDatos } = useContext(contexto);
  const [img, setImg] = useState(datos.libroAeditar && datos.libroAeditar.img ? datos.libroAeditar.img : "");
  const [busqueda, setBusqueda] = useState({ nombre: datos.libroAeditar && datos.libroAeditar.materia ? datos.libroAeditar.materia.nombre : "" });
  const [busquedaNombre, setBusquedaNombre] = useState(datos.libroAeditar && datos.libroAeditar.nombre ? datos.libroAeditar.nombre : "");
  const [isAlerta, setIsAlerta] = useState(false);
  const [isAlertaNombre, setIsAlertaNombre] = useState(false);
  const [ claseError, setClaseError ] = useState('sugerencia-error');
  const [error, setError] = useState(errorInicial);
  const [coincidencias, setCoincidencias] = useState([]);
  const [coincidenciasNombre, setCoincidenciasNombre] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [libro, setLibro] = useState({
    nombre: datos.libroAeditar && datos.libroAeditar.nombre ? datos.libroAeditar.nombre : "",
    descripcion: datos.libroAeditar && datos.libroAeditar.descripcion ? datos.libroAeditar.descripcion : "",
    edicion: datos.libroAeditar && datos.libroAeditar.edicion ? datos.libroAeditar.edicion : "",
    img: img|| "",
    cantidadPg: datos.libroAeditar && datos.libroAeditar.cantidadPg ? datos.libroAeditar.cantidadPg : "",
    autor: datos.libroAeditar && datos.libroAeditar.autor ? datos.libroAeditar.autor : "",
    materia: datos.libroAeditar && datos.libroAeditar.materia.nombre ? datos.libroAeditar.materia.nombre : "",
  });

  const HandleOnChange = (e) => {
    setLibro({
      ...libro,
      [e.target.name]: e.target.value || ""
    })
  }

  const HandleOnChangeMateria = (e) => {
    const valor = e.target.value;
    setBusqueda({ nombre: valor });
    if (valor.length > 0) {
      const coincidenciasFiltradas = datos.materias?.filter(materia =>
        materia.nombre.toLowerCase().includes(valor.toLowerCase())
      );
      setCoincidencias(coincidenciasFiltradas);
      if (coincidencias.length > 0) {
        setIsAlerta(true)
      } else {
        setIsAlerta(false)
      }
    } else {
      setCoincidencias([]);
    }
  }

  const HandleOnChangeNombre = (e) => {
    const valor = e.target.value;
    setBusquedaNombre(valor);
    if (valor.length > 0) {
      const coincidenciasFiltradas = datos.libros?.filter(libro =>
        libro.nombre.toLowerCase().includes(valor.toLowerCase())
      );
      setCoincidenciasNombre(coincidenciasFiltradas);
      if (coincidenciasNombre.length > 0) {
        setIsAlertaNombre(true)
      } else {
        setIsAlertaNombre(false)
      }
    } else {
      setCoincidenciasNombre([]);
    }
  }

  const validarError = (libro) => {
    // Define un objeto para almacenar los errores
    const newError = errorInicial;
    newError.error= '';

    // Verifica si el libro tiene nombre
    if (!libro.nombre) {
        newError.nombre = 'El libro debe tener un nombre';
        newError.error = 'Tiene errores en la solicitud';
    } 
    // Verifica si el libro tiene cantidad de páginas
    else if (!libro.cantidadPg) {
        newError.cantidadPg = 'El libro debe tener la cantidad de páginas';
        newError.error = 'Tiene errores en la solicitud';
    }
    return newError
};


  const handleSelectMateria = (materia) => {
    setBusqueda(materia);
    setCoincidencias([]);
    setIsAlerta(false);
  }

  const handleSelectNombre = (libroSeleccionado) => {
    setBusquedaNombre(libroSeleccionado.nombre);
    setLibro({
      descripcion: libroSeleccionado.descripcion,
      edicion: libroSeleccionado.edicion,
      img: libroSeleccionado.img || '',
      cantidadPg: libroSeleccionado.cantidadPg,
      autor: libroSeleccionado.autor,
      materia: libroSeleccionado.materia.nombre,
    });
    if (busqueda.nombre == "") {
      setBusqueda(libroSeleccionado.materia);
    }
    setCoincidenciasNombre([]);
    setIsAlertaNombre(false);
  };

  const handleForm = async (e) => {
    setCargando(true);
    const libroGuardar = { ...libro, materia: busqueda, nombre: busquedaNombre, img: img };
    const validarErrorL = validarError(libroGuardar);
    if (validarErrorL.error) {
      setError(validarErrorL);
      setClaseError('')
      return
    }

    if (!datos.libroAeditar ) {
      await cargarNuevoLibro(libroGuardar, setError);
    } else {
      await actualizarNuevoLibro(datos.libroAeditar.idLibro, libroGuardar, setError);
      if (!error) {
        setDatos((prev)=>({...prev, libroAEditar: null}));
      }
    }

    if(!error) {
      setAlerta(false);
      setCargando(false);
    }
  }

  if (cargando) return (
    <Cargando text={'Se esta procesando el libro'} error={error} />
  )


  return (<>
    <Formulario
      handleForm={handleForm}
      subtitulo={datos.libroAeditar ? 'Editar libro' : 'Agregar libro'}
      textBtn={'Confirmar'}
      error={error.error}
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
            error={error.nombre}
            handleOnChange={(e) => HandleOnChangeNombre(e)}
            valor={busquedaNombre|| ""}
          />
          <AlertaCoincidencias
            isAlerta={isAlertaNombre}
            children={
              <>
                {coincidenciasNombre.map((libro, index) => (
                  <li key={`nombre-${index}`} onClick={() => handleSelectNombre(libro)}>
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
            error={error.autor}
            handleOnChange={(e) => HandleOnChange(e)}
            valor={libro.autor}
          />
          <Inputs
            name={'edicion'}
            texto={'Edición'}
            tipo={'text'}
            error={error.edicion}
            handleOnChange={(e) => HandleOnChange(e)}
            valor={libro.edicion}
          />
          <Inputs
            name={'descripcion'}
            texto={'Descripción'}
            tipo={'text'}
            error={error.descripcion}
            handleOnChange={(e) => HandleOnChange(e)}
            valor={libro.descripcion}
          />
          <Inputs
            name={'cantidadPg'}
            texto={'Cantidad de páginas'}
            tipo={'number'}
            error={error.cantidadPg}
            handleOnChange={(e) => HandleOnChange(e)}
            valor={libro.cantidadPg}
          />
          <Inputs
            name={'materia'}
            texto={'Materia'}
            tipo={'text'}
            error={error.materia}
            handleOnChange={(e) => HandleOnChangeMateria(e)}
            valor={busqueda.nombre|| ""}
          />
          <AlertaCoincidencias
            isAlerta={isAlerta}
            children={
              <>
                {coincidencias.map((materia, index) => (
                  <li key={`mate-${index}`} onClick={() => handleSelectMateria(materia)}>{materia.nombre}</li>
                ))}
              </>
            }
          />
        </>
      }
    />
  </>
  )
}

export default LibroCargar;