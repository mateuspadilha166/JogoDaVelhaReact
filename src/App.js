import { useState } from 'react';
import './stayle.css'
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, quadrados, onPlay }) {
  function handleClick(i) {
    if (pontosGanhador(quadrados) || quadrados[i]) {
      return;
    }
    const proximoQuadrado = quadrados.slice();
    if (xIsNext) {
      proximoQuadrado[i] = 'X';
    } else {
      proximoQuadrado[i] = 'O';
    }
    onPlay(proximoQuadrado);
  }

  const ganhador = pontosGanhador(quadrados);
  let status;
  if (ganhador) {
    status = 'Ganhador: ' + ganhador;
  } else {
    status = 'Proximo Jogador: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={quadrados[0]} onSquareClick={() => handleClick(0)} />
        <Square value={quadrados[1]} onSquareClick={() => handleClick(1)} />
        <Square value={quadrados[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={quadrados[3]} onSquareClick={() => handleClick(3)} />
        <Square value={quadrados[4]} onSquareClick={() => handleClick(4)} />
        <Square value={quadrados[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={quadrados[6]} onSquareClick={() => handleClick(6)} />
        <Square value={quadrados[7]} onSquareClick={() => handleClick(7)} />
        <Square value={quadrados[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentquadrados = history[currentMove];

  function handlePlay(proximoQuadrado) {
    const nextHistory = [...history.slice(0, currentMove + 1), proximoQuadrado];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((quadrados, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} quadrados={currentquadrados} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function pontosGanhador(quadrados) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (quadrados[a] && quadrados[a] === quadrados[b] && quadrados[a] === quadrados[c]) {
      return quadrados[a];
    }
  }
  return null;
}
