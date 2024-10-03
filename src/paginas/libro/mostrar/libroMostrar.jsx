import { useState } from 'react';
import MiniNav from '../../../componentes/miniHeder/miniNav';
import Reciclar from '../../../assets/recycle.svg'
import Filtrar from '../../../assets/filter.svg'
import Add from '../../../assets/add.svg'
import ListaFiltros from '../../../componentes/filtros/listaFiltros';
import FiltroBuscarLibro from '../filtros/filtroBuscarLibro';
import FiltrosLibros from '../filtros/filtrosLibros';
import LibroMostrarInterno from './libroMostrarInterno';
import AlertaFormulario from '../../../componentes/alertas/alertaFormulario/alertaFormulario';
import LibroCargar from '../cargar/libroCargar';

function LibroMostrar() {
  const [alerta, setAlerta ] = useState(false);
  const [buscador, setBuscador] = useState(()=>(libro)=>libro.nombre.toLowerCase().includes(''))
  const [filtros, setFiltros] = useState([]);
  const [funcionFiltro, setFuncionFiltron] = useState(()=>(libro)=>true);
  const [alertaFiltro, setAlertaFiltro] = useState(false)

  const handleFiltrosMostrar=()=>{
    setAlertaFiltro(true)
  }

  return (
    <>
      <MiniNav
        children={
          <>
            <li onClick={() => {
                setBuscador(()=>(libro)=>libro.nombre.toLowerCase().includes('')),
                setFuncionFiltron(()=>(libro)=>true),
                setFiltros([])
            }}
              className='btn-add'
              title='Recetear filtros'
            ><img src={Reciclar} alt='Recetear filtros' /></li>
            <li 
              className='btn-add' 
              title='Filtrar libro' 
              onClick={handleFiltrosMostrar}
              ><img src={Filtrar} alt='Filtrar libro' /></li>
            <li 
              className='btn-add' 
              title='Nuevo libro' 
              onClick={() => setAlerta(true)}
              ><img src={Add} alt='Nuevo libro' /></li>
          </>
        }
      />
      <h2 className='titulos'>Lista de libros</h2>
      <ListaFiltros lista={filtros} />
      <FiltroBuscarLibro 
        setFuncionBuscar={setBuscador}
      />
      <LibroMostrarInterno
        filtros={funcionFiltro}
        buscador={buscador}
      />
      <AlertaFormulario
        isAlerta={alerta}
        setIsAlerta={setAlerta}
        children={
          <LibroCargar setAlerta={setAlerta}/>
        }
      />
      <AlertaFormulario 
        isAlerta={alertaFiltro}
        setIsAlerta={setAlertaFiltro}
        children={
          <FiltrosLibros 
            setFuncion={setFuncionFiltron}
            setFiltros={setFiltros}
            filtros={filtros}
            setAlertaFiltro={setAlertaFiltro}
          />
        }
      />
  </>
  )
}
export default LibroMostrar;

