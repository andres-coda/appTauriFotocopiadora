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

function PedidoMostrarCard({ libro }) {
  const { setDatos } = useContext(contexto);
  const [modifEstado, setModifEstado] = useState(false);
  const [estadoClas, setEstadoClas] = useState(`pendiente`);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  useEffect(() => {
    caseClaseEstado(setEstadoClas, libro.estadoPedido.idEstadoPedido)
  }, [libro.estadoPedido.idEstadoPedido]);

  const handleClickCard = async () => {
    leerPedido(libro.pedido, setDatos, setError);
    navigate(rutasGenerales.PEDIDOINDIVIDUAL)
  }

  return (
    <>
      <div className='cliente-pedidos' title={libro.estadoPedido.estado} onClick={handleClickCard}>
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
            onClick={(e) => { e.stopPropagation(), setModifEstado(true) }}
            clase={'inferior'}
          />
        </div>
      </div>
      <AlertaFormulario
        isAlerta={modifEstado}
        setIsAlerta={setModifEstado}
        children={
          <CambiarEstado
            estadoClase={estadoClas}
            libroPedido={libro}
            setModifEstado={setModifEstado}
          />
        }
      />
    </>
  )
}

export default PedidoMostrarCard;