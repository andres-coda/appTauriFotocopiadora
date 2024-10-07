import Inputs from "../../../componentes/input/input";
import AlertaCoincidencias from '../../../componentes/alertas/alertaCoincidencias/alertaCoincidencias'
import ClienteCabecera from "../../../componentes/cliente/clienteCabecera/clienteCabecera";

function ClienteCargarInterno({ persona, error, handleOnChange, coincidencias, alerta, handleSelec }) {
 
  return (
    <>
      <Inputs
        name={'nombre'}
        texto={'Nombre'}
        tipo={'text'}
        handleOnChange={(e)=>handleOnChange(e)}
        valor={persona.nombre}
        error={error.nombre}
      />
      <AlertaCoincidencias
        isAlerta={alerta.nombre}
        children={
          <>
            {coincidencias.nombre.map((cliente, index) => (
              <li key={`nombre-${index}`} onClick={() => handleSelec(cliente)}>
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
        handleOnChange={(e)=>handleOnChange(e)}
        valor={persona.celular}
        error={error.celular}
      />
      <AlertaCoincidencias
        isAlerta={alerta.celular}
        children={
          <>

            {coincidencias.celular.map((cliente, index) => (
              <li key={`nombre-${index}`} onClick={() => handleSelec(cliente)}>
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
        handleOnChange={(e)=>handleOnChange(e)}
        valor={persona.email}
        error={error.email}
      />
      <AlertaCoincidencias
        isAlerta={alerta.email}
        children={
          <>

            {coincidencias.email.map((cliente, index) => (
              <li key={`nombre-${index}`} onClick={() => handleSelec(cliente)}>
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