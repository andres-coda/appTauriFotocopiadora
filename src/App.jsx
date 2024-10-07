import { BrowserRouter, Navigate, Route } from "react-router-dom";
import "./App.css";
import Heder from "./paginas/heder/heder";
import { rutaPrivada, rutaPublica } from "./rutas/rutas";
import AuthGuard from "./rutas/authGuard";
import RutaFalsa from "./rutas/rutaFalsa";
import { lazy, Suspense } from "react";
import CargandoInicial from "./componentes/cargando/cargandoInicial";

const UsuarioMayor = lazy(()=> import('./paginas/usuario/usuarioMayor'))
const RutasPrivadas = lazy(()=> import('./rutas/rutasPrivadas'))

function App() {
  return (
    
    <BrowserRouter>
    <Heder />
      <div className='conteiner-parcial'>
    <Suspense fallback={<CargandoInicial />}>
        <RutaFalsa 
          children={
            <>
            <Route path="/" element={<Navigate to={rutaPrivada.PRIVADA} />} />
            <Route path={rutaPublica.LOGIN} element={<UsuarioMayor/>} />
            <Route element={<AuthGuard />}>
              <Route path={`${rutaPrivada.PRIVADA}/*`} element={<RutasPrivadas />} />
            </Route>
            </>
          }
          />
    </Suspense>
    </div>
    </BrowserRouter>
  );
}

export default App;
