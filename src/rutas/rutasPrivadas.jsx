import { Route } from "react-router-dom";
import { rutaPrivada } from "./rutas";
import RutaFalsa from "./rutaFalsa";
import { lazy } from "react";
import LibroMostrar from '../paginas/libro/mostrar/libroMostrar.jsx'
import LibroGrande from "../paginas/libro/mostrar/libroGrande.jsx";
import PedidoCargar from "../paginas/pedidos/cargar/pedidoCargar.jsx";

const ListaUsuarios = lazy(()=> import('../paginas/usuario/lista/usuarioLista'));
const ListaPedidosMostrar = lazy(() => import("../paginas/pedidos/lista/listaPedidosMostrar"));
const PedidoMostrarEsp = lazy(() => import("../paginas/pedidos/mostrar/pedidoMostrarEsp"));
const PedidoMostrar = lazy(() => import("../paginas/pedidos/mostrar/pedidoMostrar"));
const ClienteCargar = lazy(() => import("../paginas/cliente/cargar/clienteCargar"));
const ClienteMostrar = lazy(() => import("../paginas/cliente/mostrar/clienteMostrar"));
const ClienteMostrarIndividual = lazy(() => import("../paginas/cliente/mostrar/clienteMostrarIndividual"));
const MostrarEscuela = lazy(()=> import('../paginas/escuela/mostrar/mostrarEscuela.jsx'))
const CursosGeneral = lazy(()=> import('../paginas/cursos/cursosGeneral.jsx'))
const MostrarPrecios = lazy(()=> import('../paginas/precios/mostrarPrecios.jsx'));

function RutasPrivadas() {
  return (
    <RutaFalsa
      children={
        <>
          <Route path={'/'} element={<ListaUsuarios />} />
          <Route path={rutaPrivada.USUARIOS} element={<ListaUsuarios />} />
          <Route path={rutaPrivada.CLIENTEINDIVIDUAL} element={<ClienteMostrarIndividual />} />
          <Route path={rutaPrivada.CLIENTES} element={<ClienteMostrar />} />
          <Route path={rutaPrivada.CLIENTENUEVO} element={<ClienteCargar />} />
          <Route path={rutaPrivada.PEDIDOS} element={<ListaPedidosMostrar />} />
          <Route path={rutaPrivada.PEDIDOINDIVIDUAL} element={<PedidoMostrar />} />
          <Route path={rutaPrivada.PEDIDOESPECIAL} element={<PedidoMostrarEsp />} />
          <Route path={rutaPrivada.LIBROINDIVIDUAL} element={<LibroGrande />} />
          <Route path={rutaPrivada.LIBROLISTA} element={<LibroMostrar />} />
          <Route path={rutaPrivada.ESCUELAS} element={<MostrarEscuela />} />
          <Route path={rutaPrivada.CURSOS} element={<CursosGeneral />} />
          <Route path={rutaPrivada.PRECIOS} element={<MostrarPrecios />} />
          <Route path={rutaPrivada.PEDIDONUEVO} element={<PedidoCargar />} />
        </>
      }
    />
  )
}

export default RutasPrivadas;