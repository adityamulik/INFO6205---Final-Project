import React, { useState, useEffect } from 'react';
import Board from './Board';
import { play_human, menace, calculateWinner, reset_menace, updateBoard, getMenaceMove, play_opponent, play_menace, check_win, new_game, get_perfect_move } from '../engine/menace';
import Trends from './Trends';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { padding } from '@mui/system';

const Game = () => {

  const styleLeft = {
    marginTop: "120px"
  }

  const styleHeader = {
    textAlign: "center"
  }

  const styleBtn = {
    marginTop: "40px",
    marginLeft: "360px"
  }
  
  const styleScoreBoard = {
    display: "flex",
    margin: "20px"
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
  // console.log(menaceT);

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
      // console.log("CHECK WINNNNN ", check_win());
      const boardCopy = [...board];
      // console.log("BOARDDDD", board);
      // boardCopy[i] = 'X';
      boardCopy[i] = 2;
      // setBoard(boardCopy);
      setXisNext(false);

      // console.log("Click");
      const boardCopyMenace = play_menace();
      // setBoard(boardCopyMenace);
      // console.log("Board new menace", boardCopyMenace);
  };    

  const triggerHuman = () => {

    if (!resetMenaceHumanBool) {
      const boardNew = reset_menace("both");
      setResetMenaceHumanBool(true);
      // console.log("Reset Done in Human Mode");
    }    

    if (!resetMenaceHumanBool) {
      // console.log("New game begins");
      new_game();
    }

    let reset = true;
    let menacePlay = true;
    // let opponentPlay = false;

    if (reset) {
      if (menacePlay) {
        let menaceBoardUpdate = play_menace();
        // replaceXnO(menaceBoardUpdate);
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
      // console.log("Reset Done");
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
            // Logger.info(`Game has drawn at ${gameCounter} game`);
            setBeadsCount(beadsCount + 1);
            setCustomArray(custom => [...custom, {name: gameCounter + 1, uv: beadsCount + 1, pv: 2400, amt: 2400}]);
          } else if (winStatus[0] === 1) {
            setWin(wins + 1);
            // Logger.info(`Menace has won at ${gameCounter} game`);
            setBeadsCount(beadsCount + 3);
            setCustomArray(custom => [...custom, {name: gameCounter + 1, uv: beadsCount + 3, pv: 2400, amt: 2400}]);
          } else { 
            // Logger.info(`Human has won at ${gameCounter} game`);
            setLoss(loss + 1);
          }
        }         
      } 
      else if (opponentPlay) {       
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
            // Logger.info(`Game has drawn at ${gameCounter} game`);
          } else if (winStatus[0] === 1) {
            setWin(wins + 1);
            // Logger.info(`Menace has won at ${gameCounter} game`);
          } else {
            setLoss(loss + 1);
            // Logger.info(`Human has won at ${gameCounter} game`);
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

    <div>
      <h1 style={styleHeader}>The MENACE</h1>
      <Grid container spacing={2}>
        <Grid item xs={7} style={styleLeft}>          
          <Board squares={board} onClick={handleClick} /> 
          <Button variant="outlined" onClick={triggerRandom} style={styleBtn} data-testid="random-btn">Random</Button>    
        </Grid>
        <Grid item xs={5}>     
          <div style={styleScoreBoard}>
            <p style={{padding: "10px"}}>Total Games: </p>
            <p data-testid="total">{gameCounter}</p>
            <p style={{padding: "10px"}} >Menace Wins: </p>
            <p data-testid="wins">{wins}</p>
            <p style={{padding: "10px"}}>Human Wins: </p>
            <p data-testid="loss">{loss}</p>
            <p style={{padding: "10px"}}>Draw: </p>     
            <p>{draw}</p>
          </div>     
          <div>                   
            <Trends customCount={custom} />
            <button onClick={reset_menace} disabled data-testid="reset"/>
          </div>
        </Grid>        
      </Grid>
    </div>
  )
}

export default Game;