// Import use of States from React
import { useState } from "react";

// Square component with a {value} state that is displayed on the component
function Square({value, onSquareClick}){

  // Display a button element of class "square" with content {value}
  // Update game state via onSquareClick
  return (
    <button className="square" onClick={onSquareClick}>{value}</button>
  );
}

// Board component
export default function Board() {
  // Incorporate squares state into board state. Default to 9 empty squares.
  const [squares, setSquares] = useState(Array(9).fill(null));

  // Set up player turns
  const [isXTurn, setIsXTurn] = useState(true); // set X as default player

  // Determine and display current player or winning player if game is finished
  const winner = calculateWinner(squares); //check winner status
  let status; // store status for display on board
  if(winner){
    status = "Winner: " + winner; // Display winning player if applicable
  } else {
    status = (isXTurn ? 'X' : 'O') + "'s turn"; // Else display current player turn
  }

  // Function to handle clicking on squares to change board state
  function handleClick(i){
    // Abort if square is already not null, or game is finished
    if(squares[i] || calculateWinner(squares)){
      return;
    }

    //Otherwise...
    const nextSquares = squares.slice(); // Copy current squares array
    nextSquares[i] = isXTurn ? 'X': 'O'; // Set value of relevant square to 'X' or 'O'
    setSquares(nextSquares); // Update board state with new squares state array
    setIsXTurn(!isXTurn); // Swap player turn
  }

  return (
    // A text line of current or winning player
    // A set of three rows (divs) of three squares to form a 3x3 grid
    // Each square displays a {value} from the squares state array
  <>
    <div className="status">{status}</div>
    <div className="board-row">
      <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
      <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
      <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
    </div>
    <div className="board-row">
      <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
      <Square value={squares[4]} onSquareClick={() => handleClick(4)} ></Square>
      <Square value={squares[5]} onSquareClick={() => handleClick(5)} ></Square>
    </div>
    <div className="board-row">
      <Square value={squares[6]} onSquareClick={() => handleClick(6)} ></Square>
      <Square value={squares[7]} onSquareClick={() => handleClick(7)} ></Square>
      <Square value={squares[8]} onSquareClick={() => handleClick(8)} ></Square>
    </div>
  </>
  );
}

// Function  to determine winner of game
function calculateWinner(squares) {
  // Array of all possible combinations (rows, columns, diagonals)
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
  // For each line, check if all match, and output the X or O
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}