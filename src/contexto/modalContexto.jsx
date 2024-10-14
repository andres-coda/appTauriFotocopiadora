import { createContext, useContext, useState } from "react";

export const modalContexto = createContext({});

export const ProveiderModalContext = ({children}) =>{
    const [estadoModal, setEstadoModal] = useState(false);

    return(
        <modalContexto.Provider value={{setEstadoModal, estadoModal}}>
            {children}
        </modalContexto.Provider>
    )
}

export const useModalContext = () => {
    const contexto = useContext(modalContexto);
    if (!contexto) {
        return new Error ('El contexto modalContexto no existe');
    }

    return contexto;
}