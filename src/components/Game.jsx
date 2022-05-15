import React, { useState, useEffect } from 'react';
import Board from './Board';
import { reset_menace, 
         play_opponent, 
         play_menace, 
         check_win, 
         new_game } from '../engine/menace';
import Trends from './Trends';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

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

  const [board, setBoard] = useState(Array(9).fill(null));
  const [resetMenaceHumanBool, setResetMenaceHumanBool] = useState(false);
  const [wins, setWin] = useState(0);
  const [loss, setLoss] = useState(0);
  const [draw, setDraw] = useState(0);
  const [gameCounter, setGameCounter] = useState(0);
  const [beadsCount, setBeadsCount] = useState(0);
  const [meanceResetBool, setMenaceResetBool] = useState(false);
  const [custom, setCustomArray] = useState([]);

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

  // State update
  useEffect(() => {

  }, [board]);

  // const handleClick = (i) => {
  //     const boardCopy = [...board];
  //     boardCopy[i] = 2;
  //     play_menace();
  // };    

  const triggerHuman = () => {

    if (!resetMenaceHumanBool) {
      reset_menace("both");
      setResetMenaceHumanBool(true);
    }    

    if (!resetMenaceHumanBool) {
      new_game();
    }

    let reset = true;
    let menacePlay = true;

    if (reset) {
      if (menacePlay) {
        let menaceBoardUpdate = play_menace();
        setBoard(menaceBoardUpdate);        
        menacePlay = false;
      }
    }
  }

  const triggerRandom = () => {

    if (!meanceResetBool) {
      reset_menace("both");
      setMenaceResetBool(true);
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
                     
        setBoard(newArr);
        menacePlay = false;
        opponentPlay = true;

        const winStatus = check_win();

        if (winStatus[1]) {
          reset = false;
          opponentPlay = false;

          if (winStatus[0] === 0) {
            setDraw(draw + 1);
            setBeadsCount(beadsCount + 1);
            setCustomArray(custom => [...custom, {name: gameCounter + 1, uv: beadsCount + 1, pv: 2400, amt: 2400}]);
          } else if (winStatus[0] === 1) {
            setWin(wins + 1);
            setBeadsCount(beadsCount + 3);
            setCustomArray(custom => [...custom, {name: gameCounter + 1, uv: beadsCount + 3, pv: 2400, amt: 2400}]);
          } else { 
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

        if (winStatus[1]) {

          reset = false;
          menacePlay = false;

          if (winStatus[0] === 0) {
            setDraw(draw + 1);
          } else if (winStatus[0] === 1) {
            setWin(wins + 1);
          } else {
            setLoss(loss + 1);
            setBeadsCount(beadsCount - 1);
            setCustomArray(custom => [...custom, {name: gameCounter + 1, uv: beadsCount - 1, pv: 2400, amt: 2400}]);
          }
        } 
      }            

      setGameCounter(gameCounter + 1);
    }
  }

  return (

    <div>
      <h1 style={styleHeader}>The MENACE</h1>
      <Grid container spacing={2}>
        <Grid item xs={7} style={styleLeft}>          
          <Board squares={board} /> 
          <Button variant="outlined" onClick={triggerRandom} style={styleBtn} data-testid="random-btn">Random</Button>    
          <div style={{textAlign: "center", margin: "49px"}}>
            <Typography variant="h6" gutterBottom component="div">
              Menace: O
            </Typography>
            <Typography variant="h6" gutterBottom component="div">
              Opponent: X
            </Typography>
          </div>
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
            <Typography variant="subtitle1" gutterBottom component="div">
              <ul>
                <li>Every win by MENACE is awarded with 3 beads (+3)</li>
                <li>Every draw by MENACE is awarded with 1 bead (+1)</li>
                <li>Every loss by MENACE is punished with 1 bead (-1)</li>
              </ul>              
            </Typography>
          </div>
        </Grid>        
      </Grid>
    </div>
  )
}

export default Game;