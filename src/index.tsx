import React, { ReactNode, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

type SquareType = 'X' | 'O' | null;
interface SquareProps {
  value: SquareType;
  onClick(): void;
}

const Square: React.FC<SquareProps> = (props) => {
  return (
    <button className='square' onClick={props.onClick}>
      {props.value}
    </button>
  );
};

interface BoardProps {
  onClick(i: number): void;
  squares: SquareType[];
}

const Board: React.FC<BoardProps> = (props) => {
  const renderSquare = (i: number): ReactNode => {
    return <Square value={props.squares[i]} onClick={() => props.onClick(i)} />;
  };

  return (
    <div>
      <div className='board-row'>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className='board-row'>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className='board-row'>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

const Game: React.FC = () => {
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [squares, setSqaures] = useState<SquareType[]>([]);

  const handleClick = (i: number): void => {
    const squaresNew = squares.slice();
    if (calculateWinner(squaresNew) || squaresNew[i]) {
      return;
    }
    squaresNew[i] = xIsNext ? 'X' : 'O';

    setSqaures(squaresNew);
    setXIsNext(!xIsNext);
  };

  const winner = calculateWinner(squares);

  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <div>
      <h1>Tic Tac Toe</h1>
      <div>
        <div className='game'>
          <div className='game-board'>
            <Board squares={squares} onClick={(i) => handleClick(i)} />
          </div>
          <div className='game-info'>
            <div>{status}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ========================================

ReactDOM.render(<Game />, document.getElementById('root'));

function calculateWinner(squares: SquareType[]) {
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
