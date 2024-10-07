import { useContext, useEffect, useState } from "react";
import { contexto } from "../../../contexto/contexto";
import { errorPedidoInicial, pedidoLibroInicial, pedidoLibroInicialLibro, pedidoParcialInicial } from "./pedidoFormDefault";
import useFormGeneral from "../../form/useFormGeneral";
import { validarPedido } from "../../../funciones/validaciónForm/validarPedido";
import { URL_PEDIDO_COMPLETO } from "../../../endPoint/endpoint";
import { rutasGenerales } from "../../../rutas/rutas";
import { useNavigate } from "react-router-dom";
import useClienteForm from "../../cliente/cargar/useClienteForm";
import { validarEspecifPedidos } from "../../../funciones/validaciónForm/validarEspecifPedidos";
import usePedidoUtilidades from "./usePedidoUtilidades";
import usePedidoAgregarLibro from "./usePedidoAgregarLibro";

const pedidoEditar = null;
const adapter = null;

function usePedidoForm() {
  const { pedidos, setPedidos, currentPedidoIndex, datos, setDatos } = useContext(contexto);
  const navigate= useNavigate();

  const [pedidoLibro, setPedidoLibro] = useState(pedidos[currentPedidoIndex].pedidoLibro || {...pedidoLibroInicial});

  const {
    setLibro, libro, onChangeLibro,
    coincidenciasLibro, alertaCoincidenciaLibro, handleSelecLibro,
  } = usePedidoAgregarLibro();

  const { eliminarPedido} = usePedidoUtilidades()
  const {
      onchange: onChangeCliente, 
      info: persona, 
      coincidencias: coincidenciasPersona, alertaCoincidencia: alertaCoincidenciaPersona, handleSelec:handleSelecPersona,
  } = useClienteForm();


  const {
    handleForm, onchange, recetear,
    errorPost, loading, response,
    info, errorFrom, claseError,
    alerta, setAlerta
  } = useFormGeneral(validarPedido, URL_PEDIDO_COMPLETO, pedidos[currentPedidoIndex].pedido || {...pedidoParcialInicial}, pedidoEditar, pedidos[currentPedidoIndex].error || {...errorPedidoInicial}, adapter)

  useEffect(()=>{
    setPedidos((prev)=>{
      const newPedidos = [...prev];
      newPedidos[currentPedidoIndex] = {... prev[currentPedidoIndex], libro: libro }
      return newPedidos;
    })
  },[libro])  

  useEffect(()=>{
    setPedidos((prev)=>{
      const newPedidos = [...prev];
      newPedidos[currentPedidoIndex] = {... prev[currentPedidoIndex], cliente:persona }
      return newPedidos;
    })
  },[persona]);

  useEffect(()=>{
    setPedidos((prev)=>{
      const newPedidos = [...prev];
      newPedidos[currentPedidoIndex] = {...prev[currentPedidoIndex], pedido:info}
      return newPedidos;
    })
  },[info]);

  useEffect(()=>{
    setPedidos((prev)=>{
      const newPedidos = [...prev];
      newPedidos[currentPedidoIndex] = {...prev[currentPedidoIndex], error:errorFrom};
      return newPedidos
    })
  },[errorFrom])

  useEffect(() => {    
    setPedidos((prev)=>{
      const newPedidos = [...prev];
      newPedidos[currentPedidoIndex] = {...newPedidos[currentPedidoIndex],pedidoLibro:pedidoLibro };
      return newPedidos;
    })      
  }, [pedidoLibro]);

  const onChangePedido = (e)=>{
    const {name, value} = e.target;
    setPedidoLibro((prev)=>({
      ...prev,
      [name]:value
    }))
  }

  const handleSelecEspecificaciones = (esp) => {
    const nuevaEspecificacion = validarEspecifPedidos(
      esp,
      pedidos[currentPedidoIndex].especificaciones, 
      datos.especificaciones
    ); 
    setPedidos((prev)=>{
      const newPedidos = [...prev];
      newPedidos[currentPedidoIndex] = {... prev[currentPedidoIndex], especificaciones:nuevaEspecificacion, pedidoLibro:{especificaciones:nuevaEspecificacion} }
      return newPedidos;
    });
  };

  const handleAgregarLibro =()=> {
    setPedidos((prev)=>{
      const newPedidos = [...prev];   
      const newLibroPedido = {...newPedidos[currentPedidoIndex].pedidoLibro, libro:{...newPedidos[currentPedidoIndex].libro, especificaciones: newPedidos[currentPedidoIndex].especificaciones} }  
      const librosPedido = [...newPedidos[currentPedidoIndex].librosPedido, newLibroPedido];
      const newPedido = {...newPedidos[currentPedidoIndex], librosPedido, pedidoLibro: {...pedidoLibroInicial}, libro:{...pedidoLibroInicialLibro}, especificaciones: []}
      newPedidos[currentPedidoIndex] = newPedido;
      return newPedidos
    });
    
    setLibro({...pedidoLibroInicialLibro});
    setPedidoLibro({...pedidoLibroInicial});

    console.log('pedido inicial', pedidoLibroInicial);
    
  }

  const handlePedidoLibroEdit = (pedidoLibroInterno) => {
    setPedidos((prev)=>{
      const newPedidos = [...prev];
      const nuevaLista = newPedidos[currentPedidoIndex].librosPedido.filter(item => item != pedidoLibroInterno);
      const newPedido = {...newPedidos[currentPedidoIndex], librosPedido:nuevaLista, pedidoLibro: pedidoLibroInterno}
      newPedidos[currentPedidoIndex] = newPedido;
      return newPedidos
    })
  }

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

    handleForm(dataGuardar);
  }

  useEffect(()=>{
    if (response) {
      setDatos((prev)=>({...prev, pedidoActual:response}));
      eliminarPedido();
      navigate(rutasGenerales.PEDIDOINDIVIDUAL);
    }
  },[response])


  return { 
    handleSelecEspecificaciones, onchange, onChangeCliente, onChangePedido,onChangeLibro,
    handleAgregarLibro, handlePedidoLibroEdit,
    recetear,cargarPedidoCompleto, 
    coincidenciasLibro, alertaCoincidenciaLibro, handleSelecLibro, 
    coincidenciasPersona, alertaCoincidenciaPersona, handleSelecPersona,
    response, loading, errorPost, 
    alerta, setAlerta, claseError
  }
}

export default usePedidoForm;