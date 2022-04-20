import React, { useState, useEffect } from 'react';
import Board from './Board';
import { calculateWinner } from '../utility/calculateWinner';

const Game = () => {

  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXisNext] = useState(true);
  const winner = calculateWinner(board);

  const logs = useState([]);

  const handleClick = (i) => {
    const boardCopy = [...board];
    // If user click an occupied square or if game is won, return
    if (winner || boardCopy[i]) return;
    // Put an X or an O in the clicked square
    boardCopy[i] = xIsNext ? "O" : "X";
    setBoard(boardCopy);
    setXisNext(!xIsNext);
  };

  useEffect(() => {
    winner === "O" ? logs.push("MENACE wins") : logs.push("Human wins");
    console.log(logs);
  }, logs);

  return (

    <div>
      <Board squares={board} onClick={handleClick}/>
      <div>
        <p>
          {winner ? "Winner: " + (winner === "O" ? "MENACE wins" : "Human wins") : "Next Player: " + (xIsNext ? "O" : "X")}
        </p>
      </div>
    </div>
  )
}

export default Game;