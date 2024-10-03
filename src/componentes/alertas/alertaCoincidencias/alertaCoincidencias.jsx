import './alertaCoincidencias.css'
function AlertaCoincidencias({children, isAlerta}){
    if( !isAlerta) return null;
    return(
        <div className='alerta-coincidencia'>
            <ul>
                {children}
            </ul>
        </div>
    )
}
export default AlertaCoincidencias;