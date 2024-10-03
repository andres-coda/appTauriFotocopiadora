import { clienteAdapter } from "../adaptadores/cliente.adapter.js";
import { URL_CLIENTES } from "../endPoint/endpoint.ts";
import { fetchGet, fetchPost, fetchPut } from "../funciones/fetch.function";

const token = localStorage.getItem('token');

export const leerClientes = async (setDatos, setError) => {
    try {
      console.log("Fetching clientes...");
      const res = await fetchGet(URL_CLIENTES, token);
      if (res) {
        const clientes = res?.map(cliente => clienteAdapter(cliente));
        setDatos((prev) => ({ ...prev, clientes: clientes }));
      }
    } catch (error) {
        setError(`Error fetching clientes, ${error}`)
      console.error("Error fetching clientes", error);
    }
  }
  
  export const leerClienteActual = async (idCliente, setDatos, setError) => {
    try {
      console.log("Fetching clientes...");
      const res = await fetchGet(URL_CLIENTES+'/'+Number(idCliente), token);
      if (res) {
        const clienteActual = clienteAdapter(res);
        setDatos((prev) => ({ ...prev, clienteActual: res }));
      }
    } catch (error) {
      setError((prev)=>({...prev, error:`Error fetching cliente actual: ${error}`}))
      console.error("Error fetching cliente actual", error);
    }
  }
  
  export const cargarCliente = async (cliente, setError) => {
    try{
      const nuevoCliente = await fetchPost(URL_CLIENTES, cliente, token);
      if (nuevoCliente) return nuevoCliente;
    } catch (error) {
      setError((perv)({...prev, error:`Error en la carga del cliente: ${error}`}))
      console.error(error)
    }
  }
  
  export const editarCliente = async (id,cliente, setError) => {
    try{
      const nuevoCliente = await fetchPut(URL_CLIENTES+'/'+id, cliente, token);
      if (nuevoCliente) return nuevoCliente;
    } catch (error) {
      setError((perv)({...prev, error:`Error en la carga del cliente: ${error}`}))
      console.error(error)
    }
  }