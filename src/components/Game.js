import { useEffect, useRef, useState } from "react";
import Board from "./Board";
import gameLogic from "../services/gameLogic";

function Game(props) {
  const [boardSize, setBoardSize] = useState(3);
  const [history, setHistory] = useState([
    {
      squares: Array(3 * 3).fill(null),
      newMove: null,
    },
  ]);
  const [historyAscending, setHistoryAscending] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const winner = useRef(null);

  useEffect(() => {
    let size;
    while (1) {
      size = parseInt(
        prompt("Game's size must be between 3 and 20\nGame's size:")
      );
      if (size < 3 || size > 20 || isNaN(size)) {
        alert("Enter a number between 3 and 20");
      } else {
        setBoardSize(size);
        setHistory([
          {
            squares: Array(size * size).fill(null),
            newMove: null,
          },
        ]);
        break;
      }
    }
  }, []);

  const handleClick = (i) => {
    const currentHistory = history.slice(0, stepNumber + 1);
    const current = currentHistory[currentHistory.length - 1];
    const squares = current.squares.slice();
    if (winner.current || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? 1 : -1;
    setHistory(
      currentHistory.concat([
        {
          squares: squares,
          newMove: i,
        },
      ])
    );
    setStepNumber(currentHistory.length);
    setXIsNext(!xIsNext);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const handleSortClick = () => {
    setHistoryAscending(!historyAscending);
  };

  const tempHistory = historyAscending ? history : history.slice().reverse();
  const currentIndex = historyAscending
    ? stepNumber
    : tempHistory.length - stepNumber - 1;
  const current = tempHistory[currentIndex];
  const result = gameLogic.calculateWinner(
    current.squares,
    boardSize,
    boardSize < 5 ? boardSize : 5
  );
  winner.current =
    result.winPos >= 0 ? (current.squares[result.winPos] > 0 ? "X" : "O") : null;

  const moves = tempHistory.map((step, move) => {
    const movePosition = gameLogic.squareNumberToPosition(
      step.newMove,
      boardSize
    );
    const desc =
      step.newMove != null
        ? `Go to move #${
            historyAscending ? move : tempHistory.length - move - 1
          }(col: ${movePosition.col}, row: ${movePosition.row})`
        : "Go to game start";
    return (
      <li key={move}>
        <button
          style={{
            fontWeight: currentIndex === move ? "bold" : "normal",
          }}
          onClick={() => jumpTo(move)}
        >
          {desc}
        </button>
      </li>
    );
  });

  const player = xIsNext ? "X" : "O";
  let status = "Next Player: " + player;
  if (stepNumber === boardSize * boardSize) {
    status = "Game DRAW!";
  } else if (winner.current) {
    status = "Winner: " + winner.current;
  }

  console.log(result);

  return (
    <>
      <p>{`Score ${boardSize < 5 ? boardSize : 5} in a row to win`}</p>
      <div className="game">
        <div className="game-board">
          <Board
            size={boardSize}
            squares={current.squares}
            onClick={handleClick}
            winCombo={gameLogic.calculateWinCombo(
              result.winType,
              result.winPos,
              boardSize < 5 ? boardSize : 5,
              boardSize
            )}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <button onClick={handleSortClick}>
            {historyAscending ? "Sort descending" : "Sort ascending"}
          </button>
          <ol>{moves}</ol>
        </div>
      </div>
    </>
  );
}

export default Game;
