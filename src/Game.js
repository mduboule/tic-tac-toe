import React, { useState } from 'react'
import Cell from './Cell'

export default function Game() {
  const initialGame = {
    status: "new", // "new" | "in progress" | "over"
    winner: "", // "X" | "O" | ""
    round: 0, // maximum of 9
    grid: [[0, 0, 0], [0, 0, 0], [0, 0, 0]] // 0 = empty, 1 = X, 2 = O
  }

  const [game, setGame] = useState(initialGame)

  // check for win
  checkForWin() && setWinner(checkForWin())

  function handleChange(x, y) {
    // return if the cell isn't empty
    if (game.grid[x][y] !== 0) return

    // Update state
    setGame(prevGame => {
      const newGrid = [...prevGame.grid]
      newGrid[x][y] = ((prevGame.round % 2) === 0) ? 1 : 2
      return {
        ...prevGame,
        grid: newGrid,
        round: prevGame.round + 1
      }
    })
  }

  function checkForWin() {
    if (game.status === 'over') return

    const g = game.grid

    // Return winner number or 0
    function checkCol(col) {
      let value = g[col][0]
      for (let i = 0; i < 3; i++) {
        if (value === 0) return 0
        if (value !== g[col][i]) return 0
      }
      return value
    }

    // Return winner number or 0
    function checkRow(row) {
      let value = g[row][0]
      for (let i = 0; i < 3; i++) {
        if (value === 0) return 0
        if (value !== g[row][i]) return 0
      }
      return value
    }

    // Return winner number or 0
    function checkDiagonals() {
      // first diagonal
      let value = g[0][0]
      if (value === g[1][1] && value === g[2][2]) return value

      // second diagonal
      value = g[2][0]
      if (value === g[1][1] && value === g[0][2]) return value
      return 0
    }
    
    function checkGrid() {
      for (let i = 0; i < 3; i++) {
        if (checkRow(i) > 0) return checkRow(i)
        if (checkCol(i) > 0) return checkCol(i)
      }
      if (checkDiagonals() > 0) return checkDiagonals()
    }

    return checkGrid()
  }

  function setWinner(winner) {
    setGame(prevGame => (
      {
        ...prevGame,
        status: 'over',
        winner: winner
      }
    ))
  }

  // We loop over both arrays and use the indexes each time
  // to define attributes. vertCols contains a single arrays
  // of values that we can pass to the component.
  const gameElements = game.grid.map((vertCols, i) => {
    return vertCols.map((value, j) => {
      return (
        <Cell
          key={`${i}${j}`}
          row={j}
          col={i}
          value={value}
          handleClick={() => handleChange(i, j)}
        />
      )
    })
  })

  return (
    <>
      <button 
        onClick={() => setGame(initialGame)}
        className="block m-auto mb-8 px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
      >Start new game</button>
      <div className="grid grid-cols-3 grid-rows-3 gap-1 bg-black">
        {gameElements}
      </div>
    </>
  )
}
