import { useContext, useState } from 'react';
import './mostrarEscuela.css'
import { contexto } from '../../../contexto/contexto';
import { useNavigate } from 'react-router-dom';
import MiniNav from '../../../componentes/miniHeder/miniNav';
import LeftArrow from '../../../assets/arrowLeft.svg'
import Add from '../../../assets/add.svg'
import MostrarEscuelaInterno from './mostrarEscuelaInterno';
import AlertaFormulario from '../../../componentes/alertas/alertaFormulario/alertaFormulario';
import CargarEscuela from '../cargar/cargarEscuela';

function MostrarEscuela() {
  const [isAlerta, setIsAlerta] = useState(false);
  const [escAEditar, setEscAEditar] = useState(null);
  const { datos } = useContext(contexto);
  const navigate = useNavigate();
 

  return (
    <>
      <MiniNav
        children={
          <>
            <li onClick={(e) => navigate(-1)}
              title='Atras'
              className='btn-add'
            ><img src={LeftArrow} alt='Atras' /></li>
            <li 
              onClick={() => { setIsAlerta(true), setEscAEditar(null) }}
              className='btn-add'
              title='Nueva escuela'
            ><img src={Add} alt='Nueva escuela' /></li>
          </>
        }
      />
      <h2 className='formulario-h2'>Lista de escuelas</h2>
      {datos.escuelas?.map((esc, index) => (    
        <MostrarEscuelaInterno esc={esc} key={`esc-${index}`} />
      ))}
      <AlertaFormulario
          isAlerta={isAlerta}
          setIsAlerta={setIsAlerta}
          children={<CargarEscuela setAlerta={setIsAlerta} escAEditar={escAEditar} />}
        />
    </>
  )
}

export default MostrarEscuela;