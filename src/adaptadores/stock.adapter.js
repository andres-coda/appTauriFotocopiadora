import { especificacionesAdapter } from "./especificaciones.adapter.js";
import { estadoAdapter } from "./estado.adapter.js";

export const stockAdapter = (stock) =>{
    const estado= estadoAdapter(stock.estado);
    const esp = stock.especificaciones?.map(e => especificacionesAdapter(e));
    const stockFormateado = {
        idStock: stock.idStock,
        cantidad: stock.cantidad,
        estado: estado,
        especificaciones:esp
    }
    return stockFormateado;
}