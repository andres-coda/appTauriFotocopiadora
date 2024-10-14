import { useEffect, useRef, useState } from "react";
import './mostrarEscuela.css'
import Dire from '../../../assets/direccion.svg'
import Cel from '../../../assets/phone.svg'
import Email from '../../../assets/email.svg'
import BotonEditar from "../../../componentesStilos/botones/botonEditar";
import MostrarCurso from "./mostrarCurso";
import AlertaFormulario from "../../../componentes/alertas/alertaFormulario/alertaFormulario";
import CargarEscuela from "../cargar/cargarEscuela";
import CargarCurso from "../cargar/cargarCurso";
import Modal from "../../../componentes/modal/modal";
import { useModalContext } from "../../../contexto/modalContexto";

function MostrarEscuelaInterno({ esc, setEscAEditar }) {
  const {setEstadoModal} = useModalContext()
  const [btnMas, setBtnMas] = useState('Ver más');
  const [mostrarBoton, setMostrarBoton] = useState(false);
  const [clase, setClase] = useState('esc-desactivo');
  const [agregarCurso, setAgregarCurso] = useState(false);
  const descrRef = useRef(null);

  const handleCurso = (curso) => {
    console.log(curso);

  }

  useEffect(() => {
    const elemento = descrRef.current;
    if (elemento && elemento.scrollHeight > elemento.clientHeight) {
      setMostrarBoton(true);
    } else {
      setMostrarBoton(false);
    }
  }, [esc]);

  const handleMore = () => {
    if (clase == 'esc-desactivo') {
      setClase('esc-activo');
      setBtnMas('Ver menos');
    } else {
      setClase('esc-desactivo');
      setBtnMas('Ver más');
    }
  }

  return (
    <>
      <div className={`lista-escuelas ${clase}`} ref={descrRef}>
        <BotonEditar 
          onClick={() =>setEscAEditar(esc)}
          titulo={'Editar escuela'}
        />
        <h5>{esc.nombre}</h5>
        <h6><img src={Dire} alt="Direccion" /> {esc.direccion}</h6>
        <h6><img src={Cel} alt="Celular" /> {esc.numero}</h6>
        <h6><img src={Email} alt="Email" /> {esc.email}</h6>
        {esc.cursos?.map((curso, ind) => (
          <MostrarCurso key={`curso-${ind}`} curso={curso} handleCurso={handleCurso} eliminar={true}/>
        ))}

        <Modal children={ <CargarCurso escuela={esc} /> } modal={agregarCurso} setModal={setAgregarCurso}/>
        <button className='verMas' onClick={() => { setEstadoModal(true), setAgregarCurso(true)}}>Agregar curso</button>
      </div>
      {mostrarBoton && <button onClick={handleMore} className='verMas'>{btnMas}</button>}
    </>
  )
}

export default MostrarEscuelaInterno;