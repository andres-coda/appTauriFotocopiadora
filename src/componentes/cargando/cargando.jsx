function Cargando({text, error}){
    return(
        <>
            <p>{text ? text : 'Cargando...'}</p> 
          {error ? (
            <p>{`Error en la solicitud: ${error}`}</p>
            ) : ( null)} 
        </>
    )
}

export default Cargando;