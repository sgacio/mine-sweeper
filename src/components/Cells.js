import React, { Component } from 'react'

class Cells extends Component {
  render() {
    return <td onClick={this.props.doTheClick}>{this.props.display}</td>
  }
}

export default Cells
