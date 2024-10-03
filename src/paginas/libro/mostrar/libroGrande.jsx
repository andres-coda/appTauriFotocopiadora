import React, { useContext, useState } from 'react';
import '../card/libroSuperCard.css';
import { contexto } from '../../../contexto/contexto';
import { useNavigate } from 'react-router-dom';
import MiniNav from '../../../componentes/miniHeder/miniNav';
import LeftArrow from '../../../assets/arrowLeft.svg'
import Editar from '../../../assets/edit.svg'
import Eliminar from '../../../assets/deleted.svg'
import LibroSuperCard from '../card/libroSuperCard';
import LibroEstadoCard from '../card/libroEstadoCard'
import LibroCargar from '../cargar/libroCargar'
import AlertaFormulario from '../../../componentes/alertas/alertaFormulario/alertaFormulario';
import AlertaEliminar from '../../../componentes/alertas/alertaEliminar/alertaEliminar';
import Cargando from '../../../componentes/cargando/cargando';
import { eliminarLibro } from '../../../servicios/libro.service';

function LibroGrande() {
  const { datos, setDatos} = useContext(contexto);
  const navigate = useNavigate();
  const [alertaEditar, setAlertaEditar] = useState(false);
  const [alertaEliminar, setAlertaEliminar] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [error, setError ]=useState('');

  const handleEditar= ()=>{
    const libroAEditar=datos.libroActual;
    setDatos((prev) => ({ ...prev, libroAeditar: libroAEditar }))
    setAlertaEditar(true);
  }

  const handleEliminar= async ()=>{
    setCargando(true);
    await eliminarLibro(datos.libroActual.idLibro,setError);
    if (!error) {
      setCargando(false)
      setAlertaEliminar(false);
      setDatos((prev)=>({...prev, libroActual:null}))
    }
  }

  if (!datos.libroActual) return null;

  if (cargando) return (
    <Cargando />
  )

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
              onClick={()=> setAlertaEliminar(true)}
            ><img src={Eliminar} alt='Eliminar libro' /></li>
          </>
        }
      />
        <LibroSuperCard libro={datos.libroActual}/>
        <div className={`superCard-libro`}>
          {datos.libroActual.stock
            ?.sort((a,b)=>a.estado.idEstadoPedido-b.estado.idEstadoPedido)
            .map((stock, index) => (
            <LibroEstadoCard key={`stock-${index}`} stock={stock} />
          ))}
        </div>
        <AlertaFormulario
          isAlerta={alertaEditar}
          setIsAlerta={setAlertaEditar}
          children={
            <LibroCargar />
        }
      />
      <AlertaFormulario
        isAlerta={alertaEliminar}
        setIsAlerta={setAlertaEliminar}
        children={
          <AlertaEliminar 
            titulo={`¿Seguro que quiere eliminar el libro ${datos.libroActual.nombre}?`}
            setEliminar={setAlertaEliminar}
            handleEliminar={handleEliminar}
            error={error}
          />
        }
      />
    </>
  )
}
export default LibroGrande;