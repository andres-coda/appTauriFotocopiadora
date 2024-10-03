import { useContext, useEffect, useState } from "react";
import './pedidoCargar.css'
import { contexto } from "../../../contexto/contexto";
import Inputs from "../../../componentes/input/input";
import LibroBuscar from "../../libro/buscarLibro/libroBuscar";

function CargarPedidoLibro({ pedidoActual, setAlertaNew }) {
    const { datos, pedidos, setPedidos,currentPedidoIndex } = useContext(contexto);
    const [ pedidoLibroPrueba, setPedidoLibroPrueba ] = useState(pedidoActual.pedidoLibro);

    useEffect(() => {
      setPedidoLibroPrueba(pedidoActual.pedidoLibro);
    }, [pedidoActual]);
    const handleOnChange = (e) => {
      const { name, value } = e.target;
      const updatedPedidoLibro = { ...pedidoLibroPrueba, [name]: value };
      setPedidoLibroPrueba(updatedPedidoLibro);
      const updatedPedidos = [...pedidos];
    updatedPedidos[currentPedidoIndex] = {
      ...pedidoActual,
      pedidoLibro: updatedPedidoLibro
    };
    setPedidos(updatedPedidos);
  }; 
  
    const handleSelectionChange = (esp) => {
      const espQueNo = [];
      
      switch (esp.idEspecificaciones) {
          case 1:
              espQueNo.push(datos.especificaciones[1]);
              break;
          case 2:
              espQueNo.push(datos.especificaciones[0]);
              break;
          case 3:
              espQueNo.push(datos.especificaciones[3], datos.especificaciones[4]);
              break;
          case 4:
              espQueNo.push(datos.especificaciones[2], datos.especificaciones[4]);
              break;
          case 5:
              espQueNo.push(datos.especificaciones[2], datos.especificaciones[3]);
              break;
          case 6:
              espQueNo.push(datos.especificaciones[6]);
              break;
          case 7:
              espQueNo.push(datos.especificaciones[5]);
              break;
          default:
              break;
      }     
  
      let nuevaEspecificacion;
      if (pedidoActual.especificaciones.includes(esp)) {
          nuevaEspecificacion = pedidoActual.especificaciones.filter(item => item !== esp);
      } else {
          nuevaEspecificacion = pedidoActual.especificaciones.filter(item => !espQueNo.includes(item));
          nuevaEspecificacion.push(esp);
      }

      const updatedPedidoLibro = {...pedidoActual.pedidoLibro, especificaciones:nuevaEspecificacion};
      const updatedPedidos = [...pedidos];
      updatedPedidos[currentPedidoIndex] = { 
        ...pedidoActual, 
        especificaciones:nuevaEspecificacion, 
        pedidoLibro:updatedPedidoLibro 
      };
      setPedidos(updatedPedidos);
  };
    
    return (
      <>
        <LibroBuscar setAlertaNew={setAlertaNew} />
    
        <Inputs 
          name={'cantidad'}
          texto={'Cantidad de libros'}
          tipo={'text'}
          handleOnChange={(e)=>handleOnChange(e)}
          valor={pedidoLibroPrueba.cantidad}
          clase={'alin-derecha'}
        />     
        <ul className='especificaciones'>
        {datos.especificaciones?.map((esp, index) => (
            <li key={`esp-${index}`} className='especificacion-item'>
              <label className='especificacion-label' htmlFor={esp.nombre}>
                <input 
                  id={esp.nombre}
                  type="checkbox" 
                  checked={pedidoActual.especificaciones.includes(esp)}
                  onChange={() => handleSelectionChange(esp)} 
                  className='especificacion-checkbox'
                /> 
                {esp.nombre}
              </label>
            </li>
          ))}
        </ul>
        <Inputs 
          name={'extras'}
          texto={'Detalles extras del pedido'}
          tipo={'text'}
          handleOnChange={(e)=>handleOnChange(e)}
          valor={pedidoLibroPrueba.extras}
        /> 
      </>
    )
  }
  export default CargarPedidoLibro;