import { useContext, useState } from "react";
import { contexto } from "../../contexto/contexto";
import { useNavigate } from "react-router-dom";
import MiniNav from "../../componentes/miniHeder/miniNav";
import LeftArrow from '../../assets/arrowleft.svg'
import MostrarCurso from "../escuela/mostrar/mostrarCurso";


function CursosGeneral() {
  const [isAlerta, setIsAlerta] = useState(false);
  const [cursoAEditar, setCursoAEditar] = useState(null);
  const { datos } = useContext(contexto);
  const [error, setError] = useState({error:''})
  const navigate = useNavigate();
  
  const handleCurso = () => {
    console.log(e);
    
  }

  return (
    <>
      <MiniNav
        children={
          <>
            <li onClick={(e) => navigate(-1)}
              title='Atras'
            ><img src={LeftArrow} alt="Atras"/></li>
            <li onClick={() => { setIsAlerta(true), setEscAEditar(null) }}>Cursos</li>
          </>
        }
      />
      <button onClick={()=>console.log(datos.cursos)}>cursos</button>
      {datos.cursos?.map((curso, index)=>(
        <MostrarCurso 
          key={index}
          curso={curso} 
          handleCurso={handleCurso} 
          eliminar={false}
        />
      ))}
    </>
  )
}

export default CursosGeneral;