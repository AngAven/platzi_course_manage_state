import React from 'react'

const SECURITY_CODE = 'paradigma'

function UseState({name}){
  const [value, setValue] = React.useState('')
  const [error, setError] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    console.log('empieza efectp')
    if (!!loading) {
      setTimeout(() => {
        console.log('Iniciando validación')

        if (value === SECURITY_CODE) {
          setError(false)
          setLoading(false)
        } else{
          setError(true)
          setLoading(false)
        }

        console.log('Terminando validacion')
      }, 1000)
    }
    console.log('termina efecto')
  }, [loading])

  console.log(value)
  return (
    <div>
      <h2>Eliminar {name}</h2>
      <p>Escribe el código de seguridad</p>

      {(error && loading === false) && (
        <p>Error: Código incorrecto</p>
      )}

      {loading && (
        <p>Loading ...</p>
      )}

      <input
        value={value}
        placeholder="Código de seguridad"
        onChange={
        (e) => {
          // setError(false)
          setValue(e.target.value)
        }}
      />
      <button
        onClick={() => {
          // setError(false)
          setLoading(true)
        }}
      >Comprobar
      </button>
    </div>
  )
}

export {UseState}
