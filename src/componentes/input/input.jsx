import './input.css'
function Inputs({name, texto, tipo, handleOnChange, valor, clase, error, autocomplete, requerido}){
    return(
        <div className='inputs-span'>
        <div className="inputs-entero">
            <input 
                type={tipo} 
                id={name} 
                name={name}
                placeholder=' '
                onChange={handleOnChange}
                value={valor}
                className={clase?clase:''}
                autoComplete={autocomplete ? 'on' : 'off'}
                required={requerido ? true : false}
            />
            <label htmlFor={name}>{texto}</label>
        </div>
            {error ? <span>{ error }</span> : null }
            </div>
    )
}

export default Inputs;