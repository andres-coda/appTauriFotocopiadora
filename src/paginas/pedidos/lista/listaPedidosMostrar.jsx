import MiniNav from '../../../componentes/miniHeder/miniNav';
import { contexto } from '../../../contexto/contexto';
import './listaPedidos.css';
import { useContext, useState } from 'react';
import Reciclar from '../../../assets/recycle.svg'
import Filtrar from '../../../assets/filter.svg'
import Ordenar from '../../../assets/orden.svg'
import ListaFiltros from '../../../componentes/filtros/listaFiltros';
import PedidoMostrarCard from '../card/pedidoMostrarCard';
import AlertaFormulario from '../../../componentes/alertas/alertaFormulario/alertaFormulario';
import FiltroPedidos from '../filtros/filtroPedidos';
import FiltroOrdenarPedido from '../filtros/filtroOrdenarPedido';

function ListaPedidosMostrar() {
  const { datos } = useContext(contexto);
  const [funcionFiltro, setFuncionFiltron] = useState(()=>(libro)=>true);
  const [filtros, setFiltros] = useState([]);
  const [alertaFiltro, setAlertaFiltro] = useState(false);
  const [alertaOrden, setAlertaOrden] = useState(false);
  const [filtroOrdenar, setFiltroOrdenar] = useState([]);

  const handleFiltroSelect = () => {
    setFiltros([]);
    setFiltroOrdenar([]);
  };

const handleFiltrosMostrar=()=>{
  setAlertaFiltro(true)
}

const handleFiltrosOrdenar=()=>{
  setAlertaOrden(true)
}

  return (
    <>
      <MiniNav
        children={
          <> 
            <li 
              className='btn-add' 
              title='Recetear busqueda'
              onClick={handleFiltroSelect}
            ><img src={Reciclar} alt='Recetear busqueda' /></li>
            <li 
              className='btn-add' title='Filtrar pedidos' 
              onClick={handleFiltrosMostrar}
            ><img src={Filtrar} alt='Filtrar pedidos' /></li>
            <li 
              className='btn-add' 
              title='Ordenar pedidos' 
              onClick={handleFiltrosOrdenar}
            ><img src={Ordenar} alt='Ordenar pedidos' /></li>
          </>
        }
      />
      <h2 className='titulos'>Lista de pedidos</h2>
      <ListaFiltros lista={filtros} />
      <ListaFiltros lista={filtroOrdenar} ordenar={true} />
      <div className='pedido-conteiner'>
      {
        datos.listaPedidoLibros 
        ? (
          datos.listaPedidoLibros.pedidoLibros?.length<=0 
          ? (<p>Estoy en pedidoLibros vacío</p>)
          : (
            datos.listaPedidoLibros.pedidoLibros
              .filter(funcionFiltro)
              .map((libro, index)=>(
                <PedidoMostrarCard
                key={`libro-${index}`}
                libro={libro}
                />
              ))
          )
        ) : ( <p>Aplicar filtros para que aparezcan los pedidos</p> ) 
      }
      </div>
      <AlertaFormulario
        isAlerta={alertaFiltro}
        setIsAlerta={setAlertaFiltro}
        children={
          <FiltroPedidos 
            setFuncion={setFuncionFiltron}
            setFiltros={setFiltros}
            filtros={filtros}
            setAlertaFiltro={setAlertaFiltro}
          />

        }
      />
      <AlertaFormulario
        isAlerta={alertaOrden}
        setIsAlerta={setAlertaOrden}
        children={
          <FiltroOrdenarPedido 
            setAlerta={setAlertaOrden}
            filtros={filtroOrdenar}
            setFiltros={setFiltroOrdenar}
          />
        }
      />

    </>
  )
}
export default ListaPedidosMostrar;


