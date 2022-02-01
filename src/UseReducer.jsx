import React, {useState, useReducer} from 'react'

const SECURITY_CODE = 'paradigma'

function UseReducer({name}){
  const [state, dispatch] = useReducer(reducer, initialState)

  React.useEffect(() => {
    console.log('empieza efectp')
    if (!!state.loading) {
      setTimeout(() => {
        console.log('Iniciando validación')

        if (state.value === SECURITY_CODE) {
          dispatch({
            type: actionsTypes.confirm,
          })
        } else {
          dispatch({
            type: actionsTypes.error,
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
              dispatch({
                type: actionsTypes.write,
                payload: e.target.value,
              })
            }}
        />
        <button
          onClick={() => {
            dispatch({
              type: actionsTypes.check,
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
            dispatch({
              type: actionsTypes.delete,
            })
          }}
        >Si
        </button>

        <button
          onClick={() => {
            dispatch({
              type: actionsTypes.reset,
            })
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
            dispatch({
              type: actionsTypes.reset,
            })
          }}
        >Reset
        </button>
      </React.Fragment>
    )
  }
}

const initialState = {
  value: '',
  error: false,
  loading: false,
  deleted: false,
  confirmed: false
}

const reducerObject = (state, payload) => ({
  [actionsTypes.error]: {
    ...state,
    error: true,
    loading: false,
  },
  [actionsTypes.check]: {
    ...state,
    loading: true,
  },
  [actionsTypes.confirm]: {
    ...state,
    error: false,
    loading: false,
    confirmed: true,
  },
  [actionsTypes.reset]: {
    ...state,
    confirmed: false,
    deleted: false,
    value: '',
  },
  [actionsTypes.delete]: {
    ...state,
    deleted: true,
  },
  [actionsTypes.write]: {
    ...state,
    value: payload,
  },
})

const actionsTypes = {
  confirm: 'CONFIRM',
  check: 'CHECK',
  reset: 'RESET',
  delete: 'DELETE',
  write: 'WRITE',
  error: 'ERROR',
}

const reducer = (state, action) => {
  if (reducerObject(state)[action.type]) {
    return reducerObject(state, action.payload)[action.type]
  } else {
    return state
  }
}

export {UseReducer}
