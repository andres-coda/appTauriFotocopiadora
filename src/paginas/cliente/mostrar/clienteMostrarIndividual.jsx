import { useState } from "react";
import { useGlobalContext } from "../../../contexto/contexto";
import MiniNav from "../../../componentes/miniHeder/miniNav";
import LeftArrow from "../../../assets/arrowLeft.svg"
import Editar from "../../../assets/edit.svg"
import Eliminar from "../../../assets/deleted.svg"
import PedidoCard from '../../../componentes/pedidos/card/pedidoCard'
import ClienteCardIndividual from '../card/clienteCardIndividual'
import AlertaEliminar from "../../../componentes/alertas/alertaEliminar/alertaEliminar";
import Cargando from "../../../componentes/cargando/cargando";
import useClienteMostrar from "../../../hooks/cliente/mostrar/useClienteMostrar";
import Modal from "../../../componentes/modal/modal";
import { useModalContext } from "../../../contexto/modalContexto";

function ClienteMostrarIndividual() {
  const { datos} = useGlobalContext()
  const { setEstadoModal } = useModalContext()
  const [filterPedido, setFilterPedido] = useState(() => (pedido) => true);
  const {handleEditarCliente, error, loading, response, eliminarCliente, handleAtras} = useClienteMostrar();

  if (!datos.clienteActual) return null
  
  return (
    <>
      <MiniNav
        children={
          <>
            <li
              onClick={() => {
                handleAtras()
              }}
              title='Atras'
              className="btn-add"
            ><img src={LeftArrow} alt="Atras" /></li>
            <li
              title='Editar cliente'
              className="btn-add"
              onClick={()=>{handleEditarCliente()}}
            ><img src={Editar} alt="Editar cliente" /></li>
            <li
              title='Eliminar cliente'
              className="btn-add"
              onClick={() => setEstadoModal(true)}
            ><img src={Eliminar} alt="Eliminar cliente" /></li>
          </>
        }
      />
      <h3 className="titulo">Datos del cliente</h3>
      <ClienteCardIndividual cliente={datos.clienteActual} setFilterPedido={setFilterPedido} />
      <h3 className="subtitulo-cliente">Lista de pedidos</h3>
      <ul className="cliente-lista-pedidos">
        {datos.clienteActual?.pedidos
          ?.filter(filterPedido)
          .map((pedido, index) =>
            <li key={`pedido-${index}`}>
              <PedidoCard pedido={pedido} />
            </li>
          )
        }
      </ul>
      <Modal
        children={
          <>
            {loading ? <Cargando text={`Eliminando ${datos.clienteActual.nombre || datos.clienteActual.celular}`} /> : null}
            {error ? <Cargando text={`Error al eliminar a ${datos.clienteActual.nombre || datos.clienteActual.celular}, ${error}`} /> : null}
            {response ? <Cargando text={`El cliente fue eliminado con exito`} /> : null}
            {!loading && !error && !response ? (
              <AlertaEliminar
                children={<h6>{`¿Desea eliminar el cliente ${datos.clienteActual.nombre || datos.clienteActual.celular}?`}</h6>}
                setEliminar={setEstadoModal}
                handleEliminar={()=>eliminarCliente()}
              />) : (null)}
          </>
        }
      />
    </>
  )
}
export default ClienteMostrarIndividual;