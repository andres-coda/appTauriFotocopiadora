import { useEffect, useRef } from "react";
import BotonCerrar from "../../componentesStilos/botones/botonCerrar";
import { useModalContext } from "../../contexto/modalContexto";
import { createPortal } from "react-dom";
import './modal.css'

const eventListener = 'keydown'

function Modal({ children, modal, setModal }) {
  const modalRef = useRef(null)
  const {  estadoModal, setEstadoModal } = useModalContext();

  const cerrarModal = () => {
    setEstadoModal(false);
  }

  const handleClickDentroModal = (e) => {
    e.stopPropagation()
  }

  const modalRoot = document.getElementById('modal');

  useEffect(()=>{
    if(!estadoModal && modal) {
      setModal(false);
    }
  },[estadoModal])

  useEffect(()=>{
    const handleEsc =(e, KeyboardEvent) =>{
      if(e.key === 'Escape') {
        setEstadoModal(false)
      }
    }
    if(estadoModal) {
      document.addEventListener(eventListener, handleEsc);
    }

    return () =>{
      document.removeEventListener(eventListener, handleEsc);
    }
  },[estadoModal, setEstadoModal])

  if (!estadoModal || !modalRoot || modal === false){
    return null;
  }

  return createPortal(
    <div className="modal-fondo" onClick={cerrarModal}>
      <div className="modal-frente" ref={modalRef} onClick={handleClickDentroModal}>
        {children}
        <BotonCerrar onClick={cerrarModal} />
      </div>
    </div>, modalRoot
  )
}

export default Modal;