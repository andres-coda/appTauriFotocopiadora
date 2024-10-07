import { clienteInicial } from "../../cliente/cargar/clienteFormDefault"

export const errorPedidoInicial = {
  nombre:'',
  celular: '',
  email:'',
  fechaEntrega: '',
  importeTotal: '',
  sena: '',
  archivos: '',
  anillados: '',
  error: ''
}

export const pedidoLibroInicialLibro = {
  nombre:'',
  idLibro:null,
  cantidadPg: 0,
}

export const pedidoLibroInicial = {
  cantidad: 1,
  especificaciones: [],
  extras: "",
  libro: pedidoLibroInicialLibro
}

export const pedidoParcialInicial = {
  archivos: "",
  anillados: "",
  fechaEntrega: "",
  importeTotal: "",
  sena: "",
}

export const pedidoInicial = {
  pedido: pedidoParcialInicial,
  librosPedido: [],
  especificaciones:[],
  cliente: clienteInicial,
  pedidoLibro: pedidoLibroInicial,
  error: errorPedidoInicial,
  libro: pedidoLibroInicialLibro
}