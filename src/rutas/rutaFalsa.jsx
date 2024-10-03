import { Route, Routes } from "react-router-dom";

function RutaFalsa({children}) {
    return (
        <Routes>
            {children}
            <Route path="*" element={<p>Página inexistente</p>} />
        </Routes>
    )
}

export default RutaFalsa;