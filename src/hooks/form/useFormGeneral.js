import { useContext, useEffect, useState } from "react";
import { contexto } from "../../contexto/contexto";
import { useNavigate } from "react-router-dom";
import useApi from "../../servicios/Api/useApi";
import { useModalContext } from "../../contexto/modalContexto";

function useFormGeneral(infoInicial, errorInicial=null, infoAEditar=null) {
  const { setEstadoModal} = useModalContext();
  const [condicionModal, setCondicionModal ] = useState(false);

  const [errorFrom, setErrorFrom] = useState(errorInicial || {});

  const [info, setInfo] = useState(infoAEditar || infoInicial);

  const { fetchData, errorFetch, loading, response } = useApi();



  useEffect(() => {
    if (response) {
      setCondicionModal(true);
      setInfo(infoInicial);
      setErrorFrom(errorInicial);
    } 
    if (condicionModal) {
      setCondicionModal(false);
    setEstadoModal(false);
    }
  }, [response]);

  const onchange= (e) => {
    const {name, value} = e.target;    
    setInfo((prev)=>({
      ...prev, 
      [name] : value || ''
    }));
  }

  const handleForm = async (url, infoEnviar, JsonFunction=false, validacion, adapter) => {
    const datoEnviar = infoEnviar || info;
    const newError = validacion(datoEnviar);
    
    if (newError.error) {
      setErrorFrom(newError);
      return
    }

    const method = infoAEditar ? 'PUT' : 'POST'
    setEstadoModal(true);

    const datoGuardar = JsonFunction ? JSON.stringify(datoEnviar) : datoEnviar

    await fetchData(url, datoGuardar, method, adapter);
  }

  const recetear = () => {
    setInfo(infoInicial);
    setErrorFrom(errorInicial);
  }



  return { 
    handleForm, onchange, recetear, 
    errorFetch, loading, response, 
    info, errorFrom, setInfo}
}

export default useFormGeneral;