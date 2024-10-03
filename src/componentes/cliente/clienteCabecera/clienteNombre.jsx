import User from '../../../assets/user.svg'
import './clienteCabecera.css'

function ClienteNombre({nombre}){
    return(
        <div className="cliente-nombre">
            <h6><img src={User} alt={nombre} />{nombre}</h6>
        </div>
    )
}

export default ClienteNombre;