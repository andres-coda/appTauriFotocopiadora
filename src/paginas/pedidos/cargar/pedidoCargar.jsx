import { useContext, useState } from 'react';
import './pedidoCargar.css'
import { useNavigate } from 'react-router-dom';
import Recycle from '../../../assets/recycle.svg'
import Celular from '../../../assets/phone.svg'
import { contexto } from '../../../contexto/contexto.jsx';
import { isFiniteNumber } from '../../../funciones/utilidades.function.js';
import { crearPedido } from '../../../servicios/pedido.service.js';
import { rutasGenerales } from '../../../rutas/rutas.jsx';
import Cargando from '../../../componentes/cargando/cargando.jsx';
import AlertaFormulario from '../../../componentes/alertas/alertaFormulario/alertaFormulario.jsx';
import MiniNav from '../../../componentes/miniHeder/miniNav.jsx';
import Formulario from '../../../componentes/formulario/formulario.jsx';
import ClienteCargarInterno from '../../cliente/cargar/clienteCargarInterno.jsx';
import Inputs from '../../../componentes/input/input.jsx';
import CargarPedidoLibro from './cargarPedidoLibro.jsx';
import PedidoLibroCardInterno from '../libroPedido/pedidoLibroCardInterno.jsx';
import BotonFormulario from '../../../componentesStilos/botones/botonFormulario.jsx';
import LibroCargar from '../../libro/cargar/libroCargar.jsx';

const errorInicial = {
  celular: '',
  fechaEntrega: '',
  importeTotal: '',
  sena: '',
  archivos: '',
  anillados: '',
  error: ''
}

const pedidoInicial = {
  archivos: "",
  anillados: "",
  fechaEntrega: "",
  importeTotal: "",
  sena: "",
  librosPedido: [],
  cliente: {
    nombre: "",
    celular: "",
    email: ""
  },
  especificaciones: [],
  pedidoLibro: {
    cantidad: 1,
    especificaciones: [],
    extras: "",
    libro: {}
  },
  error: {
    celular: '',
    fechaEntrega: '',
    importeTotal: '',
    sena: '',
    archivos: '',
    anillados: '',
    error: ''
  }
}

