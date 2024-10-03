import './alertaFormulario.css'
import { useContext } from 'react';
import { contexto } from '../../../contexto/contexto';
import BotonCerrar from '../../../componentesStilos/botones/botonCerrar';

function AlertaFormulario({ children, isAlerta, setIsAlerta}) {
  const {datos, setDatos} = useContext(contexto);
    const handleCerrarForm =  () => {
      setIsAlerta(false);
      if(datos.libroAeditar||datos.clienteAEditar) {
        setDatos((prev)=>({...prev, libroAeditar:null, clienteAEditar:null}))
      }
    }

    if (!isAlerta) return null;

    return (
      <div className="alerta-fondo-parcial">
        <div className="alerta-frente-parcial">
          <BotonCerrar 
            onClick={handleCerrarForm}
          />
          {children}
        </div>
      </div>
    )
  }
  export default AlertaFormulario;