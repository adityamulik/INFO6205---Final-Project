
export let menace = {
  1:{
     "boxes":{},
     "orderedBoxes":[], // 
     "start":[8,4,2,1],
     "removesymm":true,
     "incentives":[1,3,-1], // beads draw, rewarded and loss
     "moves":[],
     "player":1
     },
  2:{
     "boxes":{},
     "orderedBoxes":[],
     "start":[8,4,2,1],
     "removesymm":true,
     "incentives":[1,3,-1], // beads draw, rewarded and loss
     "moves":[],
     "player":2
     }
 }
 
 // what is player 2?
 let player = 'h'
//  document.getElementById("p2picker").value = "h"
//  document.getElementById("speeddiv").style.display = "none"
 let whoA = {"h":"Human", "r":"Random", "m":"MENACE2", "p":"Perfect"}
 
 // plotting
 let plotdata = [0]
 let xmin = 0
 let xmax = 0
 let ymin = 0
 let ymax = 0
 
 // game data
 let playagain = true
 let wins_each = [0,0,0] // Menace, Draw or Human/Random winning
 let board = [0,0,0,0,0,0,0,0,0]
 let no_winner = true
 let pieces = ["","&#9711;","&times;"]
 let said = ["","","","","","","","","",""]
 let human_turn=false
 let pwns = [
     [0,1,2], // horizontal win
     [3,4,5], // horizontal win
     [6,7,8], // horizontal win
     [0,3,6], // vertical win
     [1,4,7], // vertical win
     [2,5,8], // vertical win
     [0,4,8], // diagonal win
     [6,4,2] // diagonal win
 ]
 
 let rotations=[
     [0,1,2,3,4,5,6,7,8], // 0 deg
     [0,3,6,1,4,7,2,5,8], // 90 deg rotate (right & flip l-r)
     [6,3,0,7,4,1,8,5,2], // 90 deg rotate (right)
     [6,7,8,3,4,5,0,1,2], // filp upside down
     [8,7,6,5,4,3,2,1,0], // flip upside down & opposite direction (l - r)
     [8,5,2,7,4,1,6,3,0], // 90 deg rotate (left and flip)
     [2,5,8,1,4,7,0,3,6], // 90 deg rotate (left)
     [2,1,0,5,4,3,8,7,6] //  flip (l - r)
 ]

