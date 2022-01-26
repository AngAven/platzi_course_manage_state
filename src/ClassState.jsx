import React from 'react'
import Loading from './Loading'

class ClassState extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      error: false,
      loading: false,
    }
  }

  // UNSAFE_componentWillMount(){
  //   console.log('componentWillMount')
  // }

  // componentDidMount(){
  //   console.log('componentDidMount')
  // }

  componentDidUpdate(prevProps, prevState, snapshot){

    console.log('update')

    if (!!this.state.loading) {
      setTimeout(() => {
        console.log('Iniciando settimeout')
        this.setState({loading: false})
        console.log('Terminando settimeout')
      }, 1000)
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

        {this.state.loading && (
          <Loading />
        )}

        <input placeholder="Código de seguridad"/>
        <button
          onClick={() => this.setState({loading: true})}
        >Comprobar
        </button>
      </div>
    )
  }
}

export {ClassState}
