export const validarEspecifPedidos = (esp, espActuales, listaEsp) => {
    const espQueNo = [];

    switch (esp.idEspecificaciones) {
      case 1:
        espQueNo.push(listaEsp[1]);
        break;
      case 2:
        espQueNo.push(listaEsp[0]);
        break;
      case 3:
        espQueNo.push(listaEsp[3], listaEsp[4]);
        break;
      case 4:
        espQueNo.push(listaEsp[2], listaEsp[4]);
        break;
      case 5:
        espQueNo.push(listaEsp[2], listaEsp[3]);
        break;
      case 6:
        espQueNo.push(listaEsp[6]);
        break;
      case 7:
        espQueNo.push(listaEsp[5]);
        break;
      default:
        break;
    }

    let nuevaEspecificacion;

    if (espActuales.includes(esp)) {
      nuevaEspecificacion = espActuales.filter(item => item !== esp);
    } else {
      nuevaEspecificacion = espActuales.filter(item => !espQueNo.includes(item));
      nuevaEspecificacion.push(esp);
    }

    return nuevaEspecificacion;
}