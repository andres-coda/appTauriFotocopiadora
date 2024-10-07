import { useContext, useEffect, useState } from 'react';
import './pedidoCargar.css'
import Recycle from '../../../assets/recycle.svg'
import Celular from '../../../assets/phone.svg'
import { contexto } from '../../../contexto/contexto.jsx';
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
import usePedidoForm from '../../../hooks/pedido/cargar/usePedidoForm.js';
import AlertaEliminar from '../../../componentes/alertas/alertaEliminar/alertaEliminar.jsx';

function PedidoCargar() {
  const [isRecicle, setIsRecycle] = useState(false);
  const [alertaNew, setAlertaNew] = useState(false);
  const { pedidos, currentPedidoIndex } = useContext(contexto);

  const {
    onchange, handleAgregarLibro, handlePedidoLibroEdit,
    cargarPedidoCompleto, recetear, onChangeCliente,
    loading, errorPost,
    coincidenciasPersona, alertaCoincidenciaPersona, handleSelecPersona,
    alerta, setAlerta
  } = usePedidoForm();

  useEffect(()=>{
    console.log(pedidos);   
    console.log(currentPedidoIndex);
     
  },[]);
  
  

  if (pedidos.length==0) return (
    <>
    <MiniNav />
    <Cargando text={'No hay pedidos para cargar en la lista de pendientes'} />
    </>
  )

  if (alerta) return (
    <AlertaFormulario 
      isAlerta={alerta}
      setIsAlerta={setAlerta}
      children={
        <>
        { loading ?<Cargando text={'Se esta cargando el pedido'}/> :null }
        { errorPost? <Cargando text={`Hubo un error en la peticion: ${errorPost}`} /> : null }        
        </>
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
                  error={pedidos[currentPedidoIndex].error.error ||''}
                  children={
                    <>
                      <ClienteCargarInterno
                        persona={pedidos[currentPedidoIndex].cliente}
                        error={pedidos[currentPedidoIndex].error}
                        handleOnChange={onChangeCliente}
                        coincidencias={coincidenciasPersona}
                        alerta={alertaCoincidenciaPersona}
                        handleSelec={handleSelecPersona}
                      />
                      <hr className="linea"></hr>
                      <div className="form-doble">
                        <Inputs
                          name={'archivos'}
                          texto={'Archivos'}
                          tipo={'text'}
                          error={pedidos[currentPedidoIndex].error.archivos}
                          handleOnChange={(e) => onchange(e)}
                          valor={pedidos[currentPedidoIndex].pedido.archivos}
                          clase={'alin-derecha'}
                        />
                        <Inputs
                          name={'anillados'}
                          texto={'Anillados'}
                          tipo={'text'}
                          error={pedidos[currentPedidoIndex].error.anillados}
                          handleOnChange={(e) => onchange(e)}
                          valor={pedidos[currentPedidoIndex].pedido.anillados}
                          clase={'alin-derecha'}
                        />


                      </div>
                      <hr className="linea"></hr>
  
                      <CargarPedidoLibro
                        setAlertaNew={setAlertaNew}
                      />
                      {pedidos[currentPedidoIndex].pedidoLibro && pedidos[currentPedidoIndex].pedidoLibro.libro ? (
                        <PedidoLibroCardInterno
                          estadoClas={'cargando'}
                          pedidoLibro={pedidos[currentPedidoIndex].pedidoLibro}
                          libroCargando={pedidos[currentPedidoIndex].libro}
                        />
                      ) : (null)}
                      <BotonFormulario 
                        textBtn={'Agregar libro'}
                        onClick={handleAgregarLibro}
                        titulo={'Agregar libro'}
                      />
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
                        handleOnChange={(e) => onchange(e)}
                        valor={pedidos[currentPedidoIndex].pedido.fechaEntrega}
                        clase={'alin-derecha'}
                      />

                      <div className="form-doble">
                        <Inputs
                          name={'importeTotal'}
                          texto={'Total'}
                          tipo={'text'}
                          error={pedidos[currentPedidoIndex].error.importeTotal}
                          handleOnChange={(e) => onchange(e)}
                          valor={pedidos[currentPedidoIndex].pedido.importeTotal}
                          clase={'alin-derecha'}
                        />
                        <Inputs
                          name={'sena'}
                          texto={'Seña'}
                          tipo={'text'}
                          error={pedidos[currentPedidoIndex].error.sena}
                          handleOnChange={(e) => onchange(e)}
                          valor={pedidos[currentPedidoIndex].pedido.sena}
                          clase={'alin-derecha'}
                        />


                      </div>
                      <div className='saldo'>
                        <p>Saldo:</p>
                        <p>${pedidos[currentPedidoIndex].pedido.importeTotal - pedidos[currentPedidoIndex].pedido.sena}</p>

                      </div>

                    </>
                  }
                />
                <AlertaFormulario
                  isAlerta={isRecicle}
                  setIsAlerta={setIsRecycle}
                  children={
                    <AlertaEliminar 
                    setEliminar={isRecicle}
                    handleEliminar={recetear}
                    error={''}
                    children= {pedidos[currentPedidoIndex]?.cliente?.celular ? (
                      <h6>
                        Seguro que quiere recetear el pedido:
                        {//<img src={Celular} alt="Celular" />
                        }
                        {pedidos[currentPedidoIndex].cliente.celular}
                      </h6>
                    ) : (
                      <h6>{`Seguro que quiere recetear el pedido #${currentPedidoIndex + 1}`}</h6>
                    )}
                    />
                  }
                />
                <AlertaFormulario 
                  isAlerta={alertaNew}
                  setIsAlerta={setAlertaNew}
                  children={
                    <LibroCargar setAlerta={setAlertaNew}/>
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