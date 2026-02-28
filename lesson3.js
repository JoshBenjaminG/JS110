const readline = require('readline-sync');

function displayBoard(board) {
  console.log.clear;

  console.log('');
  console.log('     |     |');
  console.log(`  ${board['1']}  |  ${board['2']}  |  ${board['3']}`);
  console.log('     |     |');
  console.log('-----+-----+-----');
  console.log('     |     |');
  console.log(`  ${board['4']}  |  ${board['5']}  |  ${board['6']}`);
  console.log('     |     |');
  console.log('-----+-----+-----');
  console.log('     |     |');
  console.log(`  ${board['7']}  |  ${board['8']}  |  ${board['9']}`);
  console.log('     |     |');
  console.log('');
}

function boardFull(board) {
  let emptySquares = Object.keys(board).filter(key => board[key] === ' ');
  if (emptySquares.length === 0) {
    console.log("Board is full, game over!");
    return true;
  } else {
    return false;
  }
}

const WIN_COMBINATIONS = [
  ['1', '2', '3'],  // top row
  ['4', '5', '6'],  // middle row
  ['7', '8', '9'],  // bottom row
  ['1', '4', '7'],  // left column
  ['2', '5', '8'],  // middle column
  ['3', '6', '9'],  // right column
  ['1', '5', '9'],  // diagonal top-left to bottom-right
  ['3', '5', '7'],  // diagonal top-right to bottom-left
];

function someoneWon(board) {
  return WIN_COMBINATIONS.some (combo => {
    return combo.every(square => board[square] === 'X') || combo.every(square => board[square] === 'O')
  });
}

function initializeBoard() {
  let board = {};                           // start with empty object
  for (let square = 1; square <= 9; square++) {  // loop 1 through 9
    board[String(square)] = ' ';           // add each square as a key, value is empty space
  }
  return board;                            // return the completed board
}

function prompt(msg) {
  console.log(`-> ${msg}`);
}

function playerChoose(board) {
  let square;

  let emptySquares = Object.keys(board).filter(key => board[key] === ' ');

  while (true) {
    prompt(`Choose a square: ${emptySquares.join(', ')}`);
    square = readline.question().trim();
    if (emptySquares.includes(square)) break;
    prompt('Invalid choice, try again');
  }

  board[square] = 'X';
  
}

function computerChoose(board) {
  let emptySquares = Object.keys(board).filter(key => board[key] === ' ');
  let index = emptySquares[Math.floor(Math.random() * emptySquares.length)];
  board[index] = 'O';
}


let board = initializeBoard();

while (true) {
  playerChoose(board);
  computerChoose(board);
  displayBoard(board);

  if (boardFull(board)) {
    console.log("Board is full, game over!");
    break;
  }

  if (someoneWon(board)) {
  console.log(`Game is over!`);
  break;
  }
}


