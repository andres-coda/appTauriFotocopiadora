import MiniNav from "../../../componentes/miniHeder/miniNav";
import LeftArrow from "../../../assets/arrowLeft.svg"
import Buscar from "../../../assets/buscar.svg"
import Formulario from "../../../componentes/formulario/formulario";
import ClienteCargarInterno from "./clienteCargarInterno";
import Cargando from "../../../componentes/cargando/cargando";
import AlertaFormulario from "../../../componentes/alertas/alertaFormulario/alertaFormulario";
import useClienteForm from "../../../hooks/cliente/cargar/useClienteForm";

function ClienteCargar() {
  const {handleAtras, handleForm, onchange, handleListaClientes, 
    errorPost, loading, response, 
    errorPut, loadingPut, responsePut, 
    info, errorFrom, 
    coincidencias, alertaCoincidencia, handleSelec,
    alerta, setAlerta } = useClienteForm();

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
        handleForm={handleForm}
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
      <AlertaFormulario 
        isAlerta={alerta}
        setIsAlerta={setAlerta}
        children={
          <>
            {errorPost || errorPut ? <Cargando text={errorPost ? errorPost : errorPut} /> : null}
            {response || responsePut ? <Cargando text={response ? 'Cliente creado con exito' : 'Cliente actualizado con exito'} /> : null}
            {loading || loadingPut ? <Cargando text={loading ? 'Se esta creando el cliente ...' : 'Se esta actualizando el cliente ...'} /> : null}
          </>
        }
      />
    </>
  )
}
export default ClienteCargar;