import MiniNav from "../../../componentes/miniHeder/miniNav";
import LeftArrow from "../../../assets/arrowLeft.svg"
import Buscar from "../../../assets/buscar.svg"
import Formulario from "../../../componentes/formulario/formulario";
import ClienteCargarInterno from "./clienteCargarInterno";
import Cargando from "../../../componentes/cargando/cargando";
import useClienteForm from "../../../hooks/cliente/cargar/useClienteForm";
import Modal from "../../../componentes/modal/modal";

function ClienteCargar() {
  const {handleAtras, cargarCliente, onchange, handleListaClientes, 
    errorPost, loading, response,
    info, errorFrom, 
    coincidencias, alertaCoincidencia, handleSelec
  } = useClienteForm();

  if (loading || errorPost || response) return (
    <Modal
      children={
        <Cargando children={
          loading 
            ? (<h6>Cargando el cliente</h6>) 
            : errorPost 
              ? (<h6>`Error al cargar el cliente: ${errorPost}`</h6>) 
              : <h6>Cliente cargado con exito</h6>
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
        handleForm={cargarCliente}
        textBtn={'Confirmar'}
        subtitulo={'Guardar cliente'}
        error={errorFrom.error}
        children={
          <ClienteCargarInterno
            persona={info}
            error={errorFrom}
            handleOnChange={onchange}
            coincidencias={coincidencias}
            alerta={alertaCoincidencia} 
            handleSelec={handleSelec}

          />
        }
      />
    </>
  )
}
export default ClienteCargar;