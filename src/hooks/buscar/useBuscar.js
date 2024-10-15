import { useState } from "react";
import { useGlobalContext } from "../../contexto/contexto";
import useCoinsidencias from "../coincidencias/useCoincidencias";

const errorFormInicial = {error:''}

const useBuscar = (lista, name) => {
  const [busqueda, setBusqueda] = useState({[name]:''});
  const [errorForm, setErrorForm] = useState(errorFormInicial);
  const {setFiltros} = useGlobalContext() 

  const { coincidencias, alertaCoincidencia, setSeleccion } = useCoinsidencias(lista,  { name, value: busqueda[name] });

  const handleChangeSearch = (e) => {
    const { name, value } = e.target;
    setBusqueda((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSeleccionElemento = (elemento) => {
    if (!elemento) {
      setErrorForm((prev)=>({
        ...prev,
        error:'Debe seleccionar un elemento de la lista para comenzar la busqueda'
      }));
      return
    }
    setFiltros((prev)=>({
      ...prev,
      busqueda:elemento
    }));
    setBusqueda(elemento)
    setSeleccion();
    setErrorForm(errorFormInicial)
  }

  return {
    coincidencias, alertaCoincidencia, setSeleccion,
    handleChangeSearch, handleSeleccionElemento,
    busqueda, errorForm
  }
}

export default useBuscar;