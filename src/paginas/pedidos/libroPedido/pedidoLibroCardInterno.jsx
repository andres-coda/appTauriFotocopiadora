import { useState, useContext, useEffect } from 'react';
import './pedidoLibroCard.css'
import { contexto } from '../../../contexto/contexto';
import { estimarPrecio } from '../../../funciones/utilidades.function.js';
import AlertaFormulario from '../../../componentes/alertas/alertaFormulario/alertaFormulario';
import CambiarEstado from '../estado/cambiarEstado';
import EspecificacionesCard from '../especificaciones/especificacionesCard';

function PedidoLibroCardInterno({estadoClas, pedidoLibro, quitarLibro, libroCargando, especificaciones}){
  const [ modifEstado, setModifEstado ] = useState(false);
  const { datos } = useContext(contexto); 

const handleLibroSelec = () => {
  if(estadoClas=='proceso'){
    if (quitarLibro() ) quitarLibro();
  } else if (estadoClas!='cargando'){
    setModifEstado(true);
  }
}

    return(
      <>
        <div className={`libro-pedido-card  ${estadoClas}`} onClick={()=> handleLibroSelec()}>
        <h4>{pedidoLibro.cantidad}</h4>
        <div className={`libro-pedido-card-centro`}>          
          <h5>{estadoClas==='cargando' ? libroCargando.nombre : pedidoLibro.libro.nombre}</h5>
          <p>{pedidoLibro.extras}</p>
          {estadoClas === 'proceso' ? <p>Precio sugerido: ${estimarPrecio(pedidoLibro.especificaciones,pedidoLibro.libro, pedidoLibro.cantidad, datos.precios)}</p>: null}
          {pedidoLibro.estadoPedido? <p>{pedidoLibro.estadoPedido.estado}</p> : null}
        </div>
        <EspecificacionesCard listaEspecificaciones={especificaciones || pedidoLibro.especificaciones} />
      </div>
      <AlertaFormulario
        isAlerta={modifEstado}
        setIsAlerta={setModifEstado}
        children={
          <CambiarEstado
            estadoClase={estadoClas}
            libroPedido={pedidoLibro}
            setModifEstado={setModifEstado}
          />
        }
      />
      </>
    )
}

export default PedidoLibroCardInterno;