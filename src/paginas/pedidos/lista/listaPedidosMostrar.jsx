import MiniNav from '../../../componentes/miniHeder/miniNav';
import { contexto } from '../../../contexto/contexto';
import './listaPedidos.css';
import { useContext, useState } from 'react';
import Reciclar from '../../../assets/recycle.svg'
import Filtrar from '../../../assets/filter.svg'
import Ordenar from '../../../assets/orden.svg'
import ListaFiltros from '../../../componentes/filtros/listaFiltros';
import PedidoMostrarCard from '../card/pedidoMostrarCard';
import FiltroPedidos from '../filtros/filtroPedidos';
import useFiltro from '../../../hooks/filtros/useFiltro';
import Modal from '../../../componentes/modal/modal';
import { useModalContext } from '../../../contexto/modalContexto';
import FiltroOrdenarPedido from '../filtros/filtroOrdenarPedido';

function ListaPedidosMostrar() {
  const { filtros, recetearFiltros } = useFiltro();
  const { setEstadoModal } = useModalContext()
  const { datos } = useContext(contexto);
  const [tipoFiltro, setTipoFiltro] = useState(false)

  return (
    <>
      <MiniNav
        children={
          <>
            <li
              className='btn-add'
              title='Recetear busqueda'
              onClick={recetearFiltros}
            ><img src={Reciclar} alt='Recetear busqueda' /></li>
            <li
              className='btn-add' title='Filtrar pedidos'
              onClick={() => { setTipoFiltro(false), setEstadoModal(true) }}
            ><img src={Filtrar} alt='Filtrar pedidos' /></li>
            <li
              className='btn-add'
              title='Ordenar pedidos'
              onClick={() => { setTipoFiltro(true), setEstadoModal(true) }}
            ><img src={Ordenar} alt='Ordenar pedidos' /></li>
          </>
        }
      />
      <h2 className='titulos'>Lista de pedidos</h2>
      <ListaFiltros lista={filtros.filtro} tipo={'pedido'}/>
      <ListaFiltros lista={filtros.filtro.filter(fl => fl.tipo === 'orden')} />
      {!datos.listaPedidoLibros || datos.listaPedidoLibros.pedidoLibros?.length <= 0 ? (
        <p>
          {`No hay pedidos ${filtros && filtros.length > 0
              ? filtros.map(filtro =>
                filtro.filtro.nombre ? filtro.filtro.nombre : filtro.filtro.estado
              ).join(', ')
              : 'sin filtros aplicados'
            }. Aplicar nuevos filtros ...`}
        </p>
      ) : (
        <div className='pedido-conteiner'>          
          {
            datos.listaPedidoLibros.pedidoLibros
              .filter(filtros.funcionPedido)
              .map((libro, index) => (
                <PedidoMostrarCard
                  key={`libro-${index}`}
                  libro={libro}
                />
              ))
          }
        </div>
      )}

      <Modal children={!tipoFiltro ? <FiltroPedidos /> : <FiltroOrdenarPedido />} />
    </>
  )
}
export default ListaPedidosMostrar;


