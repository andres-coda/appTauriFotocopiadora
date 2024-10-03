
export const estadoPedido = (pedido) => {
  const updatedPedido = { ...pedido };
  let estadoMenor = pedido.librosPedidos[0].estadoPedido;
  pedido.librosPedidos.map((lp) => {
    if (estadoMenor.idEstadoPedido > lp.estadoPedido.idEstadoPedido) {
      estadoMenor = lp.estadoPedido;
    }
  });
  updatedPedido.estado = estadoMenor;
  return updatedPedido;
}

export const contadorEstadoPedido = (pedidos, condiciones) => {
  if (!pedidos || !Array.isArray(pedidos)) {
    return 0; // Retorna 0 si no hay pedidos válidos
  }

  return pedidos.reduce((contador, pedido) => {
    const newPedido = estadoPedido(pedido);
    return condiciones.includes(newPedido.estado.idEstadoPedido) ? contador + 1 : contador;
  }, 0);
}

export const contadorEstadoPedidoStock = (stock) =>{
  const conteos = {
    pendiente: 0,
    listo: 0,
    terminado: 0,
  }
  stock.forEach((stock) => {
    switch (stock.estado.idEstadoPedido) {
      case 4:
        conteos.listo += stock.cantidad;
        break;
      case 5:
        conteos.terminado += stock.cantidad;
        break;
      default:
        conteos.pendiente += stock.cantidad;
        break;
    }
  });
  
  return conteos;
}

export const formatoFecha = (fecha) => {
  const date = new Date(fecha);
  const dia = date.getDate();
  const mes = date.getMonth() + 1;
  const año = date.getFullYear();
  return `${dia}-${mes}-${año}`;
}

export const obtenerAnioActual = () => {
  return new Date().getFullYear();
}

export const isFiniteNumber = (value) => !isNaN(parseFloat(value)) && isFinite(value);

export const caseClaseEstado = (setEstadoClas, datoId) =>{
  switch (datoId) {
    case 4: setEstadoClas((prev)=>`terminado`);
      break;
    case 3:
    case 2:
    case 1:
      setEstadoClas((prev)=>'pendiente');
      break;
    default: setEstadoClas((prev)=>`retirado`);
      break
  }
}

export const nuevoCaseClaseEstado = (datoId) =>{
  let clase = '';
  switch (datoId) {
    case 4: clase =`terminado`;
      break;
    case 3:
    case 2:
    case 1: clase ='pendiente';
      break;
    default: clase= `retirado`;
      break
  }
  return clase;
}

export const calcularPrecioAnillado = (pg, precios) => {
  const base = 100;
  const rango = 100;

  if (pg <= base) return precios[4];
  if (pg <= base + rango) return precios[5];
  if (pg <= base + rango * 2) return precios[6];
  if (pg <= base + rango * 3) return precios[7];
  return 0;
};

export const estimarPrecio = (esp, libro, cantidad, listaPrecios) => {
  // Obtener los IDs de las especificaciones
  const espIds = new Set(esp.map(item => item.idEspecificaciones));
  // Convertir precios a números
  const precios = listaPrecios.map(p => Number(p.importe));

  let precio = 0;
  let pg = libro.cantidadPg;
  let cantLibros = 1;
  let anillado = 0;

  // Ajustar el precio basado en las especificaciones
  if (espIds.has(6)) {
    pg = Math.ceil(pg / 2);
    precio = espIds.has(1) ? precios[1] * pg : (espIds.has(2) ? precios[3] * pg : precio);
  } else if (espIds.has(7)) {
    precio = espIds.has(1) ? precios[0] * pg : (espIds.has(2) ? precios[2] * pg : precio);
  }

  // Ajustar cantidad de libros y páginas por libro si pg es mayor a 400
  if (pg > 400) {
    cantLibros = Math.ceil(pg / 400);
    pg = Math.ceil(pg / cantLibros);
  }

  // Ajustar el precio de anillado
  if (espIds.has(3)) {
    anillado = calcularPrecioAnillado(pg, precios);
  }

  return (precio + anillado * cantLibros) * cantidad;
};
