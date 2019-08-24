import React, { Component } from 'react'

class Cells extends Component {
  render() {
    return (
      <td
        onClick={this.props.doTheClick}
        onContextMenu={e => {
          this.props.rightClick()
          e.preventDefault()
        }}
      >
        {this.props.display}
      </td>
    )
  }
}

export default Cells
