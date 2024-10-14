import { useEffect, useState } from "react";
import Formulario from "../../../componentes/formulario/formulario";
import ClienteCargarInterno from "../../cliente/cargar/clienteCargarInterno";
import AgregarLibro from "./prueba/agregarLibro";
import CargarPedidoLibroJunior from "./prueba/cargarPedidoLibroJunior";
import PedidoGestionLibro from "./prueba/pedidoGestionLibro";
import CargarPedidoSaldo from "./prueba/cargarPedidoSaldo";
import AlertaEliminar from "../../../componentes/alertas/alertaEliminar/alertaEliminar";
import PedidoFormSuperior from "./prueba/pedidoFormSuperior";
import Cargando from "../../../componentes/cargando/cargando";
import { useGlobalContext } from "../../../contexto/contexto";
import Modal from "../../../componentes/modal/modal";
import { useModalContext } from "../../../contexto/modalContexto";
import MiniNav from "../../../componentes/miniHeder/miniNav";
import Recycle from '../../../assets/recycle.svg'
import Celular from '../../../assets/phone.svg'
import usePedidoManager from "../../../hooks/pedido/cargar/usePedidoManager";

function CargarPedidoManager() {
  const { estadoModal, setEstadoModal } = useModalContext();
  const { currentPedidoIndex } = useGlobalContext();
  const [isRecicle, setIsRecycle] = useState(false);

  const {
    claseError, errorFrom, cargarPedidoCompleto,
    persona, onChangePersona, coincidenciasPersona, alertaCoincidenciaPersona, handleSelecPersona,
    onChangePedido, pedido,
    loading, errorPost, response, recetearPedidoCompelto
  } = usePedidoManager();

  useEffect(() => {
    if (!estadoModal) {
      setIsRecycle(false);
    }
  }, [estadoModal]);

  if (loading || errorPost || response) return (
    <Modal
      children={
        <Cargando children={
          loading
            ? (<h6>Cargando el pedido ...</h6>)
            : errorPost
              ? (<h6>`Error al cargar el pedido: ${errorPost}`</h6>)
              : <h6>Pedido cargado con exito</h6>
        } />
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
              onClick={() => { setIsRecycle(true), setEstadoModal(true) }}
              className='btn-add'
            ><img src={Recycle} alt='Recetear pedido' /></li>
            <li
              title='Cliente'
              className='btn-add'
            >{!persona && !persona.celular ? (
              <h5>Registrar pedido {currentPedidoIndex + 1}</h5>
            ) : (
              <>
                <img src={Celular} alt='Cliente' />
                <h5>{persona.celular}</h5>
              </>
            )}
            </li>
          </>
        }
      />
      <Formulario
        classError={claseError}
        error={errorFrom.error}
        textBtn={'Confirmar'}
        subtitulo={'Nuevo pedido'}
        handleForm={cargarPedidoCompleto}
        children={
          <>
            <ClienteCargarInterno
              persona={persona}
              error={errorFrom}
              handleOnChange={onChangePersona}
              coincidencias={coincidenciasPersona}
              alerta={alertaCoincidenciaPersona}
              handleSelec={handleSelecPersona}
            />

            <PedidoFormSuperior
              onChangePedido={onChangePedido}
              pedido={pedido}
              errorFrom={errorFrom}
            />
            <AgregarLibro />
            <CargarPedidoLibroJunior />
            <PedidoGestionLibro />
            <CargarPedidoSaldo
              onChangePedido={onChangePedido}
              pedido={pedido}
              errorFrom={errorFrom}
            />
          </>
        }
      />
      {
        isRecicle ? (
          <Modal
            children={
              <AlertaEliminar
                setEliminar={setEstadoModal}
                handleEliminar={(e) => { recetearPedidoCompelto(), setEstadoModal(false) }}
                error={''}
                children={persona?.celular ? (
                  <h6>
                    Seguro que quiere recetear el pedido:
                    {<img src={Celular} alt="Celular" />
                    }
                    {persona.celular}
                  </h6>
                ) : (
                  <h6>{`Seguro que quiere recetear el pedido #${currentPedidoIndex + 1}`}</h6>
                )}
              />
            }
          />
        ) : null
      }
    </>
  )

}
export default CargarPedidoManager;