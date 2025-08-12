import { Navigate, Outlet } from "react-router-dom";
import { rutaPublica } from "./rutas";
import { useGlobalContext } from "../contexto/contexto";

export const AuthGuard = () => {
  const {userLogin} = useGlobalContext();
  return userLogin && userLogin.email ? <Outlet /> : <Navigate replace to={rutaPublica.LOGIN} />
}

export default AuthGuard;