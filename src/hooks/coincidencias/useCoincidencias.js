import { useEffect, useState } from "react";

function useCoinsidencias(datos,  condicion){
    const [coincidencias, setCoincidencias] = useState([]);
    const [alertaCoincidencia, setAlertaCoincidencia] = useState(false);
    
    useEffect(()=>{
        if (condicion.value.length < 1) {
            setCoincidencias([]);
            setAlertaCoincidencia(false);
            return
        } 

        const coincidenciasFiltradas = datos?.filter(dato =>
            dato[condicion.name].toLowerCase().includes(condicion.value.toLowerCase())
        );
        
        setCoincidencias(coincidenciasFiltradas);
        
        if (coincidencias.length > 0) {         
            setAlertaCoincidencia(true)
        } else {
            setAlertaCoincidencia(false)
        }
    },[condicion.value]);

    const setSeleccion = () => {
        setAlertaCoincidencia(false)
        setCoincidencias([]);
    }

    return { coincidencias, alertaCoincidencia, setSeleccion}
}

export default useCoinsidencias;