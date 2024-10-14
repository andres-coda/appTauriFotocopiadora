import { useState } from 'react';
import Formulario from '../../../componentes/formulario/formulario';
import Inputs from '../../../componentes/input/input';
import './clienteBuscar.css'

function ClienteBuscar({ setFilterCliente }) {
  const [persona, setPersona] = useState('');
  const [error, setError] = useState({ error: '' })

  const handleChangeSearch = (e) => {
    const { value } = e.target;

    setPersona(value);

    setFilterCliente(() => {
      return (cliente) =>
        cliente.nombre.toLowerCase().includes(value.toLowerCase()) ||
        cliente.celular.toLowerCase().includes(value.toLowerCase()) ||
        cliente.email.toLowerCase().includes(value.toLowerCase());
    });
  };

  const handleForm = (e) => {
    e.preventDefault();
  }

  return (
    <Formulario
      handleForm={handleForm}
      subtitulo={'Buscar cliente'}
      children={
        <>
          <Inputs
            name={persona}
            texto={`Datos del cliente`}
            tipo={'text'}
            handleOnChange={(e) => handleChangeSearch(e)}
            valor={persona}
            error={error.error}
          />
        </>
      }
    />
  )
}

export default ClienteBuscar;