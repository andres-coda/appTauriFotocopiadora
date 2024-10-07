import { useContext, useEffect, useState } from 'react';
import './pedidoMostrar.css'
import { contexto } from '../../../contexto/contexto';
import { useNavigate } from 'react-router-dom';
import { eliminarPedido, retirarPedido } from '../../../servicios/pedido.service.js';
import MiniNav from '../../../componentes/miniHeder/miniNav.jsx';
import LeftArrow from '../../../assets/arrowLeft.svg'
import Editar from '../../../assets/edit.svg'
import Eliminar from '../../../assets/deleted.svg'
import ClienteCabecera from '../../../componentes/cliente/clienteCabecera/clienteCabecera';
import PedidoFecha from '../../../componentes/pedidos/card/fecha/pedidoFecha.jsx'
import PedidoArchivos from '../../../componentes/pedidos/card/archivos/pedidoArchivos.jsx'
import PedidoPesos from '../../../componentes/pedidos/card/pesos/pedidoPesos.jsx'
import Botonera from '../../../componentesStilos/botonera/botonera.jsx';
import BotonFormulario from '../../../componentesStilos/botones/botonFormulario.jsx';
import AlertaFormulario from '../../../componentes/alertas/alertaFormulario/alertaFormulario.jsx'
import Cargando from '../../../componentes/cargando/cargando.jsx';
import PedidoLibroCardInterno from '../libroPedido/pedidoLibroCardInterno.jsx';
import PedidoLibroCard from '../libroPedido/PedidoLibroCard.jsx';
import AlertaEliminar from '../../../componentes/alertas/alertaEliminar/alertaEliminar.jsx'

function PedidoMostrar() {
  const { datos, setDatos } = useContext(contexto);
  const [librosSeleccionado, setLibrosSeleccionados] = useState([]);
  const [btn, setBtn] = useState('Retirar todo');
  const [isAlerta, setIsAlerta] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [alertaEliminar, setAlertaEliminar] = useState(false);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const librosPosibles = datos.pedidoActual?.librosPedidos.filter(libroPedido => libroPedido.estadoPedido.idEstadoPedido === 4);
    if (librosPosibles && librosPosibles.length <= 0) {
      setBtn(null);
    } else {
      if (librosSeleccionado.length > 0) {
        setBtn('Retirar selección');
      } else {
        setBtn('Retirar todo')
      }
    }
  }, [librosSeleccionado]);

  const handleSeleccion = (id, isSelected) => {
    setLibrosSeleccionados((prevSeleccion) => {
      if (isSelected) {
        return [...prevSeleccion, id];
      } else {
        return prevSeleccion.filter((itemId) => itemId !== id);
      }
    });
  };

  const handleAtras = () => {
    setDatos((prev) => ({ ...prev, pedidoActual: null }));
    navigate(-1)
  }

  const handleConfirmarRetirar = async () => {
    const estado = { idEstadoPedido: 5 }
    const librosSeleccionadoCompleto = datos.pedidoActual.librosPedidos.filter(pedido => librosSeleccionado.some(idSelec => idSelec === pedido.idLibroPedido));
    const dtoPedido = { estado: estado, librosPedidos: librosSeleccionadoCompleto }

    retirarPedido(datos.pedidoActual, dtoPedido, setError, setDatos );
    setLibrosSeleccionados([])
    setIsAlerta(false);

  };

  const handleRetirar = () => {
    if (librosSeleccionado.length <= 0) {
      const nuevaSeleccion = datos.pedidoActual.librosPedidos.reduce((result, pedido) => {
        if (pedido.estadoPedido.idEstadoPedido === 4) {
          result.push(pedido.idLibroPedido);
        }
        return result;
      }, []);
      setLibrosSeleccionados(nuevaSeleccion);
    }
    setIsAlerta(true);
  }

  const handleEliminar = async () => {
    setCargando(true)
    try{
      const eliminar = await eliminarPedido(datos.pedidoActual, setError);
      if (eliminar) {
        setCargando(false);
        navigate(-1);
        setAlertaEliminar(false)
      }
    } catch (err) {
      setError(err);
    }
  }

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
              className='btn-add'
            ><img src={LeftArrow} alt="Atras" /></li>
            <li 
              title='Editar pedido'
              className='btn-add'
            ><img src={Editar} alt="Editar" /></li>
             <li 
              title='Eliminar pedido'
              className='btn-add'
              onClick={()=>setAlertaEliminar(true)}
            ><img src={Eliminar} alt="Eliminar" /></li>
          </>
        }
      />
      {datos.pedidoActual ? (
        <>
          <div className='pedido'>
            <ClienteCabecera cliente={datos.pedidoActual.cliente} />
            <hr className='linea' />
            <PedidoFecha pedido={datos.pedidoActual} />
            <hr className='linea' />
            <PedidoArchivos pedido={datos.pedidoActual} />
            <div className='pedido-libros'>
              {datos.pedidoActual.librosPedidos?.map((libro, index) => (
                <PedidoLibroCard
                pedidoLibro={libro}
                key={`pedido-libro-${libro.idLibroPedido}`}
                seleccion={handleSeleccion}
                librosSeleccionado={librosSeleccionado}
                />
              ))}
            </div>
            <hr className='linea' />
            <PedidoPesos pedido={datos.pedidoActual} />

            <Botonera 
              children={
                <>
                <BotonFormulario 
                  textBtn={<img src={LeftArrow} alt='Atras' />}
                  onClick={handleAtras}
                />
                {btn ? (
                <BotonFormulario 
                  textBtn={btn}
                  onClick={handleRetirar}
                />
                ) : (
                  <BotonFormulario 
                    textBtn={'Nada para retirar'}
                  />  
                )}
                </>
              }
            />

          </div>

          <AlertaFormulario
            isAlerta={isAlerta}
            setIsAlerta={setIsAlerta}
            children={
              <>
                <h6>¿Seguro de retirar los siguientes pedidos?</h6>
                <div className='pedido-libros'>
                  <>
                    {datos.pedidoActual.librosPedidos?.map((libro, index) => (
                      librosSeleccionado.includes(libro.idLibroPedido) && (
                        <PedidoLibroCardInterno
                          pedidoLibro={libro}
                          key={`pedido-libro-${libro.idLibroPedido}`}
                          estadoClas={'terminado'}
                        />
                      )
                    ))}
                  </>
                  <Botonera 
                    children={
                      <>
                      <BotonFormulario 
                       textBtn={<img src={LeftArrow} alt='Atras' />}
                        onClick={() => { setIsAlerta(false) }}
                      />
                      <BotonFormulario 
                        textBtn={'Retirar'}
                        onClick={handleConfirmarRetirar}
                      />
                      </>
                    }
                  />
                </div>
              </>
            }
          />
          <AlertaFormulario 
            isAlerta={alertaEliminar}
            setIsAlerta={setAlertaEliminar}
            children={
              <AlertaEliminar 
                setEliminar={setAlertaEliminar}
                children={<h6>{'¿Seguro de que quiere eliminar el pedido de la lista?'}</h6>}
                handleEliminar={handleEliminar}
                error={error}
              />
            }
          />          
        </>
      ) : (
        <Cargando />
      )}
    </>
  )
}
export default PedidoMostrar;