import { useEffect, useState } from 'react';
import './pedidoLibroCard.css'
import { nuevoCaseClaseEstado } from '../../../funciones/utilidades.function';
import PedidoLibroCardInterno from './pedidoLibroCardInterno';

function PedidoLibroCard({ pedidoLibro, seleccion, librosSeleccionado, quitarLibro }) {
  const [estadoClas, setEstadoClas] = useState(`pendiente`);

  useEffect(() => {
    const newClase = nuevoCaseClaseEstado(pedidoLibro.estadoPedido.idEstadoPedido);
    setEstadoClas(newClase);
  }, [pedidoLibro.estadoPedido.idEstadoPedido])

  const handleSelectionChange = (e) => {
    seleccion(pedidoLibro.idLibroPedido, e.target.checked);
  };

  return (
    <div className='libro-pedido-radio'>
      {estadoClas == 'terminado' ? <input type="checkbox" className={`input-${estadoClas}`} onChange={handleSelectionChange} checked={librosSeleccionado.includes(pedidoLibro.idLibroPedido)} /> : null }
      <PedidoLibroCardInterno estadoClas={estadoClas} pedidoLibro={pedidoLibro} quitarLibro={quitarLibro}/>
    </div>
  )
}
export default PedidoLibroCard;