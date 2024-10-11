import React from "react";

const Node = ({
  row,
  col,
  isFinish,
  isStart,
  isWall,
  isPath,
  onMouseUp,
}) => {
  // console.log(row, col, isFinish, isStart, isWall);
  const extraClass = isFinish
    ? "nodeFinish"
    : isStart
    ? "nodeStart"
    : isWall
    ? "nodeWall"
    : isPath
    ? "nodePath"
    : "";

  return (
    <div
      id={`node-${row}-${col}`}
      className={`node ${extraClass}`}
      onMouseUp={()=>onMouseUp(row, col)}
    ></div>
  );
};

export default Node;
