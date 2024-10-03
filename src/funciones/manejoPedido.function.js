export const pedidoInicial = {
    archivos: "",
    anillados: "",
    fechaEntrega: "",
    importeTotal: "",
    sena: "",
    librosPedido: [],
    cliente: {
      nombre: "",
      celular: "",
      email: ""
    },
    especificaciones: [],
    pedidoLibro: {
      cantidad: 1,
      especificaciones: [],
      extras: "",
      libro: {}
    },
    error: {
      celular: '',
      fechaEntrega: '',
      importeTotal: '',
      sena: '',
      archivos: '',
      anillados: '',
      error: ''
    }
  }
  
  export const nuevoPedidoCreacion = (setCurrentIndex, setPedidos, pedidos) => {
    const newPedidos = pedidos;
    newPedidos.push(pedidoInicial);
    setPedidos(newPedidos);
    const newIndex = newPedidos.length -1;
    setCurrentIndex(newIndex)
  };
  
  export const eliminarPedidoCreacion = (pedidos, setPedidos, setCurrentIndex, currentIndex) => {
    const newPedidos =  pedidos.filter((pedido, index)=> index!==currentIndex);
    if (newPedidos.length === 0) {
        newPedidos.push(pedidoInicial);
    }
    setPedidos(newPedidos);
    const newIndex = newPedidos.length-1;
    setCurrentIndex(newIndex);
  };
  
  export const editarPedidoCreacion = (currentIndex, pedido) => {
    let pedidos = JSON.parse(localStorage.getItem('pedidos') || '[]');  // Leer pedidos como array
    pedidos[currentIndex] = pedido;
    localStorage.setItem('pedidos', JSON.stringify(pedidos));  // Guardar como JSON
  };
  
  export const leerPedidoCreacion = (currentIndex) => {
    let pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
    const pedidoActual = pedidos[currentIndex];
    return pedidoActual;
  }