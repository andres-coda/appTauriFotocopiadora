import { useEffect, useRef, useState } from "react";

const usePantalla = () => {
  const [mostrarElemento, setMostrarElemento] = useState(false);
  const descrRef = useRef(null);

  useEffect(() => {
    const elemento = descrRef.current;
    if (elemento && elemento.scrollHeight > elemento.clientHeight) {
      setMostrarElemento(true);
    } else {
      setMostrarElemento(false);
    }
  }, []);

  return {
    mostrarElemento, descrRef,
  }
}

export default usePantalla;