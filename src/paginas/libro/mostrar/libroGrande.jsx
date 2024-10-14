import React, { useContext, useEffect, useState } from 'react';
import './libroMostrar.css';
import { contexto } from '../../../contexto/contexto';
import { useNavigate } from 'react-router-dom';
import MiniNav from '../../../componentes/miniHeder/miniNav';
import LeftArrow from '../../../assets/arrowLeft.svg'
import Editar from '../../../assets/edit.svg'
import Eliminar from '../../../assets/deleted.svg'
import LibroSuperCard from '../card/libroSuperCard';
import LibroEstadoCard from '../card/libroEstadoCard'
import LibroCargar from '../cargar/libroCargar'
import AlertaEliminar from '../../../componentes/alertas/alertaEliminar/alertaEliminar';
import { eliminarLibro } from '../../../servicios/libro.service';
import Modal from '../../../componentes/modal/modal';
import { useModalContext } from '../../../contexto/modalContexto';

function LibroGrande() {
  const { datos, setDatos } = useContext(contexto);
  const { estadoModal, setEstadoModal } = useModalContext()
  const navigate = useNavigate();
  const [alertaEditar, setAlertaEditar] = useState(false);
  const [alertaEliminar, setAlertaEliminar] = useState(false);
  const [error, setError] = useState('');

  const handleEditar = () => {
    const libroAEditar = datos.libroActual;
    setDatos((prev) => ({ ...prev, libroAEditar: libroAEditar }))
    setAlertaEditar(true);
    setEstadoModal(true);
  }

  useEffect(() => {
    if (!estadoModal) {
      setAlertaEditar(false);
      setAlertaEliminar(false);
    }
  }, [estadoModal])

  const handleEliminar = async () => {
    await eliminarLibro(datos.libroActual.idLibro, setError);
    if (!error) {
      setEstadoModal(false);
      setDatos((prev) => ({ ...prev, libroActual: null }))
    }
  }

  if (!datos.libroActual) return null;

  return (
    <>
      <MiniNav
        children={
          <>
            <li
              onClick={() => {
                setDatos((prev) => ({ ...prev, libroActual: null })),
                  navigate(-1)
              }}
              title='Atras'
              className='btn-add'
            ><img src={LeftArrow} alt='Atras' /></li>
            <li
              className='btn-add'
              title='Editar libro'
              onClick={handleEditar}
            ><img src={Editar} alt='Editar libro' /></li>
            <li
              className='btn-add'
              title='Eliminar libro'
              onClick={() => { setAlertaEliminar(true), setEstadoModal(true) }}
            ><img src={Eliminar} alt='Eliminar libro' /></li>
          </>
        }
      />
      <LibroSuperCard libro={datos.libroActual} />
      <div className={`libro-pedidos-estados`}>
        {datos.libroActual.stock
          ?.sort((a, b) => a.estado.idEstadoPedido - b.estado.idEstadoPedido)
          .map((stock, index) => (
            <LibroEstadoCard key={`stock-${index}`} stock={stock} />
          ))}
      </div>
      {
      alertaEliminar
        ? (
          <Modal
            children={
              <AlertaEliminar
                children={<h6>{`¿Seguro que quiere eliminar el libro ${datos.libroActual.nombre}?`}</h6>}
                setEliminar={setAlertaEliminar}
                handleEliminar={handleEliminar}
                error={error}
              />
            }
          />
        ) 
        : null
      }
      { alertaEditar  ? ( <Modal children={ <LibroCargar /> } /> ) : (null) }
    </>
  )
}
export default LibroGrande;