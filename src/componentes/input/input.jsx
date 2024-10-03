import './input.css'
function Inputs({name, texto, tipo, handleOnChange, valor, clase, error}){
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
            />
            <label htmlFor={name}>{texto}</label>
        </div>
            <span>{ error }</span>
            </div>
    )
}

export default Inputs;