import './escpecificacionesCard.css'

function EspecificacionesCard({ listaEspecificaciones, clase }) {
  return (
    <div className={`especificaciones-container ${clase}`}>
      <ul>
        {listaEspecificaciones?.map((esp, index) => (
          <li key={`esp-${index}`}>{esp.nombre}</li>
        ))}
      </ul>
    </div>
  )
}

export default EspecificacionesCard;