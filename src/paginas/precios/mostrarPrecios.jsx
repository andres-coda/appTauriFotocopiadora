import './mostrarPrecios.css';
import LeftArrow from '../../assets/arrowLeft.svg'
import Nuevo from  '../../assets/add.svg';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { contexto } from '../../contexto/contexto';
import MiniNav from '../../componentes/miniHeder/miniNav.jsx';
import AlertaFormulario from '../../componentes/alertas/alertaFormulario/alertaFormulario.jsx';
import CargarPrecio from './cargarPrecio.jsx';
import EditarPrecio from './precioEditar.jsx'

function MostrarPrecios() {
  const { datos } = useContext(contexto);
  const [isAlerta, setIsAlerta] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <MiniNav
        children={
          <>
            <li onClick={() => navigate(-1)}
              title='Atras'
              className='btn-add'
            ><img src={LeftArrow} alt='Atras' /></li>
            <li 
              onClick={()=>setIsAlerta(true)}
              title='Nuevo precio'
              className='btn-add'
            ><img src={Nuevo} alt='Nuevo precio' /></li>
          </>
        }
      />
       <h2 className='formulario-h2'>Lista de precios</h2>
      {datos.precios?.map((precio, index) => (
        <EditarPrecio key={`precios-${index}`} precio={precio} />
      ))}
      <AlertaFormulario 
        isAlerta={isAlerta}
        setIsAlerta={setIsAlerta}
        children={
          <CargarPrecio setIsAlerta={setIsAlerta} />
        }
      />
    </>
  )
}

export default MostrarPrecios;