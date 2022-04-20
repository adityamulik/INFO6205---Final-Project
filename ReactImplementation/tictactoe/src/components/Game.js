import React, { useState } from 'react';
import Board from './Board';
import { calculateWinner } from '../utility/calculateWinner';

const Game = () => {

  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXisNext] = useState(true);
  const winner = calculateWinner(board);

  const handleClick = (i) => {
    const boardCopy = [...board];
    // If user click an occupied square or if game is won, return
    if (winner || boardCopy[i]) return;
    // Put an X or an O in the clicked square
    boardCopy[i] = xIsNext ? "O" : "X";
    setBoard(boardCopy);
    setXisNext(!xIsNext);
  };

  return (
    <div>
      <Board squares={board} onClick={handleClick}/>
    </div>
  )
}

export default Game;