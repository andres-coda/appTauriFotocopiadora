import './clienteCabecera.css'
import ClienteNombre from './clienteNombre';
import Cel from '../../../assets/phone.svg'
import Email from '../../../assets/email.svg'

function ClienteCabecera({ cliente }) {
    return (
      <div className='cliente-cabecera-container'>
        <ClienteNombre nombre={cliente.nombre} />
        <div className='cliente-cabecera-interno'>
            <p><img src={Cel} alt='Celular' /> {cliente.celular}</p>
            <p title={cliente.email}><img src={Email} alt='Email' /> {cliente.email}</p>
        </div>
      </div>
    )
  }
  
  export default ClienteCabecera;