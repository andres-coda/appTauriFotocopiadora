import { Navigate, Outlet } from "react-router-dom";
import { rutaPublica } from "./rutas";
import { useContext } from "react";
import { contexto } from "../contexto/contexto";

export const AuthGuard = () => {
  const {userLogin} = useContext(contexto);
  return userLogin && userLogin.email ? <Outlet /> : <Navigate replace to={rutaPublica.LOGIN} />
}

export default AuthGuard;