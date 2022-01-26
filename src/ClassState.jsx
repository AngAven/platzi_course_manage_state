import React from 'react'

class ClassState extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      error: false
    }
  }

  render(){
    return (
      <div>
        <h2>Eliminar {this.props.name}</h2>
        <p>Escribe el código de seguridad</p>

        {this.state.error && (
          <p>Error: Código incorrecto</p>
        )}

        <input placeholder="Código de seguridad"/>
        <button
          onClick={() => {
            this.setState(prevState => ({error: !prevState.error}))
          }}
        >Comprobar</button>
      </div>
    )
  }
}

export {ClassState}
