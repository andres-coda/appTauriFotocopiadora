import './libroMostrar.css';
import { useGlobalContext } from '../../../contexto/contexto';
import { useNavigate } from 'react-router-dom';
import MiniNav from '../../../componentes/miniHeder/miniNav';
import LeftArrow from '../../../assets/arrowLeft.svg'
import Editar from '../../../assets/edit.svg'
import Eliminar from '../../../assets/deleted.svg'
import LibroSuperCard from '../card/libroSuperCard';
import LibroEstadoCard from '../card/libroEstadoCard'
import LibroCargar from '../cargar/libroCargar'
import AlertaEliminar from '../../../componentes/alertas/alertaEliminar/alertaEliminar';
import Modal from '../../../componentes/modal/modal';
import { useModalContext } from '../../../contexto/modalContexto';
import useLibroMostrar from '../../../hooks/libro/mostrar/useLibroMostrar';
import Cargando from '../../../componentes/cargando/cargando';

function LibroGrande() {
  const { datos, setDatos } = useGlobalContext();
  const { setEstadoModal } = useModalContext();
  const {
    alertaEditar, setAlertaEditar, alertaEliminar, setAlertaEliminar,
    handleEditar, handleEliminar,
    errorFetch, loading, solicitud, setSolicitud,
  } = useLibroMostrar()
  const navigate = useNavigate();

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
      {
        !datos.libroActual ? null : (
          <>
            <LibroSuperCard libro={datos.libroActual} />
            <div className={`libro-pedidos-estados`}>
              {datos.libroActual.stock
                ?.sort((a, b) => a.estado.idEstadoPedido - b.estado.idEstadoPedido)
                .map((stock, index) => (
                  <LibroEstadoCard key={`stock-${index}`} stock={stock} />
                ))}
            </div>
            <Modal
              children={
                <AlertaEliminar
                  children={<h6>{`¿Seguro que quiere eliminar el libro ${datos.libroActual.nombre}?`}</h6>}
                  setEliminar={setAlertaEliminar}
                  handleEliminar={handleEliminar}
                  error={errorFetch}
                />
              }
              modal={alertaEliminar} setModal={setAlertaEliminar}
            />
          </>
        )}
        <Modal children={<LibroCargar />} modal={alertaEditar} setModal={setAlertaEditar} />
            <Modal
              children={
                <Cargando
                  text={
                    <>
                      {loading
                        ? 'Eliminando libro ...'
                        : errorFetch
                          ? `Error al intentar eliminar el libro: ${errorFetch}`
                          : 'Libro eliminado con éxito'
                      }
                    </>
                  } />
              }
              modal={solicitud} setModal={setSolicitud} />
    </>
  )
}
export default LibroGrande;