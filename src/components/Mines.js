import React, { Component } from 'react'
import Cells from './Cells'
import axios from 'axios'

class Mines extends Component {
  state = {
    board: [],
    startGame: ''
  }

  componentDidMount() {
    axios({
      method: 'post',
      url: 'http://minesweeper-api.herokuapp.com/games'
    }).then(resp => {
      console.log(resp)
      this.setState({
        board: resp.data.board
      })
      console.log(resp.data.board)
    })
  }

  // ClickingTheClick = (x, y) => {
  //   this.setState({
  //   })
  // }

  initiateGame = () => {
    console.log('button')
    this.setState({
      startGame: this.state.board.playing
    })
  }

  render() {
    return (
      <>
        <h1>MINESWEEPER</h1>
        <h5>GET SWEPT KID</h5>
        <div className="gameControls">
          <button onClick={this.initiateGame}>Start Game</button>
          <button>Reset Game</button>
        </div>
        <section>
          <table>
            <tbody>
              {this.state.board.map((col, i) => {
                return (
                  <tr key={i}>
                    {col.map((row, j) => {
                      return (
                        <Cells
                          key={j}
                          display={this.state.board[i][j]}
                          doTheClick={() => this.ClickingTheClick(i, j)}
                        />
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </section>
      </>
    )
  }
}

export default Mines
