import { useState } from "react";
import { useGlobalContext } from "../../contexto/contexto";
import { useModalContext } from "../../contexto/modalContexto";

function useFiltroOrdenar(){
    const { datos, setDatos, filtros, setFiltros } = useGlobalContext();
    const {setEstadoModal} = useModalContext()
    const [filtroActivo, setFiltroActivo] = useState('tomado');

    const actualizarFiltro=(newPedido, newFiltroNombre, filtroOpuesto) => {
        const newLista = {...datos.listaPedidoLibros, pedidoLibros:newPedido}
        setDatos((prev)=>({...prev, listaPedidoLibros:newLista}));
        const newFiltro = filtros.filtro.filter(filtro=> filtro.filtro!= newFiltroNombre.filtro && filtro.filtro != filtroOpuesto);
        setFiltros((prev)=>({
            ...prev,
            filtro: [newFiltroNombre, ...newFiltro]
        }));
        setEstadoModal(false);
    }
    
          // Orden Ascendente
  const ordenarPorFechaTomadoAsc = () => {
    const newPedido=  datos.listaPedidoLibros.pedidoLibros.sort((a, b) => new Date(a.pedido.fechaTomado) - new Date(b.pedido.fechaTomado));
    const newFiltroNombre = {
        filtro: 'tomado antiguo',
        tipo: 'orden'
    }
    actualizarFiltro(newPedido, newFiltroNombre,'tomado reciente');
  }
  
  // Orden Descendente
  const ordenarPorFechaTomadoDesc=()=> {
    const newPedido= datos.listaPedidoLibros.pedidoLibros.sort((a, b) => new Date(b.pedido.fechaTomado) - new Date(a.pedido.fechaTomado));
    const newFiltroNombre = {
        filtro: 'tomado reciente',
        tipo: 'orden'
    }
    actualizarFiltro(newPedido, newFiltroNombre, 'tomado antiguo');
  }
  
  // Orden Ascendente
  const ordenarPorFechaEntregaAsc = () => {
    const newPedido = datos.listaPedidoLibros.pedidoLibros.sort((a, b) => new Date(a.pedido.fechaEntrega) - new Date(b.pedido.fechaEntrega));
    const newFiltroNombre = {
      filtro: 'entrega cercana',
      tipo: 'orden'
    }
    actualizarFiltro(newPedido, newFiltroNombre, 'entrega lejana');
  }
  
  // Orden Descendente
  const ordenarPorFechaEntregaDesc = () => {
    const newPedido = datos.listaPedidoLibros.pedidoLibros.sort((a, b) => new Date(b.pedido.fechaEntrega) - new Date(a.pedido.fechaEntrega));
    const newFiltroNombre = {
      filtro: 'entrega lejana',
      tipo: 'orden'
    }
    actualizarFiltro(newPedido, newFiltroNombre, 'entrega cercana');
  }
  
  // Orden Ascendente (A-Z)
  const ordenarPorNombreLibroAsc = () => {
    const newPedido = datos.listaPedidoLibros.pedidoLibros.sort((a, b) => a.libro.nombre.localeCompare(b.libro.nombre));
    const newFiltroNombre = {
      filtro: 'libro A-Z',
      tipo: 'orden'
    }
    actualizarFiltro(newPedido, newFiltroNombre, 'libro Z-A');
  }
  
  // Orden Descendente (Z-A)
  const ordenarPorNombreLibroDesc = () => {
    const newPedido = datos.listaPedidoLibros.pedidoLibros.sort((a, b) => b.libro.nombre.localeCompare(a.libro.nombre));
    const newFiltroNombre = {
      filtro: 'libro Z-A',
      tipo: 'orden'
    }
    actualizarFiltro(newPedido, newFiltroNombre, 'libro A-Z');
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

  return {
    ordenarPorFechaTomadoAsc, ordenarPorFechaTomadoDesc, ordenarPorFechaEntregaAsc, 
    ordenarPorFechaEntregaDesc, ordenarPorNombreLibroAsc, ordenarPorNombreLibroDesc,
    handleSelectEntrega, handleSelectTomado, handleSelectLibro, 
    filtroActivo,
  }

}

export default useFiltroOrdenar;