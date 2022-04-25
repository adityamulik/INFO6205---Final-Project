import React, { useState, useEffect } from 'react';
import Logger from 'js-logger';
import Board from './Board';
import { play_human, menace, calculateWinner, reset_menace, updateBoard, getMenaceMove, play_opponent, play_menace, check_win, new_game } from '../engine/menace';
import Trends from './Trends';

const Game = () => {

  // Custom Logger

  const style = {
    textAlign: "left",
    alignItems: "left"
  }

  let btnCount = 0;

  const [board, setBoard] = useState(Array(9).fill(null));
  const [boardNew, setBoardNew] = useState(Array(9).fill(null));
  const [xIsNext, setXisNext] = useState(true);
  const [playMenace, setPlayMenace] = useState(false);
  // const [playOpponent, setPlayOpponent] = useState(false);
  const [resetMenaceHumanBool, setResetMenaceHumanBool] = useState(false);
  const [wins, setWin] = useState(0);
  const [loss, setLoss] = useState(0);
  const [draw, setDraw] = useState(0);
  const [gameCounter, setGameCounter] = useState(0);
  const [beadsCount, setBeadsCount] = useState(0);
  const [meanceResetBool, setMenaceResetBool] = useState(false);
  const menaceMove = getMenaceMove(board);

  // const winner = calculateWinner(board);
  const [custom, setCustomArray] = useState([]);

  const menaceT = menace;
  console.log(menaceT);

  const logs = useState([]);

  // Helper Function

  const replaceXnO = (board) => {
    for (let i=0; i<board.length; i++) {
      if (board[i] === 2) {
        board[i] = 'X';
      } else if (board[i] === 1) {
        board[i] = 'O';
      } else {
        board[i] = null;
      }
    }
  }

  const replaceXnOReverse = (board) => {
    for (let i=0; i<board.length; i++) {
      if (board[i] === 'X') {
        board[i] = 2;
      } else if (board[i] === 'O') {
        board[i] = 1;
      } else {
        board[i] = 0;
      }
    }
  }

  // State update
  useEffect(() => {

    // console.log(menaceT);
    
    // console.log("Games count:", gameCounter);
    // console.log("Beads count: ", beadsCount);
    
    // const newBoard = updateBoard();
    // console.log("Side effect");
    // setBoard(newBoard);
  }, [board]);

  const handleClick = (i) => {
    // console.log(i);
    // while (!check_win()) {
      console.log("CHECK WINNNNN ", check_win());
      const boardCopy = [...board];
      // console.log("BOARDDDD", board);
      boardCopy[i] = 'X';
      if (xIsNext) {
        setBoard(boardCopy);
        setXisNext(false);
      }

      if (!xIsNext) {
        console.log("Click");
        const boardCopyMenace = play_menace();
        console.log("Board new menace", boardCopyMenace);
      }
      // const boardHumanUpdated = play_human(i);
      // console.log("Returned board", boardHumanUpdated);

      // console.log(boardCopy);
    // }
    
    
    // replaceXnOReverse(boardCopy);
    // console.log(boardCopy);
    // // If user click an occupied square or if game is won, return
    // if (winner || boardCopy[i]) return;
    // // Put an X or an O in the clicked square
    // boardCopy[i] = xIsNext ? "O" : "X";
    // setBoard(boardCopy);
    // setXisNext(!xIsNext);
  };    

  const triggerHuman = async () => {

    if (!resetMenaceHumanBool) {
      const boardNew = reset_menace("both");
      setResetMenaceHumanBool(true);
      console.log("Reset Done in Human Mode");
    }    

    if (resetMenaceHumanBool) {
      new_game();
    }

    let reset = true;
    let menacePlay = true;
    // let opponentPlay = false;

    if (reset) {
      if (menacePlay) {
        let menaceBoardUpdate = play_menace();
        replaceXnO(menaceBoardUpdate);
        setBoard(menaceBoardUpdate);        
        menacePlay = false;
        // opponentPlay = true;
      }
    }
  }

  const triggerRandom = () => {

    if (!meanceResetBool) {
      const boardNew = reset_menace("both");
      setMenaceResetBool(true);
      console.log("Reset Done");
    }    

    if (meanceResetBool) {
      new_game();
    }

    let reset = true;
    let menacePlay = true;
    let opponentPlay = false;    

    while (reset) {

      if (menacePlay) {
      
        let menaceBoardUpdate = play_menace();                        
        let newArr = [...menaceBoardUpdate];
        replaceXnO(newArr)
        // console.log("MEANCE PLAYS", newArr);
                     
        setBoard(newArr);
        menacePlay = false;
        opponentPlay = true;

        const winStatus = check_win();
        // console.log(winStatus);

        if (winStatus[1]) {
          reset = false;
          opponentPlay = false;

          if (winStatus[0] === 0) {
            setDraw(draw + 1);
            Logger.info(`Game has drawn at ${gameCounter} game`);
            setBeadsCount(beadsCount + 1);
            setCustomArray(custom => [...custom, {name: gameCounter + 1, uv: beadsCount + 1, pv: 2400, amt: 2400}]);
          } else if (winStatus[0] === 1) {
            setWin(wins + 1);
            Logger.info(`Menace has won at ${gameCounter} game`);
            setBeadsCount(beadsCount + 3);
            setCustomArray(custom => [...custom, {name: gameCounter + 1, uv: beadsCount + 3, pv: 2400, amt: 2400}]);
          } else { 
            Logger.info(`Human has won at ${gameCounter} game`);
            setLoss(loss + 1);
          }
        }             
      } else if (opponentPlay) {        
        let opponentBoardUpdate = play_opponent();
        let newArr = [...opponentBoardUpdate];
        replaceXnO(newArr);             
        setBoard(newArr)  
        
        menacePlay = true;
        opponentPlay = false;

        const winStatus = check_win();
        // console.log(winStatus);

        if (winStatus[1]) {

          reset = false;
          menacePlay = false;

          if (winStatus[0] === 0) {
            setDraw(draw + 1);
            Logger.info(`Game has drawn at ${gameCounter} game`);
          } else if (winStatus[0] === 1) {
            setWin(wins + 1);
            Logger.info(`Menace has won at ${gameCounter} game`);
          } else {
            setLoss(loss + 1);
            Logger.info(`Human has won at ${gameCounter} game`);
            setBeadsCount(beadsCount - 1);
            setCustomArray(custom => [...custom, {name: gameCounter + 1, uv: beadsCount - 1, pv: 2400, amt: 2400}]);
          }
        } 
      }            

      setGameCounter(gameCounter + 1);
    }

    // custom.push({name: gameCounter, uv: beadsCount, pv: 2400, amt: 2400})

    // setCustomArray(custom => [...custom, {name: gameCounter + 1, uv: beadsCount, pv: 2400, amt: 2400}]);

    // console.log("Trends Array", custom);
  }

  return (

    <div style={style}>
      <Board squares={board} onClick={handleClick}/>
      <div>
        {/* <p>
          {winner ? "Winner: " + (winner === "O" ? "MENACE wins" : "Human wins") : "Next Player: " + (xIsNext ? "O" : "X")}
        </p> */}
      </div>
      <button onClick={triggerHuman}>Human</button>
      <button onClick={triggerRandom}>Random</button>
      <div style={{display: "flex"}}>
        <div>
          <p>Total Games {gameCounter}</p>
          <p>Menace Wins {wins}</p>
          <p>Human Wins {loss}</p>
          <p>Draw {draw}</p>
        </div>       
        <Trends customCount={custom} />
      </div>
    </div>
  )
}

export default Game;