import React from 'react'
import Loading from './Loading'

const SECURITY_CODE = 'paradigma'

class ClassState extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      value: '',
      error: false,
      loading: false,
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot){
    console.log('update')

    if (!!this.state.loading) {
      setTimeout(() => {
        console.log('Iniciando validación')

        if(SECURITY_CODE === this.state.value){
          // this.setState({loading: false, error:false})
          this.setState({loading: false})
        } else{
          this.setState({error: true, loading: false})
        }

        console.log('Terminando validacion')
      }, 1000)
    }
  }

  render(){
    return (
      <div>
        <h2>Eliminar {this.props.name}</h2>
        <p>Escribe el código de seguridad</p>

        {(this.state.error && !this.state.loading) && (
          <p>Error: Código incorrecto</p>
        )}

        {this.state.loading && (
          <Loading/>
        )}

        <input
          value={this.state.value}
          placeholder="Código de seguridad"
          onChange={(e) => this.setState({value: e.target.value})}
        />
        <button
          onClick={() => this.setState({loading: true})}
        >Comprobar
        </button>
      </div>
    )
  }
}

export {ClassState}
