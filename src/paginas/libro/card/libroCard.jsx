import { useContext, useEffect, useState } from 'react';
import './libroCard.css'
import { contexto } from '../../../contexto/contexto';
import { useNavigate } from 'react-router-dom';
import { rutasGenerales } from '../../../rutas/rutas';
import { contadorEstadoPedidoStock } from '../../../funciones/utilidades.function';
import Cargando from '../../../componentes/cargando/cargando';
import { leerLibroActual } from '../../../servicios/libro.service';

const estadoInicial = {
  pendiente: 0,
  listo: 0,
  terminado: 0,
}

function LibroCard({ libro }) {  
  const { datos, setDatos } = useContext(contexto);
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();
  const[ error, setError ] = useState('')
  const [ estados, setEstados ] = useState(estadoInicial)
  
  const handleLibro = async () => {   
    setCargando(true) 
    const libroActual = await leerLibroActual(libro.idLibro, setDatos,setError);
    if (libroActual) {      
      setCargando(false);
      navigate(rutasGenerales.LIBROINDIVIDUAL);
    }
  }
  
  useEffect(() => {
    if (libro && libro.stock) {
      const newConteos = contadorEstadoPedidoStock(libro.stock);
      setEstados(newConteos);
    }
  }, [libro, libro.stock]); 

  if(cargando) return (
    <Cargando />
  )

  return (
    <>
    <div 
      className='libro-card' 
      onClick={handleLibro} 
    >
      <img src={libro.img} alt={libro.nombre} />
      <div className='libro-descripcion'>
        <h5>{libro.nombre}</h5>
        <div className='lib-descr-interna'>
          {libro.autor?<h6>{`Autor: ${libro.autor}`}</h6>:null}
          {libro.edicion?<h6>{`Edición: ${libro.edicion}`}</h6>:null}
        </div>
      </div>
      <div className='libro-pg'>
        <p title='Cantidad pg'>{libro.cantidadPg}'</p>
      </div>
        <ul>
          <li className='pendiente' title='libros pendientes'>{estados.pendiente}</li>
          <li className='terminado' title='libros para entregar'>{estados.listo}</li>
          <li className='retirado' title='libros retirados'>{estados.terminado}</li>
        </ul>
    </div>
    {error?( <p className='error'>{error}</p>):(null)}
    </>
  )
}
export default LibroCard;
