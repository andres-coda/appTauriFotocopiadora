import { useContext } from "react";
import { contexto } from "../../../contexto/contexto";
import { pedidoInicial } from "./pedidoFormDefault";
import { useNavigate } from "react-router-dom";
import { rutasGenerales } from "../../../rutas/rutas";

function usePedidoUtilidades() {
  const { pedidos, setPedidos, currentPedidoIndex, setCurrentPedidoIndex } = useContext(contexto);
  const navigate=useNavigate();


  const nuevoPedido = (e) => {
    e.preventDefault();
    const newPedido = { ...pedidoInicial };
    const newPedidos = [...pedidos];
    newPedidos.push(newPedido)
    setPedidos(newPedidos);
    const newIndex = newPedidos.length - 1;
    setCurrentPedidoIndex(newIndex);
    navigate(rutasGenerales.PEDIDONUEVO);
  }

  const pedidoSiguiente = () => {
    if (currentPedidoIndex < pedidos.length - 1) {
      setCurrentPedidoIndex(currentPedidoIndex + 1);
    } else {
      setCurrentPedidoIndex(0);
    }
  };

  const pedidoAnterior = () => {
    if (currentPedidoIndex > 0) {
      setCurrentPedidoIndex(currentPedidoIndex - 1);
    } else {
      const newIndex = pedidos.length - 1;
      setCurrentPedidoIndex(newIndex);
    }
  };

  const eliminarPedido = () => {
    const newPedidos = pedidos.filter((pedido, index) => index !== currentPedidoIndex);
    if (newPedidos.length === 0) {
      newPedidos.push(pedidoInicial);
    }
    setPedidos(newPedidos);
    const newIndex = newPedidos.length - 1;
    setCurrentPedidoIndex(newIndex);
  };

  return { nuevoPedido, pedidoSiguiente, pedidoAnterior, eliminarPedido }
}

export default usePedidoUtilidades;