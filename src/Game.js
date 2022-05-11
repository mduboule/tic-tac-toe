import React, { useState } from 'react'
import Cell from './Cell'

export default function Game() {
  const initialGame = {
    status: "new", // "new" | "in progress" | "over"
    winnder: "", // "X" | "O" | ""
    round: 0, // maximum of 9
    grid: [["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"]]
  }

  const [game, setGame] = useState(initialGame)

  const gameElements = game.grid.map((col, i) => {
    return col.map((row, j) => {
      return <Cell row={j + 1} col={i + 1} />
    })
  })

  console.log(gameElements)

  return (
    <div className="grid grid-cols-3 grid-rows-3 gap-4 bg-black">
      {gameElements}
    </div>
  )
}
