import { useContext } from 'react';
import './clienteCardParcial.css'
import { contexto } from '../../../contexto/contexto';
import ClienteCardDatos from './clienteCardDatos';
import PedidoCard from '../../../componentes/pedidos/card/pedidoCard'

function ClienteCardParcial() {
  const { datos } = useContext(contexto);
  if (!datos.clienteActual) return null;

  return (
    <>
      <h2 className='formulario-h2'>Seleccionar pedido</h2>
      <hr className='linea' />
      <div className="cliente-datos-grande">
        <ClienteCardDatos
          cliente={datos.clienteActual}
        />
      </div>
      <hr className='linea' />
      <div className='clientesPedidosCaja'>
        {datos.clienteActual.pedidos?.map((pedido) => (
          <PedidoCard pedido={pedido} key={`pedido-${pedido.idPedido}`} />
        ))}
      </div>
    </>
  )
}

export default ClienteCardParcial;