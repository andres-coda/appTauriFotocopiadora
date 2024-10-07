import { useEffect, useState } from "react";

function useApi(url, methodo, adapter=null) {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [controlador, setControlador] = useState(false)
    
    const token = localStorage.getItem('token');

    useEffect(()=>{
        if (response) {
            setControlador(false);
            const timer = setTimeout(() => {
                setResponse(null);
            }, 3000); // Espera 3 segundos antes de pasar clienteActual a null
            
            // Limpieza del timeout al desmontar el componente o si cambia response
            return () => clearTimeout(timer);
        }

    },[controlador])
    
    const fetchData= async (bodyData) =>{
        const controller = new AbortController();
        setError(null);
        setResponse(null);
        setLoading(true);
        try{
            const res = await fetch(url,{
                method: methodo,
                headers: {
                    'Content-Type': 'application/json',
                    ...(token && {'Authorization': `Bearer ${token}`}),
                },
                signal: controller.signal,
                ...(bodyData && { 'body': bodyData })
            })

            if (!res.ok) {
                throw new Error(`La petición fallo`);
            }            
            const result = await res.json();
            const adapterData = adapter ? adapter(result) : result;
            const timer = setTimeout(() => {
                setResponse(adapterData);
                setControlador(true);
                setError(null);
            }, 2000); // Espera 3 segundos antes de pasar clienteActual a null
            
            // Limpieza del timeout al desmontar el componente o si cambia response
            return () => clearTimeout(timer);
        } catch (err) {
            if (err.name === 'AbortError') {
                console.log('Petición abortada');
            } else { 
                setError(`Error al intentar comunicarse con la base de datos: ${err.message}`);
                console.error(err);
                
            }
        } finally {
            const timer = setTimeout(() => {
                setLoading(false);
                
            }, 2000); // Espera 3 segundos antes de pasar clienteActual a null
            
            // Limpieza del timeout al desmontar el componente o si cambia response
            return () => clearTimeout(timer);
        }
    };

    return {fetchData, response, loading, error};

}

export default useApi;