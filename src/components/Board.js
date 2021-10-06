import React from "react";
import Square from "./Square";

function Board({squares, size, winCombo, onClick}) {
  const renderSquare = (i) => {
    const isWinner = winCombo.includes(i);
    return <Square value={squares[i]} onClick={() => onClick(i)} isWinner={isWinner}/>;
  };

  const boardRows = [];
  for (let row = 0; row < size; row++) {
    const squaresInRow = [];
    for (let col = 0; col < size; col++) {
      squaresInRow.push(renderSquare(row * size + col));
    }
    boardRows.push(<div className="board-row">{squaresInRow}</div>);
  }

  return boardRows;
}

export default Board;