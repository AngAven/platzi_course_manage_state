import React from 'react'

const SECURITY_CODE = 'paradigma'

function UseState({name}){
  const [state, setState] = React.useState({
    value: '',
    error: false,
    loading: false,
    deleted: false,
    confirmed: false
  })

  console.log(state)

  React.useEffect(() => {
    console.log('empieza efectp')
    if (!!state.loading) {
      setTimeout(() => {
        console.log('Iniciando validación')

        if (state.value === SECURITY_CODE) {
          setState({
            ...state,
            error: false,
            loading: false,
            confirmed: true,
          })
        } else {
          setState({
            ...state,
            error: true,
            loading: false,
          })
        }

        console.log('Terminando validacion')
      }, 1000)
    }
    console.log('termina efecto')
  }, [state.loading])

  console.log(state.value)

  if (!state.deleted && !state.confirmed) {
    return (
      <div>
        <h2>Eliminar {name}</h2>
        <p>Escribe el código de seguridad</p>

        {(state.error && !state.loading) && (
          <p>Error: Código incorrecto</p>
        )}

        {state.loading && (
          <p>Loading ...</p>
        )}

        <input
          value={state.value}
          placeholder="Código de seguridad"
          onChange={
            (e) => {
              setState({
                ...state,
                value: e.target.value,
              })
            }}
        />
        <button
          onClick={() => {
            setState({
              ...state,
              loading: true,
            })
          }}
        >Comprobar
        </button>
      </div>
    )
  } else if (!!state.confirmed && !state.deleted) {
    return (
      <React.Fragment>
        <p>Pedimos confirmación ¿estas seguro?</p>
        <button
          onClick={() => {
            setState({
              ...state,
              deleted: true,
            })
          }}
        >Si</button>

        <button
          onClick={() => {
            setState({
              ...state,
              confirmed: false,
              value: '',
            })
          }}
        >No</button>
      </React.Fragment>
    )
  } else {
    return (
      <React.Fragment>
        <p>Eliminado con éxito</p>
        <button
          onClick={() => {
            setState({
              ...state,
              deleted: false,
              confirmed: false,
              value: '',
            })
          }}
        >Reset</button>
      </React.Fragment>
    )
  }
}

export {UseState}
