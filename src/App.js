import React, { useState, useEffect } from 'react';
import './App.css';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winningLine, setWinningLine] = useState(null);
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');
  const [symbolChosen, setSymbolChosen] = useState(false);
  const [player1Symbol, setPlayer1Symbol] = useState(null);
  const [player2Symbol, setPlayer2Symbol] = useState(null);
  const [winner, setWinner] = useState(null);
  const [showSymbolChoice, setShowSymbolChoice] = useState(false); // For symbol choice animation

  useEffect(() => {
    if (player1Name && player2Name) {
      setTimeout(() => setShowSymbolChoice(true), 500); // Show symbol choice with delay
    }
  }, [player1Name, player2Name]);

  const handleSymbolChoice = (symbol) => {
    setPlayer1Symbol(symbol);
    setPlayer2Symbol(symbol === 'X' ? 'O' : 'X');
    setSymbolChosen(true); // Start the game
  };

  const handleClick = (index) => {
    if (winner || board[index]) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? player1Symbol : player2Symbol;
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const winData = calculateWinner(newBoard);
    if (winData) {
      setWinningLine(winData.line);
      setWinner(isXNext ? player1Name : player2Name); // Set the winner based on the player's turn
    }
  };

  const getWinningSquares = () => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6]             // diagonals
    ];
    return winningLine !== null ? lines[winningLine] : [];
  };

  const renderSquare = (index) => {
    const winningSquares = getWinningSquares();
    const isWinningSquare = winningSquares.includes(index);
    return (
      <button
        className={`square ${isWinningSquare ? 'winning-square' : ''}`}
        onClick={() => handleClick(index)}
        style={{ color: board[index] === 'X' ? 'red' : 'blue' }}
      >
        {board[index]}
      </button>
    );
  };

  const restartGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinningLine(null);
    setWinner(null);
    setPlayer1Name('');
    setPlayer2Name('');
    setPlayer1Symbol(null);
    setPlayer2Symbol(null);
    setShowSymbolChoice(false);
  };

  return (
    <div className="game">
      <h1>Tic Tac Toe</h1>
      
      {/* Name Entry Section with Animation */}
      {!symbolChosen && (
        <div className="name-form">
          <input
            type="text"
            placeholder="Enter Player 1 Name"
            value={player1Name}
            onChange={(e) => setPlayer1Name(e.target.value)}
            required
            className="input-name"
          />
          <input
            type="text"
            placeholder="Enter Player 2 Name"
            value={player2Name}
            onChange={(e) => setPlayer2Name(e.target.value)}
            required
            className="input-name"
          />
        </div>
      )}

      {/* Symbol Selection with Animation */}
      {player1Name && player2Name && showSymbolChoice && !symbolChosen && (
        <div className="symbol-choice fade-in">
          <h3>{player1Name}, choose your symbol:</h3>
          <button onClick={() => handleSymbolChoice('X')} className="symbol-button">X</button>
          <button onClick={() => handleSymbolChoice('O')} className="symbol-button">O</button>
        </div>
      )}

      {/* Game Board */}
      {symbolChosen && (
        <>
          <div className="board fade-in">
            {[...Array(9)].map((_, i) => renderSquare(i))}
          </div>
          <div className="status">
            {winner ? `Winner: ${winner}` : `Next Player: ${isXNext ? player1Name : player2Name}`}
          </div>
          <button className="restart" onClick={restartGame}>
            Restart Game
          </button>
        </>
      )}
    </div>
  );
};

// Function to calculate the winner
const calculateWinner = (board) => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
  ];
  
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { player: board[a], line: i }; // Return both the winner and the winning line index
    }
  }
  
  return null;
};

export default TicTacToe;