export const calculateWinner = squares => {
  const lines = [
    [0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}

export const getMenaceMove = (board) => {
  
  const newBoard = [...board]

  return newBoard;
}

// Array Utility Functions

const array_fill = (start,length,value) => {
  var out = []
  for(var i=start;i<length;i++){
      out[i]=value
  }
  return out;
}

const count = (arr, value) => {
  var out = 0
  for(var i=0;i<arr.length;i++){
      if(arr[i] == value){out++}
  }
  return out;
}

// Game functions 
export const new_game = () => {
  if(playagain){
      menace[1]["moves"] = []
      menace[2]["moves"] = []
      board = [0,0,0,0,0,0,0,0,0]
      no_winner = true
      // for(var i=0;i<9;i++){
      //     document.getElementById("pos"+i).innerHTML = "<form onsubmit='javascript:play_human("+i+");return false'><input type='submit' value=' '></form>"
      // }
      // play_menace();      
  }    
  return board;
}

function winner(b){
  var pos = b.join("")
  var th = three(pos)
  if(th != 0){
      return th
  }
  if(count(b,0) == 0){
      return 0
  }
  return false
}

function opposite_result(r){
  if(r==0){
      return 0
  }
  return 3-r
}

export const check_win = () =>{
  let who_wins = winner(board);
  let message = [];
  // console.log("who wins bool ", who_wins);
  if(who_wins !== false){
      if(who_wins == 0){
        console.log(`INFO: It's a draw at ${new Date()}`);
        message.push(0);
        message.push(true);
        // return board;
      }
      if(who_wins == 1){
        console.log(`INFO: MEANCE won at ${new Date()}`);
        message.push(1);
        message.push(true);
        // return board;
      }
      if(who_wins == 2){
        console.log(`INFO: MEANCE lost & Opponent won at ${new Date()}`);
        message.push(2);
        message.push(true);
        // return board;
      }
      do_win(who_wins)
      // human_turn = false
      return message;
  } else {
    // console.log("Not won yet");
    // return board;
    return false;
  }
}

const do_win = (who_wins) => {
  // no_winner = false
  // for(var i=0;i<9;i++){
  //     if(board[i] == 0){
  //         document.getElementById("pos"+i).innerHTML = ""
  //     }
  // }
  // console.log("Adding new beads");
  // console.log(who_wins);
  menace_add_beads(who_wins)
  // if(player == "h"){
      // window.setTimeout(new_game, 1000);
  // } else {
      // window.setTimeout(() => { new_game() }, 5000);
  // }
  // new_game();

  // setTimeout(() => {
  //   new_game();
  // }, 10000);
}

export const play_menace = () => {
  let where = get_menace_move(1);

  board[where] = 1;

  console.log(`INFO: MENACE played it's move (O) at position ${where} on the board at ${new Date()}`);

  return board;

  // getMenaceMove(board);

  // Return board state
  // updateBoard();

  // check_win();

  // if(no_winner){
  //   play_opponent();
  // }
};

export const play_opponent = () => {
  let where = undefined;
  // Human
  
  // Random
  human_turn = false
  where = get_random_move();

  board[where] = 2;

  console.log(`INFO: Opponent played it's move (X) at position ${where} on the board at ${new Date()}`);

  return board;

  // Return board state
  // updateBoard();

  // check_win();

  // if(no_winner){
  //   play_menace();
  // }
};

export const play_human = (where) => {
  if(no_winner){
      human_turn = false
      board[where] = 2
      // document.getElementById("pos"+where).innerHTML = pieces[2]
      // check_win()
      // if(no_winner){
      //     play_menace()
      // }
  }
  return board;
}

// Board Functions

const apply_rotation = (pos,rot) => {
  var new_pos = ""
  for(var j=0;j<9;j++){
      new_pos += pos[rot[j]]
  }
  return new_pos
}

const find_all_rotations = (pos) => {
  var max = -1
  var max_rot = []
  for(var i=0;i<rotations.length;i++){
      var try_pos = apply_rotation(pos,rotations[i])
      if(try_pos > max){
          max = try_pos
          max_rot = []
      }
      if(try_pos == max){
          max_rot.push(i)
      }
  }
  return max_rot
}

const find_rotation = (pos) => {
  var max_rot = find_all_rotations(pos)
  return max_rot[Math.floor(Math.random()*max_rot.length)]
}

const three = (pos) => {
  for(var i=0;i<pwns.length;i++){
      if(pos[pwns[i][0]] != "0" && pos[pwns[i][0]] == pos[pwns[i][1]] && pos[pwns[i][1]] == pos[pwns[i][2]]){
          return parseInt(pos[pwns[i][0]])
      }
  }
  return 0;
}

const rotation_is_max = (pos) => {
  var rots = find_all_rotations(pos)
  return rots[0] == 0;
}

// Oponent Moves

const make_move = (plays) => {
  let total = 0
  for(var i=0;i<plays.length;i++){
      total += plays[i]
  }
  if(total == 0){
      return "resign"
  } else {
      let rnd = Math.floor(Math.random()*total)
      total = 0
      for(var i=0;i<plays.length;i++){
          total += plays[i]
          if(rnd < total){
              return i
          }
      }
  }
}

const get_random_move = () => {
  let choices = [];
  for(var i=0;i<9;i++){
    if(board[i] == 0){
        choices.push(i)
    }
  }
  return choices[Math.floor(Math.random()*choices.length)];
}

// Menace Function
const add_box = (pos,n,s) => {
  menace[n]["orderedBoxes"][s].push(pos)
  menace[n]["boxes"][pos] = new_box(pos,n,menace[n]["start"][s])
}

const new_box = (pos,n,start) => {
  var rots = find_all_rotations(pos)
  var box = array_fill(0,9,start)
  for(var i=0;i<9;i++){
      if(pos[i] != "0"){
          box[i] = 0
      }
  }
  if(menace[n]["removesymm"]){
      for(var i=1;i<rots.length;i++){
          var r = rotations[rots[i]]
          for(var j=0;j<9;j++){
              if(r[j]!=j){
                  box[Math.min(j,r[j])] = 0
              }
          }
      }
  }
  return box;
}

const search_moves =(b, n) => {
  var played = 10 - count(b,0)
  var move = 2 - played%2
  var other = 3 - move
  var minmove = 9
  for(var i=8;i>=0;i--){
      if(b[i] == move){
          minmove = i
      }
  }
  for(var i=0;i<minmove;i++){
      if(b[i]==0){
          var newboard = b.slice()
          newboard[i] = move
          if(n == other || n == "both"){
              if(winner(newboard) === false && rotation_is_max(newboard)){
                  add_box(newboard.join(""),other,Math.floor(played/2))
              }
          }
              if(played < 7){
                  search_moves(newboard,n)
              }
      }
  }
}

const order_boxes = (n) => {
  menace[n]["orderedBoxes"] = menace[n]["orderedBoxes"][0].concat(menace[n]["orderedBoxes"][1],menace[n]["orderedBoxes"][2],menace[n]["orderedBoxes"][3]);
}

const get_menace_move = (n) => {
  var inv_where = 0
  if(count(board,0) == 1){
      for(var i=0;i<9;i++){
          if(board[i] == 0){
              inv_where = i
          }
      }
  } else {
      var pos = board.join("")
      var which_rot = find_rotation(pos)
      var pos = apply_rotation(pos,rotations[which_rot])
      var plays = menace[n]["boxes"][pos]
      var where = make_move(plays)
      if(where == "resign"){return "resign"}
      // document.getElementById(pos+"-"+where).style.color = "#FF0000"
      var inv_where = rotations[which_rot][where]
      menace[n]["moves"].push([pos,where])
  }
  return inv_where
}

function box_add(pos,move,change,n){
  menace[n]["boxes"][pos][move] = Math.max(0,change+menace[n]["boxes"][pos][move])
  // update_box(pos,n)
}


function menace_add_beads(result){
  for(var i=0;i<menace[1]["moves"].length;i++){
      box_add(menace[1]["moves"][i][0],menace[1]["moves"][i][1],menace[1]["incentives"][result],1)
  }
  if(player=="m"){
      for(var i=0;i<menace[2]["moves"].length;i++){
          box_add(menace[2]["moves"][i][0],menace[2]["moves"][i][1],menace[2]["incentives"][opposite_result(result)],2)
      }
  }
  update_totals(result)
}

// UI functions
function update_totals(n){
  // plotdata.push(plotdata[plotdata.length-1]+menace[1]["incentives"][n])
  wins_each[n] += 1
  // document.getElementById("dis"+n).innerHTML = wins_each[n]
  // update_plot()
}

// Game Reset and new game

export const reset_menace = (n) => {
  console.log("Reset Menace");
  playagain = true
  for(let i=1;i<=2;i++){
      if(n==i || n=="both"){
          menace[i]["orderedBoxes"] = [[],[],[],[]]
          menace[i]["boxes"] = []
      }
  }
  if(n == 1 || n == "both"){
      // plotdata = [0]
      // update_plot()
      // redraw_plot()
      // wins_each = [0,0,0]
      // for (let i=0;i<3;i++) {
      //     document.getElementById("dis"+i).innerHTML = wins_each[i]
      // }

      add_box("000000000",1,0);
  }

  search_moves(array_fill(0,9,0),n)

  for(let i=1;i<=2;i++){
      if(n == i || n == "both"){
          order_boxes(i)
      }
  }
  // show_menace(1)
  // if(player=="m"){
  //     show_menace(2)
  // }
  new_game();

  return board;
}

export const updateBoard = () => { return board };