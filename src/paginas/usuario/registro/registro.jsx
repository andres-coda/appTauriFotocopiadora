import Formulario from '../../../componentes/formulario/formulario';
import Inputs from '../../../componentes/input/input';
import { useContext, useEffect, useState } from 'react';
import { contexto } from '../../../contexto/contexto';
import { registrarUser } from '../../../servicios/usuarios.service';
import Cargando from '../../../componentes/cargando/cargando';

function Registro({validarErrores}) {
    const {setUserLogin} = useContext(contexto);
    const [clasError, setClasError] = useState('sugerencia-error');
    const [cargando, setCargando ] = useState(false);

    const [user, setUser] = useState({
      email:'',
      password:''
    });
    const [error, setError] = useState({
       email:'',
      password:'',
      error: 'Todos los campos deben completarse'
    });

    const handleChange = (e) => {
      const {name, value} = e.target;
      setUser({
        ...user,
        [name] : value
      })
    }
  
    useEffect(()=>{
      if (error.error != 'Todos los campos deben completarse') {
        setClasError('');
      }
    },[error.error]);
  
    const handleLogin = async () => {
      const ifError = validarErrores(user);
      
      if (ifError) {
        setError(ifError);
        setClasError('');
        return
      }
      
      setCargando(true);
      registrarUser(user, setUserLogin, setError);
    }

    if (cargando) return (
        <Cargando text={'Procesando el registro...'}/>
    )
  
    return (
      <>
        <Formulario
          handleForm={handleLogin}
          subtitulo={'Registrar usuario'}
          textBtn={'Registrarse'}
          error={error.error}
          classError={clasError}
          children={
            <>
              <Inputs
                name={'email'}
                texto={'Ingrese email'}
                tipo={'email'}
                handleOnChange={(e) => handleChange(e)}
                valor={user.email}
                error={error.email}
              />
              <Inputs
                name={'password'}
                texto={'Ingrese contraseña'}
                tipo={'password'}
                handleOnChange={(e) => handleChange(e)}
                valor={user.password}
                error={error.password}
              />
            </>
          }
        />
      </>
    )
  }
  export default Registro;