const precioAdapter = (p) => {
    const newP = {
        tipo: p.tipo || '',
        importe: p.importe || ''
    }
    return newP;
} 

export default precioAdapter;