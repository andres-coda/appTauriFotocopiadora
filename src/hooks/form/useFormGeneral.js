import { useContext, useEffect, useState } from "react";
import { contexto } from "../../contexto/contexto";
import { useNavigate } from "react-router-dom";
import usePostApi from "../Api/usePostApi";
import usePutApi from "../Api/usePutApi";

function useFormGeneral(validacion, url, infoInicial, infoAEditar, errorInicial, adapter) {
  const { setDatos } = useContext(contexto);
  const [alerta, setAlerta] = useState(false);
  const navigate = useNavigate();

  const [errorFrom, setErrorFrom] = useState(errorInicial);
  const [claseError, setClaseError] = useState('sugerencia-error');

  const [info, setInfo] = useState(infoAEditar || infoInicial);

  const { postData, error: errorPost, loading, response } = usePostApi(url, adapter);
  const { putData, error: errorPut, loading: loadingPut, response: responsePut } = usePutApi(url, adapter);

  useEffect(() => {
    if (response || responsePut) {
      setDatos((prev) => ({ ...prev, clienteAEditar: null, libroAEditar:null }));
      setInfo(infoInicial);
      setErrorFrom(errorInicial);
    } 
    if (!response && !responsePut) {
      setAlerta(false);
    }
  }, [response, responsePut]);

  const onchange= (e) => {
    const {name, value} = e.target;    
    setInfo((prev)=>({
      ...prev, 
      [name] : value || ''
    }));
  }

  const handleForm = async (infoEnviar) => {
    const datoEnviar = infoEnviar || info;
    const newError = validacion(datoEnviar);

    if (newError.error) {
      setErrorFrom(newError);
      setClaseError('');
      return
    }

    setAlerta(true);

    if (infoAEditar) {
      await putData(datoEnviar);
    } else {
      await postData(datoEnviar);
    }
  }

  const handleAtras = () => {
    setDatos((prev)=>({...prev, clienteAEditar:null, libroAEditar:null}));
    navigate(-1);
  }

  const recetear = () => {
    setInfo(infoInicial);
    setErrorFrom(errorInicial);
  }

  return { 
    handleForm, handleAtras, onchange, recetear, 
    errorPost, loading, response, 
    errorPut, loadingPut, responsePut, 
    info, errorFrom, setInfo, claseError,
    alerta, setAlerta}
}

export default useFormGeneral;