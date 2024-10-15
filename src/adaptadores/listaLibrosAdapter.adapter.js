import { libroAdapterGeneral } from "./libro.adapter";

const listaLibroAdapter= (res)=>{
    const newRes = res?.map(libro => libroAdapterGeneral(libro)) || [];
    return newRes;
}

export default listaLibroAdapter;