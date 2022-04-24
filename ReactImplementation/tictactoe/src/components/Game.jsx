import React, { useState, useEffect } from 'react';
import Board from './Board';
import { calculateWinner, reset_menace, updateBoard, getMenaceMove, play_opponent, play_menace, check_win, new_game } from '../utility/calculateWinner';
import Trends from './Trends';

const Game = () => {

  const style = {
    textAlign: "left",
    alignItems: "left"
  }

  let btnCount = 0;

  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXisNext] = useState(true);
  const [playMenace, setPlayMenace] = useState(false);
  // const [playOpponent, setPlayOpponent] = useState(false);
  // const [reset, setReset] = useState(true);
  const [wins, setWin] = useState(0);
  const [loss, setLoss] = useState(0);
  const [draw, setDraw] = useState(0);
  const [gameCounter, setGameCounter] = useState(0);
  const [beadsCount, setBeadsCount] = useState(0);
  const menaceMove = getMenaceMove(board);

  // const winner = calculateWinner(board);
  const [custom, setCustomArray] = useState([]);

  const logs = useState([]);

  const handleClick = (i) => {
    // console.log(i);
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
      if (board[i] == 2) {
        board[i] = 'X';
      } else if (board[i] == 1) {
        board[i] = 'O';
      } else {
        board[i] = null;
      }
    }
  }

  useEffect(() => {
    
    // console.log("Games count:", gameCounter);
    // console.log("Beads count: ", beadsCount);
    
    // const newBoard = updateBoard();
    // console.log("Side effect");
    // setBoard(newBoard);
  }, [board]);

  const triggerRandom = () => {

    if (btnCount == 100) {
      
    }
    // const boardNew = reset_menace("both");
    // const boardCopy = [...boardNew];
    // replaceXnO(boardCopy);
    // setBoard(boardCopy);

    const boardNew = reset_menace("both");
    // setBoard(boardNew);

    let reset = true;
    let menacePlay = true;
    let opponentPlay = false;

    // const menaceBoardUpdate = play_menace();
    // setBoard(menaceBoardUpdate);

    while (reset) {

      if (menacePlay) {
        let menaceBoardUpdate = play_menace();
        // menaceBoardUpdate = replaceXnO(menaceBoardUpdate);
        setBoard(menaceBoardUpdate);        
        menacePlay = false;
        opponentPlay = true;

        const winStatus = check_win();
        console.log(winStatus);

        if (winStatus[1]) {
    //       // setBoard(Array(9).fill(null));
          reset = false;
          opponentPlay = false;
    //       const resetBoard = new_game();
    //       // setBoard(resetBoard);

          if (winStatus[0] === 0) {
            setDraw(draw + 1);
            setBeadsCount(beadsCount + 1);
          } else if (winStatus[0] === 1) {
            setWin(wins + 1);
            setBeadsCount(beadsCount + 3);
          } else { 
            setLoss(loss + 1);
            setBeadsCount(beadsCount - 1);
          }
        } 
      } 

    //   // reset = true;
      
      if (opponentPlay) {        
        let opponentBoardUpdate = play_opponent();
        // opponentBoardUpdate = replaceXnO(opponentBoardUpdate);
        setBoard(opponentBoardUpdate)
        
        menacePlay = true;
        opponentPlay = false;

        const winStatus = check_win();
        console.log(winStatus);

        if (winStatus[1]) {
    //       // setBoard(Array(9).fill(null));
          reset = false;
          menacePlay = false;
    //       const resetBoard = new_game();
    //       // setBoard(resetBoard);

          if (winStatus[0] === 0) {
            setDraw(draw + 1);
          } else if (winStatus[0] === 1) {
            setWin(wins + 1);
          } else {
            setLoss(loss + 1);
            setBeadsCount(beadsCount - 1);
          }
        } 
      }              
      setGameCounter(gameCounter + 1);
    }

    custom.push({name: gameCounter, uv: beadsCount, pv: 2400, amt: 2400})

    setCustomArray(custom => [...custom, {name: gameCounter, uv: beadsCount, pv: 2400, amt: 2400}]);

    console.log(custom);
  }

  return (

    <div style={style}>
      <Board squares={board} onClick={handleClick}/>
      <div>
        {/* <p>
          {winner ? "Winner: " + (winner === "O" ? "MENACE wins" : "Human wins") : "Next Player: " + (xIsNext ? "O" : "X")}
        </p> */}
      </div>
      <button onClick={triggerRandom}>Random</button>
      <p>Total Games {gameCounter}</p>
      <p>Menace Wins {wins}</p>
      <p>Human Wins {loss}</p>
      <p>Draw {draw}</p>
      <Trends customCount={custom} />
    </div>
  )
}

export default Game;