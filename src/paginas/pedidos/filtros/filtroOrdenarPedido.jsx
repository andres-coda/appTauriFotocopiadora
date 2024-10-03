import { useContext, useState } from "react";
import { contexto } from "../../../contexto/contexto";
import FiltroEstilo from "../../../componentesStilos/filtro/filtroEstilo";
import Circulo from '../../../assets/circulo.svg'


function FiltroOrdenarPedido({setAlerta, filtros, setFiltros}) {
  const { datos, setDatos } = useContext(contexto);
  const [filtroActivo, setFiltroActivo] = useState('entrega');
  
        // Orden Ascendente
const ordenarPorFechaTomadoAsc = () => {
  const newPedido=  datos.listaPedidoLibros.pedidoLibros.sort((a, b) => new Date(a.pedido.fechaTomado) - new Date(b.pedido.fechaTomado));
  const newLista = {...datos.listaPedidoLibros, pedidoLibros:newPedido}
  setDatos((prev)=>({...prev, listaPedidoLibros:newLista}));
  const newFiltro = filtros.filter(filtro=> filtro!= 'tomado antiguo');
  setFiltros(['tomado reciente',...newFiltro]);
  setAlerta(false);
}

// Orden Descendente
const ordenarPorFechaTomadoDesc=()=> {
  const newPedido= datos.listaPedidoLibros.pedidoLibros.sort((a, b) => new Date(b.pedido.fechaTomado) - new Date(a.pedido.fechaTomado));
  const newLista = {...datos.listaPedidoLibros, pedidoLibros:newPedido}
  setDatos((prev)=>({...prev, listaPedidoLibros:newLista}));
  const newFiltro = filtros.filter(filtro=> filtro!= 'tomado reciente');
  setFiltros(['tomado antiguo',...newFiltro]);
  setAlerta(false);
}

// Orden Ascendente
const ordenarPorFechaEntregaAsc = () => {
  const newPedido = datos.listaPedidoLibros.pedidoLibros.sort((a, b) => new Date(a.pedido.fechaEntrega) - new Date(b.pedido.fechaEntrega));
  const newLista = {...datos.listaPedidoLibros, pedidoLibros:newPedido}
  setDatos((prev)=>({...prev, listaPedidoLibros:newLista}));
  const newFiltro = filtros.filter(filtro=> filtro!= 'entrega lejana');
  setFiltros(['entrega cercana',...newFiltro]);
  setAlerta(false)
}

// Orden Descendente
const ordenarPorFechaEntregaDesc = () => {
  const newPedido = datos.listaPedidoLibros.pedidoLibros.sort((a, b) => new Date(b.pedido.fechaEntrega) - new Date(a.pedido.fechaEntrega));
  const newLista = {...datos.listaPedidoLibros, pedidoLibros:newPedido}
  setDatos((prev)=>({...prev, listaPedidoLibros:newLista}));
  const newFiltro = filtros.filter(filtro=> filtro!= 'entrega cercana');
  setFiltros(['entrega lejana',...newFiltro]);
  setAlerta(false)
}

// Orden Ascendente (A-Z)
const ordenarPorNombreLibroAsc = () => {
  const newPedido = datos.listaPedidoLibros.pedidoLibros.sort((a, b) => a.libro.nombre.localeCompare(b.libro.nombre));
  const newLista = {...datos.listaPedidoLibros, pedidoLibros:newPedido}
  setDatos((prev)=>({...prev, listaPedidoLibros:newLista}));
  const newFiltro = filtros.filter(filtro=> filtro!= 'libro Z-A');
  setFiltros(['libro A-Z',...newFiltro]);
  setAlerta(false);
}

// Orden Descendente (Z-A)
const ordenarPorNombreLibroDesc = () => {
  const newPedido = datos.listaPedidoLibros.pedidoLibros.sort((a, b) => b.libro.nombre.localeCompare(a.libro.nombre));
  const newLista = {...datos.listaPedidoLibros, pedidoLibros:newPedido}
  setDatos((prev)=>({...prev, listaPedidoLibros:newLista}));
  const newFiltro = filtros.filter(filtro=> filtro!= 'libro A-Z');
  setFiltros(['libro Z-A',...newFiltro]);
  setAlerta(false);
}

  const handleSelectEntrega = () =>{
    setFiltroActivo('entrega')
  }

  const handleSelectTomado = () =>{
    setFiltroActivo('tomado')
  }

  const handleSelectLibro = () =>{
    setFiltroActivo('libro')
  }

  if (!datos.listaPedidoLibros || datos.listaPedidoLibros.pedidoLibros ===0) {
    return (
      <div className='filtro'>
        <p>No hay elementos para ordenar</p>
      </div>
    )
  }

  return (
      <FiltroEstilo 
        btn = {false}
        titulo={'Ordenar'}
        childrenDerecha={
          <>
            <li onClick={handleSelectEntrega} className={filtroActivo === 'entrega' ? 'filtro-activo' : ''}>Entrega</li>
            <li onClick={handleSelectTomado} className={filtroActivo === 'tomado' ? 'filtro-activo' : ''}>Tomado</li>
            <li onClick={handleSelectLibro} className={filtroActivo === 'libro' ? 'filtro-activo' : ''}>Libro</li>
          </>
        }
        childrenIzquierda={
          <>
            <ul>
              {filtroActivo!='libro' 
              ? (
                <>
                  <li onClick={filtroActivo==='entrega'? ordenarPorFechaEntregaAsc  : ordenarPorFechaTomadoDesc}><img src={Circulo} alt="Estado" />{filtroActivo==='entrega'? 'Más cercana': 'Más reciente'}</li>
                  <li onClick={filtroActivo==='entrega'? ordenarPorFechaEntregaDesc : ordenarPorFechaTomadoAsc}><img src={Circulo} alt="Estado" />{filtroActivo==='entrega'? 'Más lejana': 'Más antiguo'}</li>
                </>
              ) : (
                <>
                  <li onClick={ordenarPorNombreLibroAsc}><img src={Circulo} alt="Estado" />{'Libro  A-->Z'}</li>
                  <li onClick={ordenarPorNombreLibroDesc}><img src={Circulo} alt="Estado" />{'Libro  Z-->A'}</li>
                </>
              )}
            </ul>
          </>
        }
      />
  )
}
export default FiltroOrdenarPedido;