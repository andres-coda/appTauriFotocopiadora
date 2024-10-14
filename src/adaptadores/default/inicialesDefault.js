export const estadoPedidoInicial = {
    idEstadoPedido: null,
    estado: '',
}

export const espIniciales = {
    idEspecificaciones: null,
    nombre:''
}

export const libroPedidoIncial = {
    idLibroPedido: null,
    extras: '',
    cantidad: '',
    especificaciones: [],
    estadoPedido: {},
}

export const clienteInicial = {
    idPersona:null, 
    nombre:'', 
    email:'', 
    celular:'', 
}

export const pedidoInicial ={
    idPedido: null,
    fechaTomado: '',
    fechaEntrega: '',
    importeTotal: '',
    sena: '',
    cliente: {},
    archivos: '',
    anillados: '',
    librosPedidos: [],
}