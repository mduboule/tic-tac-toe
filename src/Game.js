import React, { useState } from 'react'
import Cell from './Cell'

export default function Game() {
  const initialGame = {
    status: "new", // "new" | "in progress" | "over"
    winnder: "", // "X" | "O" | ""
    round: 0, // maximum of 9
    grid: [[0, 0, 0], [0, 0, 0], [0, 0, 0]] // 0 = empty, 1 = X, 2 = O
  }

  const [game, setGame] = useState(initialGame)

  function handleChange(x, y) {
    // return if the cell isn't empty
    if (game.grid[x][y] !== 0) return

    // check for win
    checkForWin()

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
    console.log("Check for win…")
  }

  const gameElements = game.grid.map((col, i) => {
    return col.map((row, j) => {
      return (
        <Cell
          key={`${i}${j}`}
          row={j}
          value={game.grid[i][j]}
          col={i}
          handleClick={() => handleChange(i, j)}
        />
      )
    })
  })

  return (
    <div className="grid grid-cols-3 grid-rows-3 gap-4 bg-black">
      {gameElements}
    </div>
  )
}
