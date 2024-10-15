import { escuelaAdapter } from "../../adaptadores/escuela.adapter";
import { URL_ESCUELAS } from "../../endPoint/endpoint";
import { errorInicial, escuelaInicial, validarErrorEscuela } from "../../funciones/validaciónForm/validarEscuela";
import useFormGeneral from "../form/useFormGeneral";

const escuelaLocalInicial = {...escuelaInicial};
const errorLocalInicial = {...errorInicial}

function useEscuelaForm (escAEditar){
    const url = escAEditar ? URL_ESCUELAS+'/'+escAEditar.idEscuela : URL_ESCUELAS;
    
    const {
      onchange ,handleForm,
      info:escuela, errorFrom,
      response, errorFetch, loading,
     } = useFormGeneral(escuelaLocalInicial, errorLocalInicial,escAEditar);
  
    const cargarEscuela = async () => {
      await handleForm(url, escuela, true, validarErrorEscuela, escuelaAdapter);
    }
    
  
    return {
      onchange, cargarEscuela, 
      escuela, errorFrom,
      response, errorFetch, loading,
    }
  }

  export default useEscuelaForm;
