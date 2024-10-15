import { usuarioAdapter } from "./usuario.adapter";

const listaUsuariosAdapter = (res) => {
    const listaUsers = res.map(user=> usuarioAdapter(user));
    return listaUsers;
}

export default listaUsuariosAdapter;