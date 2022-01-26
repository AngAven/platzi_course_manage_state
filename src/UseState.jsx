import React from 'react'

function UseState({name}){
  const [error, setError] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    console.log('empieza')
    if (!!loading) {
      setTimeout(() => {
        console.log('Iniciando settimeout')
        setLoading(false)
        console.log('Terminando settimeout')
      }, 1000)
    }
    console.log('termina')
  }, [loading])

  return (
    <div>
      <h2>Eliminar {name}</h2>
      <p>Escribe el código de seguridad</p>

      {error && (
        <p>Error: Código incorrecto</p>
      )}

      {loading && (
        <p>Loading ...</p>
      )}

      <input placeholder="Código de seguridad"/>
      <button
        onClick={() => setLoading(!loading)}
      >Comprobar
      </button>
    </div>
  )
}

export {UseState}
