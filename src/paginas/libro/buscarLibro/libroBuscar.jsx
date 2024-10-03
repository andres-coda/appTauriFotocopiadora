import { useContext, useEffect, useState } from "react";
import { contexto } from "../../../contexto/contexto";
import Inputs from "../../../componentes/input/input";
import AlertaCoincidencias from "../../../componentes/alertas/alertaCoincidencias/alertaCoincidencias";
import BotonAdd from "../../../componentesStilos/botones/botonAdd";

function LibroBuscar({setAlertaNew}) {
  const { datos, setPedidos, pedidos, currentPedidoIndex, setDatos } = useContext(contexto);
  const [isAlerta, setIsAlerta] = useState({ nombre: false });
  const [coincidencias, setCoincidencias] = useState({ nombre: [] });
  const [libro, setLibro] = useState({ nombre: "" });

  useEffect(() => {
    const currentPedidoLibro = pedidos[currentPedidoIndex]?.pedidoLibro;
    if (currentPedidoLibro) {
      setLibro(currentPedidoLibro.libro || { nombre: "" });
    }
  }, [currentPedidoIndex, pedidos]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setLibro({
      ...libro,
      [name]: value
    });

    if (value.length > 1) {
      const coincidenciaFiltradas = datos.libros?.filter(libro =>
        libro[name].toLowerCase().includes(value.toLowerCase())
      ) || [];
      setCoincidencias(prev => ({ ...prev, [name]: coincidenciaFiltradas }));

      if (coincidenciaFiltradas?.length > 0) {
        setIsAlerta(prev => ({ ...prev, [name]: true }));
      } else {
        setIsAlerta(prev => ({ ...prev, [name]: false }));
      }
    } else {
      setCoincidencias(prev => ({ ...prev, [name]: [] }));
      setIsAlerta(prev => ({ ...prev, [name]: false }));
    }
  };

  const handleSelect = (libro) => {
    setLibro(libro);
    setIsAlerta({ nombre: false });
    setCoincidencias({ nombre: [] });
    const updatedPedidos = [...pedidos];
    const updatedPedido = {
      ...updatedPedidos[currentPedidoIndex],
      pedidoLibro: {
        ...updatedPedidos[currentPedidoIndex].pedidoLibro,
        libro
      }
    };
    updatedPedidos[currentPedidoIndex] = updatedPedido;
    setPedidos(updatedPedidos);
  }

  const handleNuevoLibro = (e) => {
    e.preventDefault()
    setAlertaNew(true);
  }

  return (
    <>
      <div className="form-doble">
        <Inputs
          name={'nombre'}
          texto={'Nombre del libro'}
          tipo={'text'}
          handleOnChange={(e) => handleOnChange(e)}
          valor={libro.nombre || ""}
        />
        <BotonAdd titulo={'Nuevo libro'} onClick={(e) => handleNuevoLibro(e)} />
      </div>

      <AlertaCoincidencias
        isAlerta={isAlerta.nombre}
        children={
          <>
            {coincidencias.nombre.map((libro, index) => (
              <li key={`nombre-${index}`} onClick={() => handleSelect(libro)}>
                <h6>{libro.nombre}</h6>
                <div>
                  {libro.materia ? <p>Materia: {libro.materia.nombre}</p> : null}
                  <p>Edición: {libro.edicion}</p>
                  <p>Autor: {libro.autor}</p>
                  <p>Pg: {libro.cantidadPg}</p>
                </div>
              </li>
            ))}
          </>
        }
      />
    </>
  )
}

export default LibroBuscar;