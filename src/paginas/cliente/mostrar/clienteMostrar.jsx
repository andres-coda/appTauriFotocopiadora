import MiniNav from '../../../componentes/miniHeder/miniNav';
import './clienteMostrar.css'
import LeftArrow from "../../../assets/arrowLeft.svg"
import Nuevo from "../../../assets/nuevo.svg"
import Cargando from '../../../componentes/cargando/cargando';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { contexto, useGlobalContext } from '../../../contexto/contexto';
import ClienteBuscar from '../buscar/clienteBuscar'
import ClienteCardDatos from '../card/clienteCardDatos'
import { rutasGenerales } from '../../../rutas/rutas';
import useClienteMostrar from '../../../hooks/cliente/mostrar/useClienteMostrar';

function ClienteMostrar() {
  const { datos} = useGlobalContext();
  const { loading, errorFetch, handleAtras, handleNuevoCliente} = useClienteMostrar();
  const [filterCliente, setFilterCliente] = useState(() => (cliente) => true);

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
      {datos.clientes && datos.clientes.length > 0 ? (
        <ul className='listaClientes'>
          { datos.clientes
            .filter(filterCliente) // Filtrar los clientes según el criterio
            .map((cliente) => (
              <li key={`cliente-${cliente.idPersona}`}>
                <ClienteCardDatos cliente={cliente} />
              </li>
          ))}
        </ul>
      ) : (
        <Cargando
          text={
            <>
              {loading
                ? 'Cargando lista de clientes'
                : errorFetch
                  ? `Error al intentar cargar la lista de clientes: ${errorFetch}`
                  : 'Lista de clientes cargada'
              }
            </>
          } />)
      }
    </>
  )
}

export default ClienteMostrar;