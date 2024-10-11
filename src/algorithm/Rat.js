let possiblePaths = new Set();
export function ratInMaze(grid, x, y, N) {
  let sol = matrix(N, N);
  possiblePaths=new Set()
  const res = solveMazeUtil(grid, x, y, N, sol, "");
  if (res == false) {
    return null;
  }
  return possiblePaths;
}

function matrix(m, n) {
  var result = [];
  for (var i = 0; i < n; i++) {
    result.push(new Array(m).fill(0));
  }
  return result;
}

function isSafe(row, col, grid, n, visited) {
  if (
    row == -1 ||
    row == n ||
    col == -1 ||
    col == n ||
    visited[row][col] ||
    grid[row][col].isWall
  )
    return false;

  return true;
}

const solveMazeUtil = (grid, row, col, n, visited, path) => {
  
  if (row == n - 1 && col == n - 1 && grid[row][col].isFinish) {
    possiblePaths.add(path);
    return true;
  }

  // Mark the cell as visited
  if(visited[row][col]==1) return false;
  visited[row][col] = 1;

  // Try for all the 4 directions (down, left,
  // right, up) in the given order to get the
  // paths in lexicographical order

  // Check if downward move is valid
  if (isSafe(row + 1, col, grid, n, visited)) {
    path = path + "D";
    if(solveMazeUtil(grid, row+1, col, n, visited, path)) return true;
    path = path.substring(0, path.length - 1);
  }

  // Check if the left move is valid
  if (isSafe(row, col - 1, grid, n, visited)) {
    path = path + "L";
    if(solveMazeUtil(grid, row, col-1, n, visited, path)) return true;
    path = path.substring(0, path.length - 1);
  }

  // Check if the right move is valid
  if (isSafe(row, col + 1, grid, n, visited)) {
    path = path + "R";
    if(solveMazeUtil(grid, row, col+1, n, visited, path)) return true;
    path = path.substring(0, path.length - 1);
  }

  // Check if the upper move is valid
  if (isSafe(row - 1, col, grid, n, visited)) {
    path = path + "U";
    if(solveMazeUtil(grid, row-1, col, n, visited, path)) return true;
    path = path.substring(0, path.length - 1);
  }

  // Mark the cell as unvisited for
  // other possible paths
  visited[row][col] = 0;
  return false;
};
// function solveMazeUtil(grid, x, y, N, sol){
//     if (x == N - 1 && y == N - 1 && grid[x][y].isFinish ) {
//         return true;
//     }
//     if (x >= 0 && x < N && y >= 0 && y < N && grid[x][y].isWall == false) {
//         // Check if the current block is already part of
//         // solution path.
//         if (sol[x][y] == 1)
//             return false;
//         // mark x, y as part of solution path
//         sol[x][y] = 1;
//         /* Move forward in x direction */
//         if (solveMazeUtil(grid, x+1, y, N, sol) == true)
//             return true;
//         // If moving right didn't work
//         // move left
//           if (solveMazeUtil(grid, x-1, y, N, sol) == true)
//             return true;
//         // If moving in x direction doesn't give solution
//         // then Move down in y direction
//         if (solveMazeUtil(grid, x, y+1, N, sol) == true)
//             return true;
//         // If moving down didn't work
//         // move up
//           if (solveMazeUtil(grid, x, y-1, N, sol) == true)
//             return true;
//         // If none of the above movements work then
//         // BACKTRACK: unmark x, y as part of solution path
//         sol[x][y] = 0;
//         return false;
//     }
//     return false;
// }
