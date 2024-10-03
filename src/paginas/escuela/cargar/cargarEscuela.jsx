import { useState } from "react";
import { actualizarNuevoEscuela } from "../../../servicios/escuela.service";
import Cargando from "../../../componentes/cargando/cargando";
import Formulario from "../../../componentes/formulario/formulario";
import Inputs from "../../../componentes/input/input";

const errorInicial ={
  nombre: '',
  error: '',
  direccion:'',
  numero:'',
  email: ''
}

function CargarEscuela({ setAlerta, escAEditar }) {
  const [cargando, setCargando] = useState(false);
  const [textCargando, setTextCargando] = useState('Procesando la carga de nueva escuela')
  const [ claseError, setClaseError ] = useState('sugerencia-error');
  const [errorFetch, setErrorFetch] = useState('')
  const [error, setError] = useState({
    ...errorInicial,
    error: 'Debe completarse el nombre',
  });
  const [escuela, setEscuela] = useState({
    nombre: escAEditar ? escAEditar.nombre : "",
    direccion: escAEditar ? escAEditar.direccion : "",
    numero: escAEditar ? escAEditar.numero : "",
    email: escAEditar ? escAEditar.email : ""
  });
  
  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setEscuela((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const validarError = (libro) => {
    const newError = errorInicial;
    if (!libro.nombre) {
        newError.nombre = 'La escuela debe tener un nombre';
        newError.error = 'Tiene errores en la solicitud';
    } 
    return newError
};

  const handleForm = async () => {
    const valError = validarError(escuela);
    if (valError.error) {
      setError(valError);
      setClaseError('')
      return
    }
    setCargando(true);
    const newEscuela =escAEditar 
      ? await actualizarNuevoEscuela(escAEditar.idEscuela, escuela, setErrorFetch) 
      : await actualizarNuevoEscuela(escAEditar.idEscuela, escuela, setErrorFetch);
    if (newEscuela) {
      setAlerta(false);
      setCargando(false);
    }
  };

  if (cargando) return (
    <Cargando  error={error}/>
  )

  return (
    <Formulario
      handleForm={(e) => handleForm(e)}
      textBtn={escAEditar ? 'Editar escuela' : 'Cargar escuela'}
      subtitulo={escAEditar ? 'Editar escuela' : 'Cargar escuela'}
      error={error.error}
      classError={claseError}
      children={
        <>
          <Inputs
            name={'nombre'}
            texto={'Nombre'}
            tipo={'text'}
            error={error.nombre}
            handleOnChange={(e) => handleOnChange(e)}
            valor={escuela.nombre}
          />
          <Inputs
            name={'direccion'}
            texto={'Dirección'}
            tipo={'text'}
            error={error.direccion}
            handleOnChange={(e) => handleOnChange(e)}
            valor={escuela.direccion}
          />
          <Inputs
            name={'numero'}
            texto={'Celular'}
            tipo={'phone'}
            error={error.numero}
            handleOnChange={(e) => handleOnChange(e)}
            valor={escuela.numero}
          />
          <Inputs
            name={'email'}
            texto={'Email'}
            tipo={'email'}
            error={error.email}
            handleOnChange={(e) => handleOnChange(e)}
            valor={escuela.email}
          />
        </>
      }
    />
  )
}

export default CargarEscuela;