import { useContext, useEffect, useState } from 'react';
import './pedidoMostrarEsp.css'
import { contexto } from '../../../contexto/contexto';
import { useNavigate } from 'react-router-dom';
import MiniNav from '../../../componentes/miniHeder/miniNav';
import LeftArrow from '../../../assets/arrowLeft.svg'
import Ordenar from '../../../assets/orden.svg'
import PedidoMostrarCard from '../card/pedidoMostrarCard';
import Cargando from '../../../componentes/cargando/cargando';
import AlertaFormulario from '../../../componentes/alertas/alertaFormulario/alertaFormulario';
import FiltroOrdenarPedido from '../filtros/filtroOrdenarPedido';
import Modal from '../../../componentes/modal/modal';
import { useModalContext } from '../../../contexto/modalContexto';

function PedidoMostrarEsp() {
  const { datos } = useContext(contexto);
  const navigate = useNavigate();
  const {setEstadoModal}=useModalContext();
  const [ordenar, setOrdenar] = useState(false)

  const handleAtras = () => {
    navigate(-1);
  }
  
  useEffect(()=>{
    if (!datos.listaPedidoLibros || !Array.isArray(datos.listaPedidoLibros.pedidoLibros) || datos.listaPedidoLibros.pedidoLibros.length <= 0){
      navigate(-1);
    }
  },[datos.listaPedidoLibros]);

  return (
    <>
      <MiniNav
        children={
          <>
          <li 
            onClick={handleAtras}
            title="Atras"
            className="btn-add"
          ><img src={LeftArrow} alt="Atras" /></li>
          <li 
            title="Ordenar"
            onClick={()=>{setEstadoModal(true), setOrdenar(true)}}
            className="btn-add"
          ><img src={Ordenar} alt="Ordenar" /></li>
          </>
        }
      />
      {datos.listaPedidoLibros.pedidoLibros?.length > 0 ? (
        <>
          <div className="titulos">
            <h5>{datos.listaPedidoLibros.pedidoLibros[0].libro.nombre}</h5>
            <p>{datos.listaPedidoLibros.pedidoLibros[0].estadoPedido.estado}</p>
            <ul>
              {datos.listaPedidoLibros.pedidoLibros[0].especificaciones.map((esp, index) => (
                <li key={`esp-${index}`}>{esp.nombre}</li>
              ))}
            </ul>
          </div>
          <div className='pedido-conteiner'>

          {datos.listaPedidoLibros.pedidoLibros.map((libro, index) => (
            <PedidoMostrarCard
            key={`libro-${index}`} 
            libro={libro}
            />
          ))}
          </div>

        </>) : (<Cargando />)}

        <Modal 
          children={
            <FiltroOrdenarPedido />
          }  
          modal={ordenar} setModal={setOrdenar}      
        />
    </>
  )
}

export default PedidoMostrarEsp;