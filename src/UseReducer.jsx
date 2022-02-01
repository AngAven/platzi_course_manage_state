import React, {useState, useReducer} from 'react'

const SECURITY_CODE = 'paradigma'

function UseReducer({name}){
  const [state, dispatch] = useReducer(reducer, initialState)

  const onConfirm = () => dispatch({type: actionTypes.confirm})
  const onError = () => dispatch({type: actionTypes.error})
  const onCheck = () => dispatch({type: actionTypes.check})
  const onDelete = () => dispatch({type: actionTypes.delete})
  const onReset = () => dispatch({type: actionTypes.reset})
  const onWrite = ({target: {value}}) => {
    dispatch({type: actionTypes.write, payload: value})
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
          onChange={onWrite}
        />
        <button
          onClick={onCheck}
        >Comprobar
        </button>
      </div>
    )
  } else if (!!state.confirmed && !state.deleted) {
    return (
      <React.Fragment>
        <p>Pedimos confirmación ¿estas seguro?</p>
        <button
          onClick={onDelete}
        >Si
        </button>

        <button
          onClick={onReset}
        >No
        </button>
      </React.Fragment>
    )
  } else {
    return (
      <React.Fragment>
        <p>Eliminado con éxito</p>
        <button
          onClick={onReset}
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
  [actionTypes.error]: {
    ...state,
    error: true,
    loading: false,
  },
  [actionTypes.check]: {
    ...state,
    loading: true,
  },
  [actionTypes.confirm]: {
    ...state,
    error: false,
    loading: false,
    confirmed: true,
  },
  [actionTypes.reset]: {
    ...state,
    confirmed: false,
    deleted: false,
    value: '',
  },
  [actionTypes.delete]: {
    ...state,
    deleted: true,
  },
  [actionTypes.write]: {
    ...state,
    value: payload,
  },
})

const actionTypes = {
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
