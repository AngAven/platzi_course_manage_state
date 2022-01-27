import React, {useState, useReducer} from 'react'

const SECURITY_CODE = 'paradigma'

function UseState({name}){
  const [state, setState] = useState({
    value: '',
    error: false,
    loading: false,
    deleted: false,
    confirmed: false
  })

  const onConfirm = () => {
    setState({
      ...state,
      error: false,
      loading: false,
      confirmed: true,
    })
  }

  const onError = () => {
    setState({
      ...state,
      error: true,
      loading: false,
    })
  }

  const onWrite = (value) => {
    setState({
      ...state,
      value,
    })
  }

  const onCheck = () => {
    setState({
      ...state,
      loading: true,
    })
  }

  const onDeleted = () => {
    setState({
      ...state,
      deleted: true,
    })
  }

  const onReset = () => {
    setState({
      ...state,
      confirmed: false,
      deleted: false,
      value: '',
    })
  }

  React.useEffect(() => {
    console.log('empieza efectp')
    if (!!state.loading) {
      setTimeout(() => {
        console.log('Iniciando validación')

        if (state.value === SECURITY_CODE) {
          onConfirm()
        } else {
          onError()
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
              onWrite(e.target.value)
            }}
        />
        <button
          onClick={() => {
            onCheck()
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
            onDeleted()
          }}
        >Si
        </button>

        <button
          onClick={() => {
            onReset()
          }}
        >No
        </button>
      </React.Fragment>
    )
  } else {
    return (
      <React.Fragment>
        <p>Eliminado con éxito</p>
        <button
          onClick={() => {
            onReset()
          }}
        >Reset
        </button>
      </React.Fragment>
    )
  }
}

export {UseState}
