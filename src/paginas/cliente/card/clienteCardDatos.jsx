import { useContext } from 'react';
import './clienteCardDatos.css'
import { contexto } from '../../../contexto/contexto';
import { useNavigate } from 'react-router-dom';
import ClienteNombre from '../../../componentes/cliente/clienteCabecera/clienteNombre';
import { contadorEstadoPedido } from '../../../funciones/utilidades.function';
import Cel from '../../../assets/phone.svg';
import Email from '../../../assets/email.svg'
import { rutasGenerales } from '../../../rutas/rutas';

function ClienteCardDatos({cliente}) {
	const { setDatos } = useContext(contexto);
	const navigate = useNavigate();

	const handleCliente = () => {
		setDatos((prev) => ({ ...prev, clienteActual: cliente }));
		navigate(rutasGenerales.CLIENTEINDIVIDUAL);
	}

	return (
		<div onClick={handleCliente} className='cliente-datos'>
			<ClienteNombre nombre={cliente.nombre} />
			<div className='cliente-datos-interno'>
				<div>
					<p className='pedido-pendiente'>Pendiente: {contadorEstadoPedido(cliente.pedidos, [1, 2, 3])}</p>
					<p className='pedido-paraRetirar'>Para retirar: {contadorEstadoPedido(cliente.pedidos, [4])}</p>
				</div>
				<div>
					<p><img src={Cel} alt='Celular' /> {cliente.celular}</p>
					<p title={cliente.email}><img src={Email} alt='Email' /> {cliente.email}</p>
				</div>
			</div>
		</div>
	)
}

export default ClienteCardDatos;