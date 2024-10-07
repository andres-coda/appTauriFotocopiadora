import { errorPedidoInicial } from "../../hooks/pedido/cargar/pedidoFormDefault";
import { isFiniteNumber } from "../utilidades.function";
import { validarCliente } from "./validarCliente";

export const validarPedido = (pc) => {
    const errorLocal = {...errorPedidoInicial};
    const errorCliente = validarCliente(pc.cliente);
    errorLocal.nombre=errorCliente.nombre;
    errorLocal.celular=errorCliente.celular;
    errorLocal.email=errorCliente.email;
    errorLocal.error=errorCliente.error;

    if (!pc.pedido.fechaEntrega) {
      errorLocal.fechaEntrega = 'El pedido debe tener fecha de entrega';
      errorLocal.error='Tiene errores en la solicitud';
    }
    if (!pc.pedido.importeTotal || !isFiniteNumber(Number(pc.pedido.importeTotal))) {
      errorLocal.importeTotal='El pedido debe tener importe total válido (en números)';
        errorLocal.error='Tiene errores en la solicitud';
    }
    if (!pc.pedido.sena || !isFiniteNumber(Number(pc.pedido.sena))) {
      errorLocal.sena= 'El pedido debe tener una seña válida (en números)';
        errorLocal.error='Tiene errores en la solicitud';
    }
    if (Number(pc.pedido.sena) > Number(pc.pedido.importeTotal)) {
      errorLocal.sena= 'La seña no puede ser mayor que el importe total';
        errorLocal.error='Tiene errores en la solicitud';
    }
    if (!pc.pedido.archivos || !isFiniteNumber(Number(pc.pedido.archivos))) {
      errorLocal.archivos= 'El pedido debe tener la cantidad de archivos (en números)';
        errorLocal.error='Tiene errores en la solicitud';
    }
    if (!pc.pedido.anillados || !isFiniteNumber(Number(pc.pedido.anillados))) {
      errorLocal.anillados= 'El pedido debe tener la cantidad de anillados (en números)';
        errorLocal.error='Tiene errores en la solicitud';
    }
    if (pc.librosPedido.length <= 0) {
      errorLocal.error = 'El pedido debe tener al menos un libro';
    }
    return errorLocal;
  };
