import { useContext, useEffect, useState } from "react";
import './pedidoCargar.css'
import { contexto } from "../../../contexto/contexto";
import Inputs from "../../../componentes/input/input";
import LibroBuscar from "../../libro/buscarLibro/libroBuscar";
import usePedidoForm from "../../../hooks/pedido/cargar/usePedidoForm";
import { pedidoInicial } from "../../../hooks/pedido/cargar/pedidoFormDefault";

function CargarPedidoLibro({ setAlertaNew }) {
  const {pedidos, currentPedidoIndex, datos } = useContext(contexto);

  const { handleSelecEspecificaciones, onChangePedido } = usePedidoForm()
  
    return (
      <>
        <LibroBuscar setAlertaNew={setAlertaNew} />
    
        <Inputs 
          name={'cantidad'}
          texto={'Cantidad de libros'}
          tipo={'text'}
          handleOnChange={(e)=>onChangePedido(e)}
          valor={pedidos[currentPedidoIndex].pedidoLibro.cantidad || pedidoInicial.pedidoLibro.cantidad}
          clase={'alin-derecha'}
        />     
        <ul className='especificaciones'>
        {datos.especificaciones?.map((esp, index) => (
            <li key={`esp-${index}`} className='especificacion-item'>
              <label className='especificacion-label' htmlFor={esp.nombre}>
                <input 
                  id={esp.nombre}
                  type="checkbox" 
                  checked={pedidos[currentPedidoIndex].especificaciones.includes(esp)}
                  onChange={() => handleSelecEspecificaciones(esp)} 
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
          handleOnChange={(e)=>onChangePedido(e)}
          valor={pedidos[currentPedidoIndex].pedidoLibro.extras || pedidoInicial.pedidoLibro.extras}
        /> 
      </>
    )
  }
  export default CargarPedidoLibro;