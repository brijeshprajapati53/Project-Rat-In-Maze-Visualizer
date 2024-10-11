import React from "react";
import { useEffect, useState } from "react";
import Node from "./Node";
import { ratInMaze } from "../algorithm/Rat";

const Ratvisulizer = () => {
  const [state, setState] = useState({
    grid: [],
  });
  const [isStartALgo, setIsStartALgo] = useState(false);
  const [isRunning, setIsrunning] = useState(false)
  const [number, setNumber] = useState("");
  const n = 6;
  const START_NODE_ROW = 0;
  const START_NODE_COL = 0;
  const FINISH_NODE_ROW = n - 1;
  const FINISH_NODE_COL = n - 1;
  useEffect(() => {
    const grid = getOurGrid();
    setState({ grid });
  }, []);

  const createNode = (col, row) => {
    return {
      col,
      row,
      isStart: row === START_NODE_ROW && col === START_NODE_COL,
      isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
      distance: Infinity,
      isVisited: false,
      isWall: false,
      isPath: false,
      previousNode: null,
    };
  };

  const getOurGrid = () => {
    let grid = [];
    for (let row = 0; row < n; row++) {
      let temp = [];
      for (let col = 0; col < n; col++) {
        temp.push(createNode(col, row));
      }
      grid.push(temp);
    }
    return grid;
  };

  // const handleMouseDown = (row, col) => {
  // const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
  // setState({ grid: newGrid });
  // console.log(row, col)
  // };

  // const handleMouseEnter = (row, col) => {
  // console.log(row, col)
  // const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
  // setState({ grid: newGrid });
  // };

  const handleMouseUp = (row, col) => {
    const newGrid = getNewGridWithWallToggled(row, col);
    // console.log(row, col)
    setState({ grid: newGrid });
  };
  const algoRat = () => {
    const { grid } = state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = ratInMaze(grid, 0, 0, n);
    console.log(visitedNodesInOrder);
    if (visitedNodesInOrder == null) {
      alert("Path not found");
      return;
    }
    const [first] = visitedNodesInOrder;
    let row = 0;
    let col = 0;
    // str = first.split("").reverse().join("")
    const str = first;
    console.log(str);
    const node = grid[row][col];
    const newNode = {
      ...node,
      isPath: true,
    };
    grid[row][col] = newNode;
    setIsStartALgo(true)
    setIsrunning(true)
    for (let i = 0; i < str.length; i++) {
      setTimeout(() => {
        const node = grid[row][col];
        const newNode = {
          ...node,
          isStart: false,
        };
        grid[row][col] = newNode;
        const pos = str[i];
        if (pos == "D") {
          //R
          const node = grid[row + 1][col];
          const newNode = {
            ...node,
            isPath: true,
            isStart: true,
          };
          grid[row + 1][col] = newNode;
          row = row + 1;
        } else if (pos == "U") {
          //L
          const node = grid[row - 1][col];
          const newNode = {
            ...node,
            isPath: true,
            isStart: true,
          };
          grid[row - 1][col] = newNode;
          row = row - 1;
        } else if (pos == "R") {
          // D
          const node = grid[row][col + 1];
          const newNode = {
            ...node,
            isPath: true,
            isStart: true,
          };
          grid[row][col + 1] = newNode;
          col = col + 1;
        } else if (pos == "L") {
          //U
          const node = grid[row][col - 1];
          const newNode = {
            ...node,
            isPath: true,
            isStart: true,
          };
          grid[row][col - 1] = newNode;
          col = col - 1;
        }

        if (row == n - 1 && col == n - 1) {
          const nodeFinish = grid[row][col];
          const newN = {
            ...nodeFinish,
            isFinish: false,
            isStart: true,
          };

          grid[row][col] = newN;
          
          setIsrunning(false)
        }
        setState({ grid: grid });
      }, 1000 * i);
    }
    // for (let row = 0; row < n; row++) {
    //   for (let cl = 0; col < n; col++) {
    //     if(visitedNodesInOrder[row][col] == 1){
    //       console.log(grid[row][col])
    //       const node = grid[row][col];
    //       const newNode = {
    //         ...node,
    //         isPath: true,
    //       };
    //       grid[row][col] = newNode;
    //     }
    //   }
    // }
    // setState({ grid: grid });
  };
  const newGrid = ()=>{
    setIsStartALgo(false)
    const grid = getOurGrid();
    setState({ grid });
  }
  const { grid } = state;

  const getNewGridWithWallToggled = (row, col) => {
    const node = grid[row][col];
    const newNode = {
      ...node,
      isWall: !node.isWall,
    };
    grid[row][col] = newNode;
    return grid;
  };

  return (
    <>
      <div className="flex justify-center mt-10">
        {grid &&
          grid.map((row, rowidx) => {
            return (
              <div key={rowidx}>
                {row.map((node, colidx) => {
                  const { row, col, isFinish, isStart, isWall, isPath } = node;
                  return (
                    <Node
                      key={colidx}
                      row={row}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      isPath={isPath}
                      onMouseUp={handleMouseUp}
                    />
                  );
                })}
              </div>
            );
          })}
      </div>
      <div>
        {
          !isStartALgo ? 
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={algoRat} 
          >
            Start
          </button>:<button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={newGrid} disabled={isRunning}
          >
            New Grid
          </button>
        }
      </div>
      <div>{number}</div>
    </>
  );
};

export default Ratvisulizer;
