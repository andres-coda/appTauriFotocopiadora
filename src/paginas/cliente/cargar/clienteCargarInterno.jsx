import { useContext, useState } from "react";
import { contexto } from "../../../contexto/contexto";
import Inputs from "../../../componentes/input/input";
import AlertaCoincidencias from '../../../componentes/alertas/alertaCoincidencias/alertaCoincidencias'
import ClienteCabecera from "../../../componentes/cliente/clienteCabecera/clienteCabecera";

const alertaInicial = { nombre: false, celular: false, email: false };
const coincidenciaInicial = { nombre: [], celular: [], email: [] };

function ClienteCargarInterno({ persona, setPersona, error }) {
  const { datos } = useContext(contexto);
  const [isAlerta, setIsAlerta] = useState(alertaInicial);
  const [coincidencias, setCoincidencias] = useState(coincidenciaInicial);

  const HandleOnChange = (e) => {
    const valor = e.target.value;
    const name = e.target.name;

    setPersona({
      ...persona,
      [name]: valor
    });

    if (valor.length > 2) {
      const coincidenciaFiltradas = datos.clientes?.filter(cliente =>
        cliente[name].toLowerCase().includes(valor.toLowerCase())
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

  const handleSelect = (cliente) => {
    setPersona(cliente);
    setIsAlerta(alertaInicial);
    setCoincidencias(coincidenciaInicial);
  }
  
  return (
    <>
      <Inputs
        name={'nombre'}
        texto={'Nombre'}
        tipo={'text'}
        handleOnChange={HandleOnChange}
        valor={persona.nombre}
        error={error.nombre}
      />
      <AlertaCoincidencias
        isAlerta={isAlerta.nombre}
        children={
          <>
            {coincidencias.nombre.map((cliente, index) => (
              <li key={`nombre-${index}`} onClick={() => handleSelect(cliente)}>
                <ClienteCabecera cliente={cliente} />
              </li>
            ))}
          </>
        }
      />
      <Inputs
        name={'celular'}
        texto={'Celular'}
        tipo={'tel'}
        handleOnChange={HandleOnChange}
        valor={persona.celular}
        error={error.celular}
      />
      <AlertaCoincidencias
        isAlerta={isAlerta.celular}
        children={
          <>

            {coincidencias.celular.map((cliente, index) => (
              <li key={`nombre-${index}`} onClick={() => handleSelect(cliente)}>
                <ClienteCabecera cliente={cliente} />
              </li>
            ))}

          </>
        }
      />
      <Inputs
        name={'email'}
        texto={'Mail'}
        tipo={'email'}
        handleOnChange={HandleOnChange}
        valor={persona.email}
        error={error.email}
      />
      <AlertaCoincidencias
        isAlerta={isAlerta.email}
        children={
          <>

            {coincidencias.email.map((cliente, index) => (
              <li key={`nombre-${index}`} onClick={() => handleSelect(cliente)}>
                <ClienteCabecera cliente={cliente} />
              </li>
            ))}
          </>
        }
      />
    </>
  )
}
export default ClienteCargarInterno;