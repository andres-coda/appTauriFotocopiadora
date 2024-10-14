import { useState, useEffect } from "react";
import { useGlobalContext } from "../../../contexto/contexto";
import { clienteInicial, errorClienteInicial } from "./clienteFormDefault";
import { URL_CLIENTES } from "../../../endPoint/endpoint";
import useFormGeneral from "../../form/useFormGeneral";
import { validarCliente } from "../../../funciones/validaciónForm/validarCliente";
import useCoinsidencias from "../../coincidencias/useCoincidencias";
import { rutasGenerales } from "../../../rutas/rutas";
import { useNavigate } from "react-router-dom";
import { clienteAdapter } from "../../../adaptadores/cliente.adapter";

const clienteInicialLocal = {...clienteInicial}

function useClienteForm(personaInicial){
    const { datos, setDatos } = useGlobalContext();
    const url = datos.clienteAEditar ? `${URL_CLIENTES}/${datos.clienteAEditar.idPersona}` : URL_CLIENTES;
    const navigate= useNavigate();

    const {
      handleForm, onchange, recetear:recetearPersona,
      errorPost, loading, response, 
      info, errorFrom, setInfo
    } = useFormGeneral( personaInicial || clienteInicialLocal, errorClienteInicial, datos.clienteAEditar);


    // validarCliente, url, clienteAdapter
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

    const cargarCliente = () =>{
      handleForm(url, info,true, validarCliente, clienteAdapter);
    }

    const handleAtras = () => {
      setDatos((prev)=>({...prev, clienteAEditar:null}));
      navigate(-1);
    }
   

    return { 
      handleAtras, cargarCliente, onchange, handleListaClientes, recetearPersona,
      errorPost, loading, response, 
      info, errorFrom, 
      coincidencias, alertaCoincidencia, handleSelec 
    }
}

export default useClienteForm;