import { useState } from 'react';
import './libroMostrar.css'
import MiniNav from '../../../componentes/miniHeder/miniNav';
import Reciclar from '../../../assets/recycle.svg'
import Filtrar from '../../../assets/filter.svg'
import Add from '../../../assets/add.svg'
import ListaFiltros from '../../../componentes/filtros/listaFiltros';
import FiltroBuscarLibro from '../filtros/filtroBuscarLibro';
import FiltrosLibros from '../filtros/filtrosLibros';
import LibroMostrarInterno from './libroMostrarInterno';
import LibroCargar from '../cargar/libroCargar';
import Modal from '../../../componentes/modal/modal';
import useFiltro from '../../../hooks/filtros/useFiltro';
import { useModalContext } from '../../../contexto/modalContexto';

function LibroMostrar() {
  const [buscador, setBuscador] = useState(()=>(libro)=>libro.nombre.toLowerCase().includes(''));
  const [alertaFiltro, setAlertaFiltro] = useState(false);

  const {
    recetearFiltros, filtros,
  } = useFiltro();

  const {setEstadoModal} = useModalContext()

  return (
    <>
      <MiniNav
        children={
          <>
            <li onClick={() => {
                setBuscador(()=>(libro)=>libro.nombre.toLowerCase().includes('')),
                recetearFiltros()
            }}
              className='btn-add'
              title='Recetear filtros'
            ><img src={Reciclar} alt='Recetear filtros' /></li>
            <li 
              className='btn-add' 
              title='Filtrar libro' 
              onClick={()=>{setAlertaFiltro(true), setEstadoModal(true) }}
              ><img src={Filtrar} alt='Filtrar libro' /></li>
            <li 
              className='btn-add' 
              title='Nuevo libro' 
              onClick={() => {setAlertaFiltro(false), setEstadoModal(true)}}
              ><img src={Add} alt='Nuevo libro' /></li>
          </>
        }
      />
      <h2 className='titulos'>Lista de libros</h2>
      <ListaFiltros lista={filtros.filtro} tipo={'libro'}/>
      <FiltroBuscarLibro 
        setFuncionBuscar={setBuscador}
      />
      <div className='lista-libros'>
      <LibroMostrarInterno
        filtros={filtros.funcionLibro}
        buscador={buscador}
      />
      </div>
      <Modal children={alertaFiltro ? <FiltrosLibros /> : <LibroCargar />}/>
  </>
  )
}
export default LibroMostrar;

