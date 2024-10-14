import { useContext, useEffect, useState } from 'react';
import './clienteCardDatos.css'
import { contexto } from '../../../contexto/contexto';
import { useNavigate } from 'react-router-dom';
import ClienteNombre from '../../../componentes/cliente/clienteCabecera/clienteNombre';
import { contadorEstadoPedido } from '../../../funciones/utilidades.function';
import Cel from '../../../assets/phone.svg';
import Email from '../../../assets/email.svg'
import { rutasGenerales } from '../../../rutas/rutas';
import { clienteAdapter } from '../../../adaptadores/cliente.adapter';
import { URL_CLIENTES } from '../../../endPoint/endpoint';
import Cargando from '../../../componentes/cargando/cargando';
import ParrafoClase from '../../../componentesStilos/parrafos/parrafoClase';
import useApi from '../../../servicios/Api/useApi';

function ClienteCardDatos({cliente}) {
	const { setDatos } = useContext(contexto);
	const navigate = useNavigate();
	const {loading, error, response, fetchData} = useApi(null, clienteAdapter);

	useEffect(()=>{
		if (response) {
			setDatos((prev) => ({ ...prev, clienteActual: cliente }));
			navigate(rutasGenerales.CLIENTEINDIVIDUAL);
		}
	},[response])

	const handleCliente = () =>{
		fetchData(`${URL_CLIENTES}/${cliente.idPersona}`)
	}

	if (error) return (
		<Cargando text={`Error al tratar de leer el cliente id: ${cliente.nombre || cliente.celular}, ${error}`}/>
	)

	if (loading) return (
		<Cargando text={`Abriendo datos cliente ${cliente.nombre || cliente.celular}`}/>
	)

	return (
		<div onClick={handleCliente} className='cliente-datos'>
			<ClienteNombre nombre={cliente.nombre} />
			<div className='cliente-datos-interno'>
				<div className='cliente-datos-interno-info'>
					<p><img src={Cel} alt='Celular' /> {cliente.celular}</p>
					<p title={cliente.email}><img src={Email} alt='Email' /> {cliente.email}</p>
				</div>
				<div className='cliente-datos-interno-extra'>
					<ParrafoClase clase={'pedido-pendiente'} texto={`Para retirar: ${contadorEstadoPedido(cliente.pedidos, [1, 2, 3])}`}/>
					<ParrafoClase clase={'pedido-paraRetirar'} texto={`Para retirar: ${contadorEstadoPedido(cliente.pedidos, [4])}`} />
				</div>
			</div>
		</div>
	)
}

export default ClienteCardDatos;