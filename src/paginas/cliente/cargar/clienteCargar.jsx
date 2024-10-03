import { useContext, useState } from "react";
import { contexto } from "../../../contexto/contexto";
import { useNavigate } from "react-router-dom";
import { isFiniteNumber } from "../../../funciones/utilidades.function";
import { cargarCliente, editarCliente } from "../../../servicios/cliente.servicie";
import { rutasGenerales } from "../../../rutas/rutas";
import MiniNav from "../../../componentes/miniHeder/miniNav";
import LeftArrow from "../../../assets/arrowLeft.svg"
import Buscar from "../../../assets/buscar.svg"
import Formulario from "../../../componentes/formulario/formulario";
import ClienteCargarInterno from "./clienteCargarInterno";
import Cargando from "../../../componentes/cargando/cargando";

const errorInicial = {
  error: '',
  nombre: '',
  celular: '',
  email: ''
}

function ClienteCargar() {
  const {datos,setDatos} = useContext(contexto);
  const navigate= useNavigate();
  const [cargando, setCargando] = useState(false);

  const [persona, setPersona] = useState({
    nombre: datos.clienteAEditar?.nombre || '',
    celular: datos.clienteAEditar?.celular || '',
    email: datos.clienteAEditar?.email ||''
  });

  const [error, setError] = useState(errorInicial);

  const validacionDatos=()=>{
    const newError = errorInicial;

    if (!persona.nombre && !persona.celular) {
      newError.nombre='El campo nombre o celular debe estar completo';
      newError.celular='El campo nombre o celular debe estar completo';
      newError.error="tiene errores en la carga de datos"
    }

    if (persona.celular && !isFiniteNumber(Number(persona.celular)) || persona.celular && persona.celular.length<9) {
      newError.celular='El celular debe ser un número valido y tener minimo 9 digitos';
      newError.error="tiene errores en la carga de datos"
    }

    return newError; 
  }

  const handleFrom = async (e) => {
    const validacion= validacionDatos();
    if(validacion.error) {
      setError(validacion);
      return
    }

    setCargando(true);

    const nuevoCliente = datos.clienteAEditar 
      ? await editarCliente(datos.clienteAEditar.idPersona,persona, setError)
      : await cargarCliente(persona, setError);
    
    if ( nuevoCliente) {
      setDatos((prev)=>({...prev, clienteActual:nuevoCliente, clienteAEditar:null}));
      navigate(rutasGenerales.CLIENTEINDIVIDUAL);
    }
  }

  const handleListaClientes=()=>{
    navigate(rutasGenerales.CLIENTES);
  }

  const handleAtras = () =>{
    setDatos((prev)=>({...prev, clienteAEditar:null}));
    navigate(-1);
  }

  if (cargando) return (
    <>
    {console.log(error)
    }
    <Cargando text={'Se esta procesando la solicitud ...'} error={error.error} />
    </>
  )

  return (
    <>
    <MiniNav
              children={
                <>
                  <li
                    title='Atras'
                    onClick={handleAtras}
                    className="btn-add"
                  ><img src={LeftArrow} alt="Atras" /></li>
                  <li
                    title='Lista de clientes'
                    onClick={handleListaClientes}
                    className="btn-add"
                    ><img src={Buscar} alt="Lista de clientes" /></li>
                </>
              }
            />
      <Formulario
        handleForm={handleFrom}
        textBtn={'Confirmar'}
        subtitulo={'Guardar cliente'}
        error={error.error}
        children={
          <ClienteCargarInterno
            persona={persona}
            setPersona={setPersona}
            error={error}
          />
        }
      />
    </>
  )
}
export default ClienteCargar;