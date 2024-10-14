import { useContext, useEffect, useState } from "react";
import { contexto } from "../../../contexto/contexto";
import { useNavigate } from "react-router-dom";
import { caseClaseEstado } from "../../../funciones/utilidades.function";
import { leerPedido } from "../../../servicios/pedido.service";
import ClienteNombre from "../../../componentes/cliente/clienteCabecera/clienteNombre";
import Book from '../../../assets/books.svg'
import AlertaFormulario from "../../../componentes/alertas/alertaFormulario/alertaFormulario";
import BotonEditar from "../../../componentesStilos/botones/botonEditar";
import PedidoFecha from '../../../componentes/pedidos/card/fecha/pedidoFecha'
import EspecificacionesCard from "../especificaciones/especificacionesCard";
import CambiarEstado from "../estado/cambiarEstado";
import { rutasGenerales } from "../../../rutas/rutas";
import '../../../componentes/pedidos/card/pedidoCard.css'
import Modal from "../../../componentes/modal/modal";
import { useModalContext } from "../../../contexto/modalContexto";
import useApi from "../../../servicios/Api/useApi";
import { URL_PEDIDOS } from "../../../endPoint/endpoint";
import { pedidoAdapter } from "../../../adaptadores/pedido.adapter";

function PedidoMostrarCard({ libro }) {
  const { setDatos } = useContext(contexto);
  const { estadoModal, setEstadoModal } = useModalContext()
  const [estadoClas, setEstadoClas] = useState(`pendiente`);
  const navigate = useNavigate();
  const [irCambiarEstado, setIrCambiarEstado] = useState(false);
  const [irAPedido, setIrAPedido] = useState(false);

  const { response, fetchData, errorFetch, loading } = useApi(URL_PEDIDOS + '/' + libro.pedido.idPedido, pedidoAdapter)

  useEffect(() => {
    caseClaseEstado(setEstadoClas, libro.estadoPedido.idEstadoPedido)
  }, [libro.estadoPedido.idEstadoPedido]);

  const handleClickCard = async (e) => {
    e.stopPropagation()
    setIrAPedido(true);
    fetchData();
  }

  useEffect(() => {
    if (response) {
      setDatos((prev) => ({ ...prev, pedidoActual: response }));
      navigate(rutasGenerales.PEDIDOINDIVIDUAL)
    }
    if (response || loading || errorFetch || !estadoModal) {
      setIrCambiarEstado(false);
    }
  }, [response, loading, errorFetch, estadoModal]);

  return (
    <>
      <div className='cliente-pedidos' title={libro.estadoPedido.estado} onClick={(e) => handleClickCard(e)}>
        <div className={`cliente-pedidos-interno ${estadoClas}`}>
          <PedidoFecha pedido={libro.pedido} />
        </div>
        <div className={`cliente-pedidos-interno ${estadoClas}`}>
          <EspecificacionesCard listaEspecificaciones={libro.especificaciones} clase={'especificaciones-horizontal'} />
        </div>
        <div className={`cliente-pedidos-interno ${estadoClas} pedido-cantidad`}>
          <h6>{libro.cantidad}</h6>
          <div className="cliente-pedidos-interno-vertical">
            <h6><img src={Book} alt="Libro" />{libro.libro.nombre}</h6>
            <p>{`Detalles: ${libro.extras}`}</p>
          </div>
        </div>
        <div className={`cliente-pedidos-interno ${estadoClas} position-relative`}>
          <ClienteNombre nombre={libro.pedido.cliente.nombre ? libro.pedido.cliente.nombre : libro.pedido.cliente.celular} />
          <BotonEditar
            titulo={'Editar estado'}
            onClick={(e) => { e.stopPropagation(), setEstadoModal(true), setIrCambiarEstado(true), setIrAPedido(false) }}
            clase={'inferior'}
          />
        </div>
      </div>
      {irCambiarEstado ? (
        <Modal children={
          <CambiarEstado
            estadoClase={estadoClas}
            libroPedido={libro}
          />
        } />
      ) : null}
      {irAPedido ? (
        <Modal
          children={
            <>
              {
                loading
                  ? (<h6>Cargando pedido ...</h6>)
                  : errorFetch
                    ? (<h6>{`Error al cargar pedido: ${errorFetch}`}</h6>)
                    : <h6>Pedido cargado con exito, redirigiendo ...</h6>
              }
            </>
          } />
      ) : (null)}
    </>
  )
}

export default PedidoMostrarCard;