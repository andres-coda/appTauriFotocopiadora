import { createContext, useEffect, useMemo, useState } from "react";
import { leerClientes } from "../servicios/cliente.servicie";
import { leerEspecificaciones, leerEstados } from "../servicios/estado.service";
import { leerLibros } from "../servicios/libro.service";
import { leerEscuelas, leerMaterias } from "../servicios/escuela.service";
import { leerPrecios } from "../servicios/precios.service";
import { leerCursos } from "../servicios/curso.service";
import { URL_BASE } from "../endPoint/endpoint";
import { io } from "socket.io-client";
import { pedidoInicial } from "../hooks/pedido/cargar/pedidoFormDefault";

export const contexto = createContext({});

export const ProveiderContext = ({ children }) => {
  const socket = useMemo(()=> io(URL_BASE), []);
  const [pedidos, setPedidos] = useState([{...pedidoInicial}]);
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

  useEffect(() => {
    const handleLibroPedidoActualizado = (nuevoLibroPedido) => {
      console.log('actualizando libro pedido', nuevoLibroPedido);
      if (datos.pedidoActual && datos.pedidoActual.librosPedidos) {        
        const newLibrosP = datos.pedidoActual.librosPedidos.map(libroP =>
          libroP.idLibroPedido === nuevoLibroPedido.idLibroPedido ? nuevoLibroPedido : libroP
        );
        const pedidoActual = { ...datos.pedidoActual, librosPedidos:newLibrosP}
        setDatos((prev)=>({...prev, pedidoActual:pedidoActual}));
      }
  
      if (datos.listaPedidoLibros) {
        console.log('entre al otro');
        
        const newLibroPedidos = datos.listaPedidoLibros.pedidoLibros.filter(pedido =>
          pedido.idLibroPedido !== nuevoLibroPedido.idLibroPedido
        );
        const newLista = { pedidoLibros: newLibroPedidos, stock: datos.listaPedidoLibros.stock, endpoint: datos.listaPedidoLibros.endpoint };
        setDatos((prev) => ({ ...prev, listaPedidoLibros: newLista }));
      }
    };
  
    socket.on('Se actualizo libro pedido', handleLibroPedidoActualizado);
  
    return () => {
      socket.off('Se actualizo libro pedido', handleLibroPedidoActualizado);
    };
  }, [datos.listaPedidoLibros, datos.pedidoActual]);
  

  useEffect(() => {
    const handleNuevoPrecio = (nuevoPrecio) => {
      console.log('Nuevo precio creado: ', nuevoPrecio);
      const newPrecios = [...datos.precios, nuevoPrecio];
      setDatos((prev) => ({ ...prev, precios: newPrecios }));
    };
  
    const handlePrecioActualizado = (nuevoPrecio) => {
      console.log('Precio actualizado: ', nuevoPrecio);
      const newPrecios = datos.precios.map(precio =>
        precio.idPrecios=== nuevoPrecio.idPrecios ? nuevoPrecio : precio
      );
      setDatos((prev) => ({ ...prev, precios: newPrecios }));
    };
  
    socket.on('Se creo precio', handleNuevoPrecio);
    socket.on('Se actualizo precio', handlePrecioActualizado);
  
    return () => {
      socket.off('Se creo precio', handleNuevoPrecio);
      socket.off('Se actualizo precio', handlePrecioActualizado);
    };
  }, [datos.precios]); 

  useEffect(() => {
    const handleNuevaMateria = (nuevaMateria) => {
      console.log('Nueva materia creada: ', nuevaMateria);
      const newMaterias = [...datos.materias, nuevaMateria];
      setDatos((prev) => ({ ...prev, materias: newMaterias }));
    };
  
    const handleMateriaActualizada = (nuevaMateria) => {
      console.log('Materia actualizada: ', nuevaMateria);
      const newMaterias = datos.materias.map(materia =>
        materia.idMateria === nuevaMateria.idMateria ? nuevaMateria : materia
      );
      setDatos((prev) => ({ ...prev, materias: newMaterias }));
    };
  
    socket.on('Se creo materia', handleNuevaMateria);
    socket.on('Se actualizo materia', handleMateriaActualizada);
  
    return () => {
      socket.off('Se creo materia', handleNuevaMateria);
      socket.off('Se actualizo materia', handleMateriaActualizada);
    };
  }, [datos.materias]);
  

  useEffect(() => {
    const handleCursoActualizado = (nuevoCurso) => {
      const newEscuelas = datos.escuelas.map(esc => {
        if (esc.idEscuela === nuevoCurso.escuela.idEscuela) {
          const cursoExiste = esc.cursos.some(curso => curso.idCurso === nuevoCurso.idCurso);
          const cursosActualizados = cursoExiste
            ? esc.cursos.map(curso => (curso.idCurso === nuevoCurso.idCurso ? nuevoCurso : curso))
            : [...esc.cursos, nuevoCurso];
          return { ...esc, cursos: cursosActualizados };
        }
        return esc;
      });
      setDatos((prev) => ({ ...prev, escuelas: newEscuelas }));
    };
  
    const handleNuevaEscuela = (nuevaEscuela) => {
      console.log('Nueva escuela recibida:', nuevaEscuela);
      const newEscuelas = [...datos.escuelas, nuevaEscuela];
      setDatos((prev) => ({ ...prev, escuelas: newEscuelas }));
    };
  
    const handleEscuelaActualizada = (nuevaEscuela) => {
      console.log('Escuela actualizada: ', nuevaEscuela);
      const newEscuela = datos.escuelas.map(escuela =>
        escuela.idEscuela === nuevaEscuela.idEscuela ? nuevaEscuela : escuela
      );
      setDatos((prev) => ({ ...prev, escuelas: newEscuela }));
    };
  
    socket.on('se actualizo curso', handleCursoActualizado);
    socket.on('Se creo escuela', handleNuevaEscuela);
    socket.on('Se actualizo escuela', handleEscuelaActualizada);
  
    return () => {
      socket.off('se actualizo curso', handleCursoActualizado);
      socket.off('Se creo escuela', handleNuevaEscuela);
      socket.off('Se actualizo escuela', handleEscuelaActualizada);
    };
  }, [datos.escuelas, datos.cursos]);
  

  useEffect(() => {
    // Escuchar eventos de creación de libros
    const handleNuevoLibro = (nuevoLibro) => {
      console.log('Nuevo libro recibido:', nuevoLibro);
      const newLibros = [...datos.libros, nuevoLibro];
      setDatos((prev) => ({ ...prev, libros: newLibros }));
    };
  
    // Escuchar eventos de actualización de libros
    const handleLibroActualizado = (nuevoLibro) => {
      console.log('Libro actualizado');
      const newLibros = datos.libros.map(libro => 
        libro.idLibro === nuevoLibro.idLibro ? nuevoLibro : libro
      );
      const libroActual = datos.libroActual && datos.libroActual.idLibro === nuevoLibro.idLibro
        ? nuevoLibro 
        : datos.libroActual;
        
      setDatos((prev) => ({ ...prev, libros: newLibros, libroActual }));
    };
  
    // Usar socket.on para escuchar los eventos
    socket.on('Se creo libro', handleNuevoLibro);
    socket.on('Se actualizo libro', handleLibroActualizado);
  
    // Limpiar los eventos cuando el componente se desmonte
    return () => {
      socket.off('Se creo libro', handleNuevoLibro);
      socket.off('Se actualizo libro', handleLibroActualizado);
    };
  }, [datos.libros, datos.libroActual]);
  
  
  
  useEffect(() => {
    const handleNuevoCliente = (nuevoCliente) => {
      console.log('Nuevo cliente recibido:', nuevoCliente);
      const newCliente = [...datos.clientes, nuevoCliente];
      setDatos((prev) => ({ ...prev, clientes: newCliente }));
    };
  
    const handleClienteActualizado = (nuevoCliente) => {
      console.log('Cliente actualizado: ', nuevoCliente);
      const newClientes = datos.clientes.map(cliente =>
        cliente.idPersona === nuevoCliente.idPersona ? nuevoCliente : cliente
      );
      const clienteActual = datos.clienteActual && datos.clienteActual.idPersona === nuevoCliente.idPersona
        ? nuevoCliente
        : datos.clienteActual;
      setDatos((prev) => ({ ...prev, clientes: newClientes, clienteActual }));
    };

    const handleClienteEliminado = (idCliente) =>{
      console.log('Cliente eliminado: ', idCliente);
      const timer = setTimeout(() => {
      const newClientes = datos.clientes?.filter(cliente=> cliente.idPersona !==idCliente);
      const clienteActual = datos.clienteActual && datos.clienteActual.idPersona === idPersona ? null : datos.clienteActual;
      setDatos((prev) => ({ ...prev, clientes: newClientes, clienteActual }));
    }, 1000); 
  
      return () => clearTimeout(timer);
    }
  
    socket.on('Se creo persona', handleNuevoCliente);
    socket.on('Se actualizo persona', handleClienteActualizado);
    socket.on('Se elimino persona', handleClienteEliminado);
  
    return () => {
      socket.off('Se creo persona', handleNuevoCliente);
      socket.off('Se actualizo persona', handleClienteActualizado);
      socket.on('Se elimino persona', handleClienteEliminado);
    };
  }, [datos.clientes, datos.clienteActual]);

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