function PedidoCargar() {
  const { setDatos, pedidos, currentPedidoIndex, setPedidos } = useContext(contexto);
  const navigate = useNavigate();
  const [error, setError] = useState(errorInicial);
  const [isRecicle, setIsRecycle] = useState(false);
  const [cargando, setCargando ] = useState(false);
  const [alertaNew, setAlertaNew] = useState(false);
  const [errorFetch, setFetchError] = useState('')

  const handleOnChangePedido = (e) => {
    const updatedPedidos = [...pedidos];
    updatedPedidos[currentPedidoIndex] = { ...pedidos[currentPedidoIndex], [e.target.name]: e.target.value };
    setPedidos(updatedPedidos);
  };

  const handleRecycle = () => {
    const updatedPedidos = [...pedidos];
    updatedPedidos[currentPedidoIndex] = pedidoInicial;
    setPedidos(updatedPedidos);
  }

  const handleAgregarLibro = (e) => {
    const nuevoPedidoLibro = pedidos[currentPedidoIndex].pedidoLibro;
    const updatedPedido = {
      ...pedidos[currentPedidoIndex],
      librosPedido: [...pedidos[currentPedidoIndex].librosPedido, nuevoPedidoLibro],
      especificaciones: [],
      pedidoLibro: {
        cantidad: 1,
        especificaciones: [],
        extras: "",
        libro: {}
      }
    };
    const updatedPedidos = [...pedidos];
    updatedPedidos[currentPedidoIndex] = updatedPedido;
    setPedidos(updatedPedidos);
  };


  const handlePedidoLibroEdit = (pedidoLibroInterno) => {
    const nuevaLista = pedidos[currentPedidoIndex].librosPedido.filter(item => item != pedidoLibroInterno);
    const updatedPedido = {
      ...pedidos[currentPedidoIndex],
      librosPedido: nuevaLista,
      especificaciones: pedidoLibroInterno.especificaciones,
      pedidoLibro: pedidoLibroInterno
    };
    setPedidos((prevPedidos) => {
      const newPedidos = [...prevPedidos];
      newPedidos[currentPedidoIndex] = updatedPedido;
      return newPedidos;
    })
  }

  const ifError = (error) => {
    const newPedido = { ...pedidos[currentPedidoIndex], error: error };
    const newPedidos = [...pedidos];
    newPedidos[currentPedidoIndex] = newPedido;
    setPedidos(newPedidos);
  }

  const validarPedido = (pc) => {
    let errorLocal = errorInicial;
    if (!pc.cliente.celular && !pc.cliente.nombre) {
      errorLocal = {
        ...errorLocal,
        celular: 'El cliente del pedido debe tener nombre o número de celular',
        error: 'Tiene errores en la solicitud'
      }
    }
    if (!pc.pedido.fechaEntrega) {
      errorLocal = {
        ...errorLocal,
        fechaEntrega: 'El pedido debe tener fecha de entrega',
        error: 'Tiene errores en la solicitud'
      }
    }
    if (!pc.pedido.importeTotal || !isFiniteNumber(Number(pc.pedido.importeTotal))) {
      errorLocal = {
        ...errorLocal,
        importeTotal: 'El pedido debe tener importe total válido (en números)',
        error: 'Tiene errores en la solicitud'
      };
    }
    if (!pc.pedido.sena || !isFiniteNumber(Number(pc.pedido.sena))) {
      errorLocal = {
        ...errorLocal,
        sena: 'El pedido debe tener una seña válida (en números)',
        error: 'Tiene errores en la solicitud'
      };
    }
    if (Number(pc.pedido.sena) > Number(pc.pedido.importeTotal)) {
      errorLocal = {
        ...errorLocal,
        sena: 'La seña no puede ser mayor que el importe total',
        error: 'Tiene errores en la solicitud'
      };
    }
    if (!pc.pedido.archivos || !isFiniteNumber(Number(pc.pedido.archivos))) {
      errorLocal = {
        ...errorLocal,
        archivos: 'El pedido debe tener la cantidad de archivos (en números)',
        error: 'Tiene errores en la solicitud'
      };
    }
    if (!pc.pedido.anillados || !isFiniteNumber(Number(pc.pedido.anillados))) {
      errorLocal = {
        ...errorLocal,
        anillados: 'El pedido debe tener la cantidad de anillados (en números)',
        error: 'Tiene errores en la solicitud'
      };
    }
    if (pc.librosPedido.length <= 0) {
      errorLocal.error = 'El pedido debe tener al menos un libro';
    }
    return errorLocal;
  };


  const cargarPedidoCompleto = async (e) => {
    setCargando(true);
    const nuevaLista = pedidos[currentPedidoIndex].librosPedido.map((libroPedido) => {
      const nuevasEspecificaciones = libroPedido.especificaciones
        .filter(esp => esp.idEspecificaciones)
        .map(esp => esp.idEspecificaciones);
          const libroPedidoCargar = {
            ...libroPedido,
            especificaciones: nuevasEspecificaciones,
            extras: libroPedido.extras,
            libro: {
              idLibro: libroPedido.libro.idLibro,
              nombre: libroPedido.libro.nombre,
            }
          }
          return libroPedidoCargar
    })

    const pedidoCompleto = {
      cliente: {
        nombre: pedidos[currentPedidoIndex].cliente.nombre,
        idPersona: pedidos[currentPedidoIndex].cliente.idPersona,
        email: pedidos[currentPedidoIndex].cliente.email,
        celular: pedidos[currentPedidoIndex].cliente.celular,
      },
      pedido: {
        anillados: pedidos[currentPedidoIndex].anillados,
        archivos: pedidos[currentPedidoIndex].archivos,
        fechaEntrega: pedidos[currentPedidoIndex].fechaEntrega,
        importeTotal: pedidos[currentPedidoIndex].importeTotal,
        sena: pedidos[currentPedidoIndex].sena,
      },
      librosPedido: nuevaLista
    }

    const errorValidar = validarPedido(pedidoCompleto);
    if (errorValidar.error) {
      ifError(errorValidar);
      setCargando(false);
      return
    }

    const nuevoPedido = await crearPedido(pedidoCompleto, setDatos, setFetchError);
    if (nuevoPedido) {
      handleRecycle();
      setCargando(false);
      setError(errorInicial);
      navigate(rutasGenerales.PEDIDOINDIVIDUAL);
    }
  }

  if (pedidos.length==0) return (
    <Cargando text={'No hay pedidos para cargar en la lista de pendientes'} />
  )

  if (cargando) return (
    <AlertaFormulario 
      isAlerta={cargando}
      setIsAlerta={setCargando}
      children={
        <Cargando children={<p>Se esta procesando el pedido</p>}/>
      }
    />
  )
  
  return (
          <>
            <MiniNav
              children={
                <>
                  <li
                    title='Recetear pedido'
                    onClick={() => { setIsRecycle(true) }}
                    className='btn-add'
                  ><img src={Recycle} alt='Recetear pedido' /></li>
                  <li
                    title='Cliente'
                    className='btn-add'
                  >{!pedidos[currentPedidoIndex] && !pedidos[currentPedidoIndex].cliente && !pedidos[currentPedidoIndex].cliente.celular || pedidos.length <= 0 ? (
                    <h5>Registrar pedido {currentPedidoIndex + 1}</h5>
                  ) : (
                    <>
                      <img src={Celular} alt='Cliente' />
                      <h5>{pedidos[currentPedidoIndex]?.cliente.celular}</h5>
                    </>
                  )}
                  </li>
                </>
              }
            />
            {pedidos[currentPedidoIndex] ? (
              <>
                <Formulario
                  handleForm={cargarPedidoCompleto}
                  textBtn={'Registrar pedido'}
                  subtitulo={`Registrar pedido ${currentPedidoIndex + 1}`}
                  error={pedidos[currentPedidoIndex].error.error}
                  children={
                    <>
                      <ClienteCargarInterno
                        persona={pedidos[currentPedidoIndex].cliente}
                        error={pedidos[currentPedidoIndex].error.celular}
                        setPersona={(cliente) => setPedidos((prevPedidos) => {
                          const newPedidos = [...prevPedidos];
                          newPedidos[currentPedidoIndex].cliente = cliente;
                          return newPedidos;
                        })}

                      />
                      <hr className="linea"></hr>
                      <div className="form-doble">
                        <Inputs
                          name={'archivos'}
                          texto={'Archivos'}
                          tipo={'text'}
                          error={pedidos[currentPedidoIndex].error.archivos}
                          handleOnChange={(e) => handleOnChangePedido(e)}
                          valor={pedidos[currentPedidoIndex].archivos}
                          clase={'alin-derecha'}
                        />
                        <Inputs
                          name={'anillados'}
                          texto={'Anillados'}
                          tipo={'text'}
                          error={pedidos[currentPedidoIndex].error.anillados}
                          handleOnChange={(e) => handleOnChangePedido(e)}
                          valor={pedidos[currentPedidoIndex].anillados}
                          clase={'alin-derecha'}
                        />


                      </div>
                      <hr className="linea"></hr>
  
                      <CargarPedidoLibro
                        pedidoActual={pedidos[currentPedidoIndex]}
                        setAlertaNew={setAlertaNew}
                      />
                      {pedidos[currentPedidoIndex].pedidoLibro && pedidos[currentPedidoIndex].pedidoLibro.libro ? (
                        <PedidoLibroCardInterno
                          estadoClas={'cargando'}
                          pedidoLibro={pedidos[currentPedidoIndex].pedidoLibro}
                        />
                      ) : (null)}
                      <button className="formulario-btn" onClick={handleAgregarLibro}>Agregar libro</button>
                      {pedidos[currentPedidoIndex].librosPedido.length > 0 ? (
                        pedidos[currentPedidoIndex].librosPedido.slice().reverse().map((pedidoLibro, index) => (
                          pedidoLibro ? (
                            <PedidoLibroCardInterno
                              estadoClas={'proceso'}
                              pedidoLibro={pedidoLibro}
                              key={`libro-${index}`}
                              quitarLibro={() => handlePedidoLibroEdit(pedidoLibro)}
                            />
                          ) : null
                        ))
                      ) : (null)}
                      <hr className="linea"></hr>
                      <Inputs
                        name={'fechaEntrega'}
                        texto={'Fecha de entrega'}
                        tipo={'date'}
                        error={pedidos[currentPedidoIndex].error.fechaEntrega}
                        handleOnChange={(e) => handleOnChangePedido(e)}
                        valor={pedidos[currentPedidoIndex].fechaEntrega}
                        clase={'alin-derecha'}
                      />

                      <div className="form-doble">
                        <Inputs
                          name={'importeTotal'}
                          texto={'Total'}
                          tipo={'text'}
                          error={pedidos[currentPedidoIndex].error.importeTotal}
                          handleOnChange={(e) => handleOnChangePedido(e)}
                          valor={pedidos[currentPedidoIndex].importeTotal}
                          clase={'alin-derecha'}
                        />
                        <Inputs
                          name={'sena'}
                          texto={'Seña'}
                          tipo={'text'}
                          error={pedidos[currentPedidoIndex].error.sena}
                          handleOnChange={(e) => handleOnChangePedido(e)}
                          valor={pedidos[currentPedidoIndex].sena}
                          clase={'alin-derecha'}
                        />


                      </div>
                      <div className='saldo'>
                        <p>Saldo:</p>
                        <p>${pedidos[currentPedidoIndex].importeTotal - pedidos[currentPedidoIndex].sena}</p>

                      </div>

                    </>
                  }
                />
                <AlertaFormulario
                  isAlerta={isRecicle}
                  setIsAlerta={setIsRecycle}
                  children={
                    <>
                      <h6>Seguro que quiere recetear el pedido {!pedidos[currentPedidoIndex].cliente.celular ? (
                        <>
                          {currentPedidoIndex + 1}
                        </>
                      ) : (
                        <>
                          <img src={Celular} alt='Celular' />
                          {pedidos[currentPedidoIndex].cliente.celular}
                        </>
                      )}</h6>
                      <BotonFormulario 
                        onClick={() => { handleRecycle(), setIsRecycle(false) }}
                        textBtn={'Recetear'}
                      />
                    </>
                  }
                />
                <AlertaFormulario 
                  isAlerta={alertaNew}
                  setIsAlerta={setAlertaNew}
                  children={
                    <LibroCargar setAlerta={setAlertaNew} />
                  }
                />
              </>
            ) : (
              null
            )}
          </>
  )
}

export default PedidoCargar;