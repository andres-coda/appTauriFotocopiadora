import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../../contexto/contexto";
import useFormGeneral from "../../form/useFormGeneral";
import { errorPedidoInicial, pedidoInicial } from "./pedidoFormDefault";
import useClienteForm from "../../cliente/cargar/useClienteForm";
import useAgregarLibro from "./useAgregarLibro";
import useCargarPedidoLibroJunior from "./useCargarPedidoLibroJunior";
import { URL_PEDIDO_COMPLETO } from "../../../endPoint/endpoint";
import { validarPedido } from "../../../funciones/validaciónForm/validarPedido.js";
import { pedidoAdapter } from "../../../adaptadores/pedido.adapter.js";
import useCargarPedidoGestionLibro from './useCargarPedidoGestionLibro.js'
import { useEffect } from "react";
import useRetardo from "../../tiempo/useRetardo.js";
import { rutasGenerales } from "../../../rutas/rutas.jsx";


const pedidoInicialLocal = {...pedidoInicial}

const usePedidoManager = () => {
  const { pedidos, setPedidos, currentPedidoIndex, setCurrentPedidoIndex, setDatos } = useGlobalContext();
  const navigate = useNavigate();

  const {
    handleForm, recetear:recetearPedido, 
    errorPost, loading, response, 
    errorFrom, info:pedido ,onchange: onChangePedido
  } = useFormGeneral(
    pedidos[currentPedidoIndex].pedido || pedidoInicialLocal.pedido,  
    pedidos[currentPedidoIndex].error || errorPedidoInicial
  );

  const {
      info:persona, onchange: onChangePersona, recetearPersona,
      coincidencias:coincidenciasPersona, alertaCoincidencia:alertaCoincidenciaPersona, handleSelec:handleSelecPersona,
  } = useClienteForm(
    pedidos[currentPedidoIndex].cliente
  );

  const {
    agregarLibroLista, quitarLibroLista,
    recetearPedidoLibro, onChangePedidoLibro, handleSelecEspecificaciones, pedidoLibro, isEspCheck,
    onChangeLibro, recetearLibro, handleSelecLibro, 
    libro, coincidenciasLibro, alertaCoincidenciaLibro
  } = useCargarPedidoGestionLibro();
  
  useEffect(()=>{
    if (response) {
      setDatos((prev)=>({...prev, pedidoActual:response}));
      eliminarPedido();
      navigate(rutasGenerales.PEDIDOINDIVIDUAL);
    }
  },[response]);

  useEffect(()=>{
    recetearPedido();
    recetearPersona();
  },[currentPedidoIndex]);

  useEffect(()=>{
    actualizarContexto('libro',libro);
  },[libro]);

  useEffect(()=>{
    actualizarContexto('pedido', pedido);
  },[pedido]);

  useEffect(()=>{
    actualizarContexto('pedidoLibro', pedidoLibro);
  },[pedidoLibro]);

  useEffect(()=>{
    actualizarContexto('cliente', persona)
  },[persona]); 

  const recetearTodo= () =>{
    recetearLibro();
    recetearPedidoLibro();
    recetearPedido();
    recetearPersona();
  }

  const recetearPedidoCompelto = () =>{
    setPedidos((prev)=>{
      const newPedidos = [...prev];
      newPedidos[currentPedidoIndex] = pedidoInicialLocal;
      return newPedidos;
    })
  }

  const actualizarContexto=(name, valor) =>{
    setPedidos((prev)=>{
      const newPedidos = [...prev];
      newPedidos[currentPedidoIndex] = {...newPedidos[currentPedidoIndex], [name]:valor}
      return newPedidos;
    });
  }

  const retardoActualizar = useRetardo(actualizarContexto, 300);

  const cargarPedidoCompleto = async (e) => {
    const nuevaLista = pedidos[currentPedidoIndex].librosPedido.map((libroPedido) => {
      const nuevasEspecificaciones = libroPedido.especificaciones
        .filter(esp => esp.idEspecificaciones)
        .map(esp => esp.idEspecificaciones);
          const libroPedidoCargar = {
            ...libroPedido,
            especificaciones: nuevasEspecificaciones,
            extras: libroPedido.extras,
            libro: {
              idLibro: libroPedido.libro.idLibro,
              nombre: libroPedido.libro.nombre,
            }
          }
          return libroPedidoCargar
    })

    const dataGuardar = {
      cliente: {
        nombre: pedidos[currentPedidoIndex].cliente.nombre,
        idPersona: pedidos[currentPedidoIndex].cliente.idPersona || null,
        email: pedidos[currentPedidoIndex].cliente.email,
        celular: pedidos[currentPedidoIndex].cliente.celular,
      },
      pedido: {
        anillados: pedidos[currentPedidoIndex].pedido.anillados,
        archivos: pedidos[currentPedidoIndex].pedido.archivos,
        fechaEntrega: pedidos[currentPedidoIndex].pedido.fechaEntrega,
        importeTotal: pedidos[currentPedidoIndex].pedido.importeTotal,
        sena: pedidos[currentPedidoIndex].pedido.sena,
      },
      librosPedido: nuevaLista
    }    

    handleForm(URL_PEDIDO_COMPLETO, dataGuardar, true, validarPedido, pedidoAdapter);
  }

  const nuevoPedido = (e) => {
    e.preventDefault();
    const newPedido = { ...pedidoInicialLocal };
    const newPedidos = [...pedidos, newPedido]; 
    
    setPedidos([...newPedidos]);

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
      newPedidos.push({...pedidoInicialLocal});
    }
   
    setPedidos([...newPedidos]);
    const newIndex = newPedidos.length - 1;
    setCurrentPedidoIndex(newIndex);
  };

  const handleAtras = () => {
    navigate(-1);
  }

  return { 
    nuevoPedido, pedidoSiguiente, pedidoAnterior, eliminarPedido, recetearPedidoCompelto,
    persona, onChangePersona, coincidenciasPersona, alertaCoincidenciaPersona, handleSelecPersona,
    onChangeLibro, handleSelecLibro, libro, coincidenciasLibro, alertaCoincidenciaLibro,
    agregarLibroLista, quitarLibroLista,
    pedido, onChangePedido,
    onChangePedidoLibro, handleSelecEspecificaciones, pedidoLibro, isEspCheck,
    recetearTodo, cargarPedidoCompleto, handleAtras, 
    errorPost, loading, response,  
    errorFrom
  }

}

export default usePedidoManager;


/*

 const actualizarContexto = (libro) => {
    console.log('pedidos useAgregarLibro' , pedidos);
    
    setPedidos((prev)=>{
      console.log('prev useAgregarLibro' , prev); 
      const newPedidos = [...prev];
      newPedidos[currentPedidoIndex] = {...prev[currentPedidoIndex], libro:{...libro}}
    });
  }

const retardarActualizacionContexto = useRetardo(actualizarContexto, 300);
  
  useEffect(()=>{
    retardarActualizacionContexto(libro);
  },[libro])




*/