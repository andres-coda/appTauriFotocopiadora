import { useEffect, useState } from "react";
import useApi from "../../../servicios/Api/useApi";
import useFormGeneral from "../../form/useFormGeneral";
import { precioInicial, validarPrecio } from "../../../funciones/validaciónForm/validarPrecio";
import { errorPedidoInicial } from "../../pedido/cargar/pedidoFormDefault";
import { URL_PRECIOS } from "../../../endPoint/endpoint.ts";
import precioAdapter from "../../../adaptadores/precioAdapter.adapter.js";

function usePrecioCargar(precioAeditar) {
    const {
        onchange, info:precio,
        loading, errorFetch, response,
        handleForm, errorFrom,
    } = useFormGeneral(precioInicial, errorPedidoInicial,precioAeditar);

    const {
        loading:loadingEliminar, errorFetch:errorEliminarFetch, response:responseEliminar,
        fetchData
    } = useApi()

    const [errorEliminar, setErrorEliminar] = useState(errorEliminarFetch);

    useEffect(()=>{
        setErrorEliminar(errorEliminarFetch);
    },[errorEliminarFetch]);

    const url = precioAeditar ? URL_PRECIOS+'/'+precioAeditar.idPrecios : URL_PRECIOS;
  
    const handlePrecioGuardar = async () => {
        await handleForm(url,precio, true, validarPrecio,precioAdapter)
    }

    const handleEliminar = async () => {
        if (precio.idPrecios<= 8) {
          setErrorEliminar((prev)=>({...prev, error: 'No se puede eliminar este precio'}));
          return
        }
        await fetchData(url, null, 'DELETE');
        }

    return {
        onchange, precio, handlePrecioGuardar,
        loading, errorFetch, response, errorFrom,
        errorEliminar,loadingEliminar,responseEliminar, handleEliminar,
    }
}

export default usePrecioCargar;