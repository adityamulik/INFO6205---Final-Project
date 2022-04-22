import React, { useState, useEffect } from 'react';
import Board from './Board';
import { calculateWinner, reset_menace } from '../utility/calculateWinner';
import Trends from './Trends';

const Game = () => {

  const style = {
    textAlign: "left",
    alignItems: "left"
  }

  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXisNext] = useState(true);
  // const winner = calculateWinner(board);

  const logs = useState([]);

  const handleClick = (i) => {
    console.log(i);
    const boardCopy = [...board];
    // console.log(winner);
    // // If user click an occupied square or if game is won, return
    // if (winner || boardCopy[i]) return;
    // // Put an X or an O in the clicked square
    boardCopy[i] = xIsNext ? "O" : "X";
    // setBoard(boardCopy);
    setXisNext(!xIsNext);
  };

  const replaceXnO = (board) => {
    for (let i=0; i<board.length; i++) {
      if (board[i] == 0) {
        board[i] = null;
      } else {
        board[i] = 'O';
      }
    }
  }

  useEffect(() => {
    const boardNew = reset_menace("both");
    const boardCopy = [...boardNew];
    // replaceXnO(boardCopy);
    setBoard(boardCopy);

    // setBoard(newGameBoard);
  }, []);

  return (

    <div style={style}>
      <Board squares={board} onClick={handleClick}/>
      <div>
        {/* <p>
          {winner ? "Winner: " + (winner === "O" ? "MENACE wins" : "Human wins") : "Next Player: " + (xIsNext ? "O" : "X")}
        </p> */}
      </div>
      <Trends />
    </div>
  )
}

export default Game;