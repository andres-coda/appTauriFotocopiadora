import { useContext, useState, useEffect } from "react";
import { contexto } from "../../../contexto/contexto";
import { clienteInicial, errorClienteInicial } from "./clienteFormDefault";
import { URL_CLIENTES } from "../../../endPoint/endpoint";
import useFormGeneral from "../../form/useFormGeneral";
import { validarCliente } from "../../../funciones/validaciónForm/validarCliente";
import useCoinsidencias from "../../coincidencias/useCoincidencias";
import { rutasGenerales } from "../../../rutas/rutas";
import { useNavigate } from "react-router-dom";
import { clienteAdapter } from "../../../adaptadores/cliente.adapter";

function useClienteForm(){
    const { datos, setDatos } = useContext(contexto);
    const url = datos.clienteAEditar ? `${URL_CLIENTES}/${datos.clienteAEditar.idPersona}` : URL_CLIENTES;
    const navigate= useNavigate();

    const {
      handleForm, handleAtras, onchange,
      errorPost, loading, response, 
      errorPut, loadingPut, responsePut, 
      info, errorFrom, setInfo, 
      alerta, setAlerta,
    } = useFormGeneral(validarCliente, url, clienteInicial, datos.clienteAEditar, errorClienteInicial, clienteAdapter );

    const {coincidencias:coincNombre, alertaCoincidencia:coincNombreAlerta, setSeleccion:coincNombreSelec} = useCoinsidencias(datos.clientes, { name: 'nombre', value: info.nombre });
    const {coincidencias:coincCel, alertaCoincidencia:coincCelAlerta, setSeleccion:coincCelSelec} = useCoinsidencias(datos.clientes, { name: 'celular', value: info.celular });
    const {coincidencias:coincEmail, alertaCoincidencia:coincEmailAlerta, setSeleccion:coincEmailSelec} = useCoinsidencias(datos.clientes, { name: 'email', value: info.email });

    const [ coincidencias, setCoincidencias] = useState({
        nombre: coincNombre,
        celular: coincCel,
        email: coincEmail
    });
    
    const [alertaCoincidencia, setAlertaCoincidencia] = useState({
        nombre: coincNombreAlerta,
        celular: coincCelAlerta,
        email: coincEmailAlerta
    })

    const handleSelec = (cliente) => {
      setInfo(cliente);
      coincNombreSelec();
      coincCelSelec();
      coincEmailSelec();
    }

    useEffect(()=>{
        const newCoincidencia ={
            nombre: coincNombre,
            celular: coincCel,
            email: coincEmail
        }
        setCoincidencias(newCoincidencia);
    }, [coincNombre, coincCel, coincEmail]);

    useEffect(()=>{
        const newAlerta ={
            nombre: coincNombreAlerta || false,
            celular: coincCelAlerta || false,
            email: coincEmailAlerta || false
        }
        setAlertaCoincidencia(newAlerta);
        
    }, [coincNombreAlerta, coincCelAlerta, coincEmailAlerta]);

    const handleListaClientes= () => {
      setDatos((prev)=>({...prev, clienteAEditar:null}))
      navigate(rutasGenerales.CLIENTES);
    }
   

    return { handleAtras, handleForm, onchange, handleListaClientes,
      errorPost, loading, response, 
      errorPut, loadingPut, responsePut, 
      info, errorFrom, 
      coincidencias, alertaCoincidencia, handleSelec,
      alerta, setAlerta }
}

export default useClienteForm;