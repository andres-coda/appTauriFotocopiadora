import './parrafoClase.css';

function ParrafoClase ({clase, texto}) {
    return(
        <p className={clase} title={texto}>{texto}</p>
    )
}

export default ParrafoClase;