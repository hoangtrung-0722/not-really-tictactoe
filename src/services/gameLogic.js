const calculateWinner = (squares, squareEdge, winPoint) => {
  for (let i = 0; i < squareEdge; i++) {
    let winPosition = null;
    winPosition = columnCheck(squares, squareEdge, i, winPoint);
    if (winPosition !== null) {
      return {
        winType: "column",
        winPos: winPosition,
      };
    }
    winPosition = rowCheck(squares, squareEdge, i, winPoint);
    if (winPosition !== null) {
      return {
        winType: "row",
        winPos: winPosition,
      };
    }
    if (i < squareEdge - winPoint + 1) {
      winPosition = crossLeftCheck(squares, squareEdge, i, winPoint);
      if (winPosition != null) {
        return {
          winType: "crossleft",
          winPos: winPosition,
        };
      }
      if (i !== 0) {
        winPosition = crossLeftCheck(
          squares,
          squareEdge,
          squareEdge * i,
          winPoint
        );
        if (winPosition != null) {
          return {
            winType: "crossleft",
            winPos: winPosition,
          };
        }
      }
    }
    if (i >= winPoint - 1) {
      winPosition = crossRightCheck(squares, squareEdge, i, winPoint);
      if (winPosition != null) {
        return {
          winType: "crossright",
          winPos: winPosition,
        };
      }
      if (i !== squareEdge - 1) {
        winPosition = crossRightCheck(
          squares,
          squareEdge,
          i + (squareEdge + 1) * (squareEdge - i - 1),
          winPoint
        );
        if (winPosition != null) {
          return {
            winType: "crossright",
            winPos: winPosition,
          };
        }
      }
    }
  }
  return {
    winType: "",
    winPos: -1
  };
};

const squareNumberToPosition = (squareNumber, squareEdge) => {
  const x = squareNumber % squareEdge;
  const y = parseInt(squareNumber / squareEdge);
  return { col: x + 1, row: y + 1 };
};

const calculateWinCombo = (winType, winPos, winPoint, boardSize) => {
  const winCombo = [];
  switch (winType) {
    case "row":
      for (let i = winPoint - 1; i >= 0; i--) {
        winCombo.push(winPos - i);
      }
      break;
    case "column":
      for (let i = winPoint - 1; i >= 0; i--) {
        winCombo.push(winPos - boardSize * i);
      }
      break;
    case "crossleft":
      for (let i = winPoint - 1; i >= 0; i--) {
        winCombo.push(winPos - boardSize * i - i);
      }
      break;
    case "crossright":
      for (let i = winPoint - 1; i >= 0; i--) {
        winCombo.push(winPos - boardSize * i + i);
      }
      break;

    default:
  }
  return winCombo;
};

function rowCheck(square, squareEdge, row, winPoint) {
  if (row >= squareEdge) return null;
  const startIndex = row * squareEdge;
  let result = 0;
  for (let i = startIndex; i < (row + 1) * squareEdge; i++) {
    if (square[i] === null) {
      result = 0;
      continue;
    }
    if (i > startIndex && square[i] !== square[i - 1]) {
      result = square[i];
    } else {
      result += square[i];
    }
    if (result >= winPoint || result <= -winPoint) return i;
  }
  return null;
}

function columnCheck(square, squareEdge, col, winPoint) {
  if (col >= squareEdge) return null;
  let result = 0;
  for (let i = col; i <= square.length; i += squareEdge) {
    if (square[i] === null) {
      result = 0;
      continue;
    }
    if (i > col && square[i] !== square[i - squareEdge]) {
      result = square[i];
    } else {
      result += square[i];
    }
    if (result === winPoint || result === -winPoint) return i;
  }
  return null;
}

function crossLeftCheck(square, squareEdge, start, winPoint) {
  let result = 0;
  for (let i = start; i < square.length; i += squareEdge + 1) {
    if (square[i] === null) {
      result = 0;
      continue;
    }
    if (i > start && square[i] !== square[i - squareEdge - 1]) {
      result = square[i];
    } else {
      result += square[i];
    }
    if (result === winPoint || result === -winPoint) return i;
  }

  return null;
}

function crossRightCheck(square, squareEdge, start, winPoint) {
  let result = 0;
  for (let i = start; i < square.length; i += squareEdge - 1) {
    if (square[i] === null) {
      result = 0;
      continue;
    }
    if (i > start && square[i] !== square[i - squareEdge + 1]) {
      result = square[i];
    } else {
      result += square[i];
    }
    if (result === winPoint || result === -winPoint) return i;
  }

  return null;
}

const gameLogic = {
  calculateWinner,
  squareNumberToPosition,
  calculateWinCombo
};

export default gameLogic;
