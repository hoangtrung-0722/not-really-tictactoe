import React from "react";

function Square({value, onClick, isWinner}) {
  let player;
  const style = {
    "background" : "white",
    "color" : "black"
  }
  if (value === 1) {
    player = "X";
    if (isWinner) {
      style.background = "red";
      style.color = "white";
    }
  } else if (value === -1) {
    player = "O";
    if (isWinner) {
      style.background = "blue";
      style.color = "white";
    }
  }
  return (
    <button className="square" onClick={onClick} style={style}>
      {player}
    </button>
  );
}

export default Square;