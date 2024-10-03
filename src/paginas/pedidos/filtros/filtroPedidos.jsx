import { useContext, useEffect, useState } from "react";
import FiltroEstilo from "../../../componentesStilos/filtro/filtroEstilo.jsx";
import { filtrarPedidos } from "../../../servicios/pedido.service.js";
import { contexto } from "../../../contexto/contexto.jsx";
import BotonFormulario from "../../../componentesStilos/botones/botonFormulario.jsx";

function FiltroPedidos({ setFuncion, setFiltros, setAlertaFiltro, filtros }) {
  const { datos, setDatos } = useContext(contexto);
  const [select, setSelect] = useState(true);
  const [error, setError] = useState('');
  const verificacionFiltro = (condicion) => {
    if (filtros.length < 1) return [];
    return filtros.filter(filtro =>
      (condicion && filtro.idEspecificaciones) || (!condicion && filtro.idEstadoPedido)
    );
  }
  const [opcionEspecificaciones, setOpcionEspecificaciones] = useState(verificacionFiltro(true) || []);
  const [opcionEstado, setOpcionEstado] = useState(verificacionFiltro(false) || []);
  const [filtroActivo, setFiltroActivo] = useState('estado');

  useEffect(() => {
    setFuncion(() => {
      const espId = opcionEspecificaciones.map(esp => esp.idEspecificaciones);
      return (libro) => {
        return (
          (opcionEstado.includes(libro.estadoPedido.idEstadoPedido)) ||
          (libro.especificaciones.some(esp => espId.includes(esp.idEspecificaciones))) ||
          (opcionEspecificaciones.length <= 0 || opcionEstado.length <= 0)
        );
      }
    });
  }, [filtros])

  const handleFiltrar = async () => {
    setFiltros([...opcionEstado, ...opcionEspecificaciones]);
    const espId = opcionEspecificaciones.map(esp => esp.idEspecificaciones);
    const especificacionesStr = encodeURIComponent(JSON.stringify(espId));
    const estadoId = opcionEstado.map(estado => estado.idEstadoPedido);
    const estadoStr = encodeURIComponent(JSON.stringify(estadoId));
    const endpoint = `/busqueda?estado=${estadoStr}&especificaciones=${especificacionesStr}`;
    
    filtrarPedidos(endpoint, setError, datos.listaPedidoLibros, setDatos);
    
    setFuncion(() => {
      return (libro) => {
        return (
          (opcionEstado.includes(libro.estadoPedido.idEstadoPedido)) ||
          (libro.especificaciones.some(esp => espId.includes(esp.idEspecificaciones))) ||
          (opcionEspecificaciones.length <= 0 || opcionEstado.length <= 0)
        );
      }
    });

    setAlertaFiltro(false);
  }

  const handleChangeSelectEspecificaciones = (event) => {
    const id = event.target.value;
    const checked = event.target.checked;
    const selectedEspecificaciones = datos.especificaciones.find(esp => esp.idEspecificaciones === parseInt(id));
    if (checked) {
      setOpcionEspecificaciones((prevOpcion) => [...prevOpcion, selectedEspecificaciones]);
    } else {
      setOpcionEspecificaciones((prevOpcion) => prevOpcion.filter((item) => item.idEspecificaciones !== selectedEspecificaciones.idEspecificaciones));
    }
  };

  const handleChangeSelectEstado = (event) => {
    const id = event.target.value;
    const checked = event.target.checked;
    const selectedEstado = datos.estados.find(estado => estado.idEstadoPedido === parseInt(id));
    if (checked) {
      setOpcionEstado((prevOpcion) => [...prevOpcion, selectedEstado]);
    } else {
      setOpcionEstado((prevOpcion) => prevOpcion.filter((item) => item.idEstadoPedido !== selectedEstado.idEstadoPedido));
    }
  };

  const handleSelectEspecificaciones = () => {
    setFiltroActivo('especificaciones')
    setSelect(false)
  }

  const handleSelectEstado = () => {
    setFiltroActivo('estado')
    setSelect(true)
  }

  return (
    <FiltroEstilo
      childrenBtn={
        <BotonFormulario
          textBtn={'Filtrar'}
          onClick={handleFiltrar}
        />
      }
      childrenDerecha={
        <>
          <li
            onClick={handleSelectEstado}
            className={filtroActivo === 'estado' ? 'filtro-activo' : ''}
            title='Estado'
          >Estado</li>
          <li
            onClick={handleSelectEspecificaciones}
            className={filtroActivo === 'especificaciones' ? 'filtro-activo' : ''}
            title='Especificaciones'
          >Especif...</li>
        </>
      }
      childrenIzquierda={
        <>
          {select ? (
            <ul>
              {datos.estados.map((estadoPedido, index) => (
                <li key={`estado-${index}`}>
                  <input
                    type='checkbox'
                    onChange={handleChangeSelectEstado}
                    id={estadoPedido.estado}
                    name='filtro'
                    value={estadoPedido.idEstadoPedido}
                    checked={opcionEstado.some(option => option.idEstadoPedido === estadoPedido.idEstadoPedido)}
                  />
                  <label htmlFor={estadoPedido.estado} title={estadoPedido.estado}>{estadoPedido.estado}</label>
                </li>
              ))}
            </ul>

          ) : (
            <ul>
              {datos.especificaciones.map((esp, index) => (
                <li key={`esp-${index}`}>
                  <input
                    type='checkbox'
                    onChange={handleChangeSelectEspecificaciones}
                    id={esp.nombre}
                    name='filtro'
                    value={esp.idEspecificaciones}
                    checked={opcionEspecificaciones.some(option => option.idEspecificaciones === esp.idEspecificaciones)}
                  />
                  <label htmlFor={esp.nombre} title={esp.nombre}>{esp.nombre}</label>
                </li>
              ))}
            </ul>
          )}
        </>
      }
    />
  )
}
export default FiltroPedidos;