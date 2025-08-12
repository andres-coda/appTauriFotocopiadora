export const errorUserInicial = {
  email: '',
  password: '',
  error: ''
}

export const userInicial = {
  email: "",
  password: ""
}

export const validarUsuario = (user) => {
  const newError = {...errorUserInicial}
  
  if (!user.email) {
    newError.email = 'Debe agregar un email';
    newError.error = 'La solicitud tiene errores';
  }

  if (!user.password) {
    newError.password = 'Debe agregar una contraseña';
    newError.error = 'La solicitud tiene errores';
  }
  return newError;
}