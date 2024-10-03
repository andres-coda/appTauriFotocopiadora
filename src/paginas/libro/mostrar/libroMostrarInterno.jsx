import { useContext } from "react";;
import LibroCard from "../card/libroCard";
import { contexto } from "../../../contexto/contexto";

function LibroMostrarInterno({filtros, buscador}){
    const {datos} = useContext(contexto);
    return(
        <>
      {datos.libros
        .filter(filtros)
        .filter(buscador)
        .map((libro) => (
          <LibroCard 
              libro={libro} 
              key={`Libros-${libro.idLibro}`} 
            />
        ))
      }
        </>
    )
}
export default LibroMostrarInterno;