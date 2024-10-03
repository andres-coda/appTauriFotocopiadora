import './clienteCardIndividual.css'
import { contadorEstadoPedido, estadoPedido } from '../../../funciones/utilidades.function';
import ClienteCabecera from '../../../componentes/cliente/clienteCabecera/clienteCabecera';

function ClienteCardIndividual({cliente, setFilterPedido}){

    const handleFilter = (newCondicion) => {
      setFilterPedido(() => (pedido) => {
        const newPedido = estadoPedido(pedido);
        return newCondicion.includes(newPedido.estado.idEstadoPedido);
      });
    };
  
    return (
      <div className='cliente-datos-individual'>
        <div className='cliente-datos-interno-individual'>
          <ClienteCabecera cliente={cliente} />
          <div className='cliente-estados-individual'>
            <p className='pedido-pendiente' onClick={()=> handleFilter([1,2,3])}  title='Filtrar pedidos'>Pendiente: {contadorEstadoPedido(cliente.pedidos, [1, 2, 3])}</p>
            <p className='pedido-paraRetirar'onClick={()=> handleFilter([4])} title='Filtrar pedidos'>Para retirar: {contadorEstadoPedido(cliente.pedidos, [4])}</p>
            <p className='pedido-retirado'onClick={()=> handleFilter([5])} title='Filtrar pedidos'>Retirados: {contadorEstadoPedido(cliente.pedidos, [5])}</p>
          </div>
          </div>
      </div>
    )
}

export default ClienteCardIndividual;