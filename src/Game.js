import React, { useState } from 'react'
import Cell from './Cell'

export default function Game() {
  const initialGame = {
    status: 'new', // "new" | "in progress" | "over"
    winner: 0, // 0 = no winner | 1 = X is winner | 2 = O is winner
    round: 0, // maximum of 9
    grid: [[0, 0, 0], [0, 0, 0], [0, 0, 0]] // 0 = empty, 1 = X, 2 = O
  }

  const [game, setGame] = useState(initialGame)
  const [finalMessage, setFinalMessage] = useState('')

  // check for draw
  if (game.round == 9 && game.winner === 0 && game.status !== 'over') {
    closeGame(0)
  }
  else {
    // check for win
    checkForWin() && closeGame(checkForWin())
  }

  function handleChange(x, y) {
    // return if the game is over
    if (game.status === 'over') return
    // return if the cell isn't empty
    if (game.grid[x][y] !== 0) return

    // Update state
    setGame(prevGame => {
      const newGrid = [...prevGame.grid]
      newGrid[x][y] = ((prevGame.round % 2) === 0) ? 1 : 2
      return {
        ...prevGame,
        grid: newGrid,
        round: prevGame.round + 1,
        status: 'in progress'
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

  function closeGame(winner) {
    // Game is a draw
    if (winner === 0) {
      setFinalMessage('Aww nobody won…')
    } 
    // Game is a win
    else {
      setFinalMessage(`Victory! Player ${winner === 1 ? 'X' : 'O'} for the win :)`)
    }
    if (game.status === 'over') return
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
      {game.status === 'over' &&
        <div className='absolute w-[33rem] p-8 rounded-xl border border-blue-800 bg-slate-200 drop-shadow-xl top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 h-auto'>
          {game.status === 'over' && <h1 className='text-center text-5xl mb-8 leading-normal'>{finalMessage}</h1>}
          <button 
            onClick={() => setGame(initialGame)}
            className={(game.status === 'over' ? 'block' : 'hidden') + ' m-auto mb-8 px-8 py-4 bg-blue-600 text-white font-medium text-xl leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'}
          >
            Start new game
           </button>
        </div>
      }
      <div className='grid grid-cols-3 grid-rows-3 gap-1 bg-black'>
        {gameElements}
      </div>
    </>
  )
}
