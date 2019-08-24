import React, { Component } from 'react'
import Cells from './Cells'
import axios from 'axios'

class Mines extends Component {
  state = {
    board: [],
    gameID: '',
    mines: '',
    currentState: '',
    difficulty: ''
  }

  doYouWantToPlay = event => {
    console.log('clicking')
    event.target.classNameList.remove('hidden')
  }

  componentDidMount() {
    axios({
      method: 'post',
      url: 'http://minesweeper-api.herokuapp.com/games'
    }).then(resp => {
      console.log(resp)
      this.setState({
        board: resp.data.board,
        currentState: resp.data.state,
        mines: resp.data.mines,
        gameID: resp.data.id
      })
      console.table(resp.data.board)
    })
  }

  ClickingTheClick = (x, y) => {
    console.log('click', x, y)
    axios
      .post(
        `http://minesweeper-api.herokuapp.com/games/${this.state.gameID}/check`,
        {
          row: x,
          col: y
        }
      )
      .then(resp => {
        this.setState({
          board: resp.data.board,
          currentState: resp.data.state,
          mines: resp.data.mines
        })
      })
  }

  determiningWinnerOrLoser = () => {
    if (this.state.currentState === 'lost') {
      return 'Player Lost, Play Again!'
    } else if (this.state.currentState === 'win') {
      return 'Player Win, Play Again!'
    }
  }

  rightClickingTheClick = (x, y) => {
    axios
      .post(
        `http://minesweeper-api.herokuapp.com/games/${this.state.gameID}/flag`,
        { row: x, col: y }
      )
      .then(resp => {
        this.setState({
          board: resp.data.board,
          currentState: resp.data.state,
          mines: resp.data.mines
        })
      })
  }

  resetTheGame = () => {
    console.log('reset this')
    axios({
      method: 'post',
      url: 'http://minesweeper-api.herokuapp.com/games'
    }).then(resp => {
      console.log(resp)
      this.setState({
        board: resp.data.board,
        currentState: resp.data.state,
        mines: resp.data.mines,
        gameID: resp.data.id
      })
    })
  }

  render() {
    return (
      <>
        <h1>MINESWEEPER</h1>
        <h5>GET SWEPT KID</h5>
        <div className="gameControls">
          <button onClick={this.doYouWantToPlay}>Select Game Difficulty</button>
          <button>Easy</button>
          <button>Medium</button>
          <button>Hard</button>
          <button onClick={this.resetTheGame}>Reset Game</button>
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
                          rightClick={() => this.rightClickingTheClick(i, j)}
                        />
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
          <p className="end-game-text">{this.determiningWinnerOrLoser()}</p>
        </section>
      </>
    )
  }
}

export default Mines
