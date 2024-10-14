import { useEffect, useState } from "react";
import { URL_LIBRO_PEDIDO } from "../../endPoint/endpoint.ts";
import useApi from "../../servicios/Api/useApi";
import { useGlobalContext } from "../../contexto/contexto";
import listaLibroPedidoAadapter from "../../adaptadores/listaLibroPedidoAdapter.js";
import { useModalContext } from "../../contexto/modalContexto.jsx";

const filtroIncial = {
  tipo:'',
  filtro:''
}

const funcionInicial = {
  funcionLibro: ()=> (elemento) => true,
  funcionPedido: ()=> (elemento) => true 
}

const filtrosInicial = {
  ...funcionInicial,
  filtro:[]
}

function useFiltro() {
  const { datos, setDatos, filtros, setFiltros } = useGlobalContext();
  const {setEstadoModal} = useModalContext();

  const  { fetchData, loading, response, errorFetch } = useApi();

  const verificacionFiltro = (condicion) => {
    if (filtros.filtro.length < 1) return [];
    const newFiltros = filtros.filtro
      .filter(filtro =>
          (condicion==='esp' && filtro.filtro?.idEspecificaciones) || 
          (condicion==='estado' && filtro.filtro?.idEstadoPedido) || 
          (condicion==='esc' && filtro.filtro?.idEscuela) || 
          (condicion==='mat' && filtro.filtro?.idMateria)

        )
      .map(filtro=>filtro.filtro);   
     
    return newFiltros;
  }
  
  const [opcionEspecificaciones, setOpcionEspecificaciones] = useState(verificacionFiltro('esp') || []);
  const [opcionEstado, setOpcionEstado] = useState(verificacionFiltro('estado') || []);
  const [opcionEscuela, setOpcionEscuela] = useState(verificacionFiltro('esc')||[]);
  const [opcionMateria, setOpcionMateria] = useState(verificacionFiltro('mat')||[]);
  const [filtroActivo, setFiltroActivo] = useState('estado');
  
  const espId = opcionEspecificaciones.map(esp => esp.idEspecificaciones);
  
  useEffect(() => {    
    if (response) {
      const listaPedidoLibros = { ...datos.listaPedidoLibros, pedidoLibros: response }
      setDatos((prev) => ({ ...prev, listaPedidoLibros: listaPedidoLibros }));
      setEstadoModal(false);
    }    
  }, [response]);

  const handleFiltrarLibro=()=>{
    setFiltros((prev)=>{
      const newFiltro = [...opcionMateria, ...opcionEscuela];
      const filtro = newFiltro.map(oe => ({ tipo: 'libro', filtro: oe })); 
      
      const funcion = (libro) => {
        const escuelasLibro = libro.profeMaterias?.map(pm => pm.curso.escuela.idEscuela) || [];
        const materiaSelec = opcionMateria.map(m => m.idMateria);
        return (
          (materiaSelec.includes(libro.materia?.idMateria) && opcionEscuela.length<=0) ||
          (opcionEscuela.some(escuela => escuelasLibro.includes(escuela.idEscuela)) && opcionMateria.length<=0) ||
          (materiaSelec.includes(libro.materia?.idMateria) &&opcionEscuela.some(escuela => escuelasLibro.includes(escuela.idEscuela))) ||
          (opcionEscuela.length<=0 && opcionMateria.length<=0)
        );
      }
      const newFiltros = {...prev, funcionLibro:funcion, filtro:filtro}
      return newFiltros;
    });
    setEstadoModal(false);
  }


  const handleFiltrar = async () => {
    setFiltros((prev)=>{
      const newFiltro = [...opcionEstado, ...opcionEspecificaciones];
      const filtro = newFiltro.map(oe => ({ tipo: 'pedido', filtro: oe })); 

      const funcion = (libro) => {
        const libroEspIds = libro.especificaciones.map(esp => esp.idEspecificaciones);
        const espValidas = espId.every(idEsp => libroEspIds.includes(idEsp));        
        return (
          (opcionEstado.length === 0 || opcionEstado.some(oe=> oe.idEstadoPedido ==libro.estadoPedido.idEstadoPedido)) &&
          (opcionEspecificaciones.length === 0 || espValidas)
        )
      };
      const newFiltros = {...prev, funcionPedido:funcion, filtro:filtro}
      return newFiltros
    });

    const especificacionesStr = encodeURIComponent(JSON.stringify(espId));
    const estadoId = opcionEstado.map(estado => estado.idEstadoPedido);
    const estadoStr = encodeURIComponent(JSON.stringify(estadoId));
    const endpoint = `/busqueda?estado=${estadoStr}&especificaciones=${especificacionesStr}`;
    
    await fetchData(URL_LIBRO_PEDIDO+endpoint, null, 'GET', listaLibroPedidoAadapter );
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

  const handleChangeSelectEscuela = (event) => {
    const id = event.target.value;
    const checked = event.target.checked;
    const selectedEscuela = datos.escuelas.find(escuela => escuela.idEscuela === parseInt(id));
    if (checked) {
      setOpcionEscuela((prevOpcion) => [...prevOpcion, selectedEscuela]);
    } else {
      setOpcionEscuela((prevOpcion) => prevOpcion.filter((item) => item.idEscuela !== selectedEscuela.idEscuela));
    }
  };

  const handleChangeSelectMateria = (event) => {
    const id = event.target.value;
    const checked = event.target.checked;
    const selectedMateria = datos.materias.find(materia => materia.idMateria === parseInt(id));
    if (checked) {
      setOpcionMateria((prevOpcion) => [...prevOpcion, selectedMateria]);
    } else {
      setOpcionMateria((prevOpcion) => prevOpcion.filter((item) => item.idMateria !== selectedMateria.idMateria));
    }
  };

  const recetearFiltros = () => {
    setFiltros(filtrosInicial)
    setDatos((prev)=>({...prev,listaPedidoLibros:null}))
  }

  return {
    handleFiltrar, handleFiltrarLibro,
    loading, response, errorFetch,
    handleChangeSelectEspecificaciones, handleChangeSelectEstado, 
    handleChangeSelectMateria, handleChangeSelectEscuela,
    recetearFiltros, setFiltroActivo,
    filtroActivo, filtros,
    opcionEspecificaciones, opcionEstado,opcionEscuela, opcionMateria,
  }
}

export default useFiltro;