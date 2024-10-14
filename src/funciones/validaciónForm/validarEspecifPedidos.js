export const validarEspecifPedidos = (esp, espActuales, listaEsp) => {
  console.log('espActuales' , espActuales);
  console.log('Esp' , esp);
  console.log('Lista' , listaEsp);
  
  
  let nuevaEspecificacion = [];  

  
  if (espActuales.length==0 || !Array.isArray(espActuales)) {
    nuevaEspecificacion.push(esp);
    return nuevaEspecificacion;
    }

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

    const isEspPresent = espActuales.some(item => item.idEspecificaciones === esp.idEspecificaciones);

    if (isEspPresent) {
      nuevaEspecificacion = espActuales.filter(item => item.idEspecificaciones !== esp.idEspecificaciones);
    } else {
      nuevaEspecificacion = espActuales.filter(item => !espQueNo.some(espExcl => espExcl.idEspecificaciones === item.idEspecificaciones));
      nuevaEspecificacion.push(esp);
    }

    return nuevaEspecificacion;
}