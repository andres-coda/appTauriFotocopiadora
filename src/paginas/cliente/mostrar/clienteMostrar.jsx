import MiniNav from '../../../componentes/miniHeder/miniNav';
import './clienteMostrar.css'
import LeftArrow from "../../../assets/arrowLeft.svg"
import Nuevo from "../../../assets/nuevo.svg"
import Cargando from '../../../componentes/cargando/cargando';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { contexto } from '../../../contexto/contexto';
import ClienteBuscar from '../buscar/clienteBuscar'
import ClienteCardDatos from '../card/clienteCardDatos'
import { rutasGenerales } from '../../../rutas/rutas';

function ClienteMostrar() {
  const { datos } = useContext(contexto);
  const navigate= useNavigate()
  const [filterCliente, setFilterCliente] = useState(() => (cliente) => true);

  const handleAtras=()=>{
    navigate(-1);
  }

  const handleNuevoCliente = () => {
    navigate(rutasGenerales.CLIENTENUEVO);
  };

  return (
    <>
      <MiniNav
        children={
          <>
            <li
              onClick={handleAtras}
              title='Atras'
              className='btn-add'
            ><img src={LeftArrow} alt="Atras" /></li>
            <li
              title='Cliente'
              onClick={handleNuevoCliente}
              className='btn-add'
            ><img src={Nuevo} alt="Nuevo cliente" /></li>
          </>
        }
      />
      <ClienteBuscar
        setFilterCliente={setFilterCliente}
      />

      <ul className='listaClientes'>
        {datos.clientes
          ? datos.clientes
            .filter(filterCliente) // Filtrar los clientes según el criterio
            .map((cliente) => (
              <li key={`cliente-${cliente.idPersona}`}>
                <ClienteCardDatos cliente={cliente} />
              </li>
            )
            ) : (
            <Cargando />
          )}
      </ul>
    </>
  )
}

export default ClienteMostrar;