import React, { useState } from 'react'
import Cell from './Cell'

export default function Game() {
  const initialGame = {
    status: 'new',  // "new" | "in progress" | "over"
    winner: 0,      // 0 = no winner | 1 = X is winner | 2 = O is winner
    round: 0,       // maximum of 9
    scoreO: 0,      // total score for X
    scoreX: 0,      // total score for O
    grid: [         // 0 = empty, 1 = X, 2 = O
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ]
  }

  const [game, setGame] = useState(initialGame)
  const [finalMessage, setFinalMessage] = useState('')

  // check for draw
  if (game.round === 9 && checkForWin() === 0) {
    closeGame(0)
  }
  // check for win
  else {
    checkForWin() && closeGame(checkForWin())
  }

  /**
   * Generating the JSX elements to output in the Game
   * component. This is done by looping over both arrays
   * inside of game.grid.
   */
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


  /**
   * A function used to update the Game state
   * after a move. It takes two parameters that
   * determine the position of the cell that was 
   * updated.
   */
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

  /**
   * A function the contains all the logic
   * for checking if a game contains contains
   * a win.
   *
   * It checks all rows, cols and two diagonals 
   * and returns 1 for a X win, 2 for a O win and
   * 0 otherwise (draw and game in progress).
   */
  function checkForWin() {
    if (game.status === 'over') return

    const g = game.grid

    // Return winner number or 0
    function checkCol(col) {
      let value = g[0][col]
      for (let i = 0; i < 3; i++) {
        if (value === 0) return 0
        if (value !== g[i][col]) return 0
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

    return checkGrid() || 0
  }

  /**
   * A function used to reset the "board" after
   * a game was a win or a draw. 
   */
  function resetGame() {
    setGame(prevGame => (
      {
        ...initialGame,
        scoreO: prevGame.scoreO,
        scoreX: prevGame.scoreX
      }
    ))
  }
 
  /**
   * A function needed at the end of the game
   * for updating the Game state one final time,
   * keeping track of the scores and generating
   * a message.
   */
  function closeGame(winner) {
    // Game is a draw
    if (winner === 0) {
      setFinalMessage('Aww nobody won… 😒')
    } 
    // Game is a win
    else {
      setFinalMessage(`Victory! Player ${winner === 1 ? 'X' : 'O'} for the win 🥳`)
    }
    if (game.status === 'over') return
    setGame(prevGame => {
      const newGame = {
        ...prevGame,
        status: 'over',
        winner: winner
      }
      if (winner === 1) {
        newGame.scoreX = prevGame.scoreX + 1
      }
      if (winner === 2) {
        newGame.scoreO = prevGame.scoreO + 1
      }
      return newGame
    })
  }

  return (
    <>
      {game.status === 'over' &&
        <div className='absolute w-[33rem] p-8 rounded-xl border border-blue-800 bg-slate-200 drop-shadow-xl top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 h-auto'>
          {game.status === 'over' && <h1 className='text-center text-5xl mb-8 leading-normal'>{finalMessage}</h1>}
          <button 
            onClick={resetGame}
            className={(game.status === 'over' ? 'block' : 'hidden') + ' m-auto mb-8 px-8 py-4 bg-blue-600 text-white font-medium text-xl leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'}
          >
            Start new game
           </button>
        </div>
      }
      <div className='grid grid-cols-3 grid-rows-3 gap-1 bg-black'>
        {gameElements}
      </div>
      <p className={((game.scoreO || game.scoreX) ? 'flex' : 'hidden') + ' text-gray-600 absolute w-full left-0 px-8 text-sm bottom-2 flex justify-between'}>
        <span>Score X - {game.scoreX}</span>
        <span>Score O - {game.scoreO}</span>
      </p>
    </>
  )
}
