import { useEffect, useState } from "react";

function useRetardo(funcion, diley){
    const [tiempoId, setTiempoId] = useState(null);

    const retardarFuncion = (...args) =>{
        clearTimeout(tiempoId);
        const nuevoTiempo = setTimeout(()=>{
            funcion(...args)
        }, diley);
        setTiempoId(nuevoTiempo);
    }

    useEffect(()=>{
        return(()=>{
            clearTimeout(tiempoId);
        })
    },[tiempoId])

    return retardarFuncion

}

export default useRetardo;