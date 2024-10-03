import { useState } from "react";
import Inputs from "../../../componentes/input/input";
import './filtroBuscarLibro.css'

function FiltroBuscarLibro({setFuncionBuscar}) {
  const [buscador, setBuscador] = useState('');
  const handleChangeSearch = (e) => {
    const { value } = e.target;
    setBuscador(value);
    setFuncionBuscar(()=>{
      return (libro) =>
        libro.nombre.toLowerCase().includes(value.toLowerCase())
    })
  }
  return (
      <div className="filtro-buscar-libro">
        <Inputs
          name={'nombre'}
          texto={'Buscar libros'}
          tipo={'text'}
          handleOnChange={(e) => handleChangeSearch(e)}
          valor={buscador}
          clase={'buscar-input'}
          />
      </div>
     
  )
}
export default FiltroBuscarLibro;
