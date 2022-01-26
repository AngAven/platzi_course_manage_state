import React, {Component} from 'react'

class Loading extends Component {
  componentWillUnmount(){
    console.log('componentWillUnmount')
  }

  render(){
    return (
      <div>
        Loading ...
      </div>
    )
  }
}

export default Loading
