import React from 'react'

function UseState({name}){
  const [error, setError] = React.useState(false)

  return (
    <div>
      <h2>Eliminar {name}</h2>
      <p>Escribe el código de seguridad</p>

      {error && (
        <p>Error: Código incorrecto</p>
      )}

      <input placeholder="Código de seguridad"/>
      <button
        onClick={() => setError(!error)}
      >Comprobar
      </button>
    </div>
  )
}

export {UseState}
