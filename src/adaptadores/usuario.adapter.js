export const usuarioAdapter = ( user ) => {
    const newUser = {
        email: user.email,
        role: user.role,
        idUsuario:  user.idUsuario
    }
    return newUser;
}