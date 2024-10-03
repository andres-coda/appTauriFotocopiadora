import { useContext, useEffect, useState } from "react";
import { contexto } from "../../../contexto/contexto";
import { useNavigate } from "react-router-dom";
import { leerClienteActual } from "../../../servicios/cliente.servicie";
import MiniNav from "../../../componentes/miniHeder/miniNav";
import LeftArrow from "../../../assets/arrowLeft.svg"
import Editar from "../../../assets/edit.svg"
import Cargando from "../../../componentes/cargando/cargando";
import PedidoCard from '../../../componentes/pedidos/card/pedidoCard'
import ClienteCardIndividual from '../card/clienteCardIndividual'
import { rutasGenerales } from "../../../rutas/rutas";

function ClienteMostrarIndividual() {
  const { datos, setDatos } = useContext(contexto);
  const [error, setError] = useState({ error: '' });
  const [filterPedido, setFilterPedido] = useState(() => (pedido) => true);
  const navigate = useNavigate();

  useEffect(() => {
    if (datos.clienteActual) {
      leerClienteActual(datos.clienteActual.idPersona, setDatos, setError);
    }
  }, []);

  const handleEditarCliente = () => {
    const clienteAEditar = datos.clienteActual;
    setDatos((prev) => ({ ...prev, clienteAEditar: clienteAEditar }));
    navigate(rutasGenerales.CLIENTENUEVO);
  }

  return (
    <>
      <MiniNav
        children={
          <>
            <li
              onClick={() => {
                navigate(-1);
                setDatos((prev) => ({ ...prev, clienteActual: null }));
              }}
              title='Atras'
              className="btn-add"
            ><img src={LeftArrow} alt="Atras" /></li>
            <li
              title='Editar cliente'
              className="btn-add"
              onClick={handleEditarCliente}
            ><img src={Editar} alt="Editar cliente" /></li>
          </>
        }
      />
      {
        datos.clienteActual ? (
          <>
            <h3 className="titulo">Datos del cliente</h3>
            <ClienteCardIndividual cliente={datos.clienteActual} setFilterPedido={setFilterPedido} />
            <h3 className="subtitulo-cliente">Lista de pedidos</h3>
            <ul className="cliente-lista-pedidos">
              {datos.clienteActual.pedidos
                ?.filter(filterPedido)
                .map((pedido, index) =>
                  <li key={`pedido-${index}`}>
                    <PedidoCard pedido={pedido} />
                  </li>
                )
              }
            </ul>
          </>
        ) : (
          <Cargando />
        )
      }
    </>
  )
}
export default ClienteMostrarIndividual;