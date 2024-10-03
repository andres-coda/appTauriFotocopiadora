export const rutaPublica = {
    LOGIN : 'login',
}

export const rutaPrivada = {
    PRIVADA: 'privada',
    USUARIOS : `usuarios`,
    CLIENTES : `clientes`,
    CLIENTEINDIVIDUAL : `cliente`,
    CLIENTENUEVO : `cliente-nuevo`,
    PEDIDOS : `lista-pedidos`,
    PEDIDOINDIVIDUAL : `pedido`,
    PEDIDOESPECIAL : `pedido-especial`,
    LIBROINDIVIDUAL : 'libro',
    LIBROLISTA : 'libro-lista',
    ESCUELAS : 'escuelas',
    CURSOS : 'cursos',
    PRECIOS : 'precios',
    PEDIDONUEVO : `pedido-nuevo`,
}

export const rutasGenerales = {
    USUARIOS : `/${rutaPrivada.PRIVADA}/usuarios`,
    CLIENTES : `/${rutaPrivada.PRIVADA}/clientes`,
    CLIENTEINDIVIDUAL : `/${rutaPrivada.PRIVADA}/cliente`,
    CLIENTENUEVO : `/${rutaPrivada.PRIVADA}/cliente-nuevo`,
    PEDIDOS : `/${rutaPrivada.PRIVADA}/lista-pedidos`,
    PEDIDOINDIVIDUAL : `/${rutaPrivada.PRIVADA}/pedido`,
    PEDIDOESPECIAL : `/${rutaPrivada.PRIVADA}/pedido-especial`,
    LIBROINDIVIDUAL : `/${rutaPrivada.PRIVADA}/libro`,
    LIBROLISTA : `/${rutaPrivada.PRIVADA}/libro-lista`,
    ESCUELAS : `/${rutaPrivada.PRIVADA}/escuelas`,
    CURSOS : `/${rutaPrivada.PRIVADA}/cursos`,
    PRECIOS : `/${rutaPrivada.PRIVADA}/precios`,
    PEDIDONUEVO : `/${rutaPrivada.PRIVADA}/pedido-nuevo`,
}