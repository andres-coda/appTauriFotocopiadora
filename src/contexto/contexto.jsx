import { createContext, useEffect, useMemo, useState } from "react";
import { leerClientes } from "../servicios/cliente.servicie";
import { leerEspecificaciones, leerEstados } from "../servicios/estado.service";
import { leerLibros } from "../servicios/libro.service";
import { leerEscuelas, leerMaterias } from "../servicios/escuela.service";
import { leerPrecios } from "../servicios/precios.service";
import { leerCursos } from "../servicios/curso.service";

export const contexto = createContext({});

export const ProveiderContext = ({ children }) => {
  const [pedidos, setPedidos] = useState([]);
  const [currentPedidoIndex, setCurrentPedidoIndex] = useState(0);
  const [userLogin, setUserLogin] = useState(JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : {email:''});
  const [error, setError] = useState('');
  const [datos, setDatos] = useState({
    libros: [],
    pedidoActual: null,
    clientes: [],
    materias: [],
    escuelas: [],
    imgUrl: null,
    especificaciones: [],
    clienteActual: null,
    libroActual: null,
    clienteAEditar:null,
    listaPedidoLibros: null,
    estados: [],
    precios: [],
    cursos: [],
    listaUsers:[],
    libroAEditar:null,
  });

  useEffect(()=>{
    setUserLogin(JSON.parse(localStorage.getItem('user')));
    leerClientes(setDatos, setError);
    leerEstados(setDatos, setError);
    leerEspecificaciones(setDatos, setError);
    leerLibros(setDatos, setError);
    leerEscuelas(setDatos, setError);
    leerMaterias(setDatos, setError);
    leerPrecios(setDatos, setError);
    leerCursos(setDatos,setError);
  },[]);

  return (
    <contexto.Provider value={{ datos, setDatos, pedidos, setPedidos, currentPedidoIndex, setCurrentPedidoIndex, userLogin, setUserLogin }} >
      {children}
    </contexto.Provider>
  )
}