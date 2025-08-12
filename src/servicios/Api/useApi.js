import { useEffect, useState } from "react";
import useRetardo from "../../hooks/tiempo/useRetardo";

function useApi(urlGet=null, adapterGet=null) {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorFetch, setErrorFetch] = useState(null);
    const [controlador, setControlador] = useState(false);
    
    

    const retardoRecetRetardo = useRetardo(()=>{setResponse(null)}, 3000)

    useEffect(()=>{
        if (controlador){
            retardoRecetRetardo();
        }
    },[controlador])
    
    const fetchData= async ( url=null, bodyData=null, methodo=null, adapter=null) =>{
        setErrorFetch(null);
        setResponse(null);
        setLoading(true);

        const urlLocal = url || urlGet;
        const adapterLocal = adapter || adapterGet;
        if (!urlLocal) {
            throw new Error('No hay url en el pedido')
        }

        const controller = new AbortController();
        const token = localStorage.getItem('token');
        try{
            const res = await fetch(urlLocal,{
                method: methodo || 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token && {'Authorization': `Bearer ${token}`}),
                },
                signal: controller.signal,
                ...(bodyData && { 'body': bodyData })
            })

            if (!res.ok) {
                let errorMsg = 'La petición falló';
                try {
                    const errorData = await res.json(); 
                    errorMsg = errorData?.message || errorMsg; 
                } catch (jsonErr) {
                    console.error('No se pudo parsear la respuesta de error JSON:', jsonErr);
                }
                throw new Error(errorMsg);
            }            
            const result = await res.json();
            const adapterData = adapterLocal ? adapterLocal(result) : result;
            setResponse(adapterData);
            setControlador(true);
            setErrorFetch(null);
        } catch (err) {
            if (err.name === 'AbortError') {
                console.log('Petición abortada');
            } else { 
                setErrorFetch(`Error al intentar comunicarse con la base de datos: ${err.message}`);
                console.error(err);                
            }
        } finally {
            setLoading(false);
        }
    };

    return {fetchData, response, loading, errorFetch};

}

export default useApi;