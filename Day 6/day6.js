const fs = require("fs");

const data = fs.readFileSync("./Day 6/input.txt", "utf8");

// Part 1
const grid = [];
let startI, startJ;
data.split(/\r?\n/).forEach((line) => {
  const splitLine = line.split("");
  if (splitLine.includes("^")) {
    startI = grid.length;
    startJ = splitLine.indexOf("^");
  }
  grid.push(splitLine);
});

const directions = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

function part1(grid) {
  let i = startI;
  let j = startJ;
  let direction = 0;
  const visited = new Set();
  const visitedPositions = []; // Keep all positions visited and direction going for part 2

  while (true) {
    // Record current coordinate visited
    visited.add(`${i},${j}`);
    visitedPositions.push({ i, j, direction });

    // Calculate next potential position
    let di = i + directions[direction % 4][0];
    let dj = j + directions[direction % 4][1];

    // Check if in bounds
    if (di < 0 || di >= grid.length || dj < 0 || dj >= grid[0].length) break;

    // Validate we can move to next position
    let nextPos = grid[di][dj];
    if (nextPos === "#") direction++;
    else {
      i = di;
      j = dj;
    }
  }

  return { visitedCount: visited.size, visitedPositions };
}

const { visitedCount, visitedPositions } = part1(grid);
console.log("Part 1:", visitedCount);

// Part 2: Try placing an obstacle in each visited position (except the start)
// and see if it causes a loop.
function part2(grid, obstructI, obstructJ) {
  // Make a fresh copy of the grid so we don't mutate the original
  const newGrid = grid.map((row) => [...row]);
  newGrid[obstructI][obstructJ] = "#";

  let i = startI;
  let j = startJ;
  let direction = 0;

  // Use a set to track (i,j,direction) states
  const states = new Set();
  const encode = (i, j, d) => `${i},${j},${d}`;

  while (true) {
    const state = encode(i, j, direction % 4);
    if (states.has(state)) {
      // We have been here before with the same direction -> loop detected
      return true;
    }
    states.add(state);

    // Calculate next potential position
    let di = i + directions[direction % 4][0];
    let dj = j + directions[direction % 4][1];

    // Check if in bounds
    if (di < 0 || di >= newGrid.length || dj < 0 || dj >= newGrid[0].length) {
      return false;
    }

    // Check if next is obstacle
    if (newGrid[di][dj] === "#") direction++;
    else {
      i = di;
      j = dj;
    }
  }
}

// Count how many positions cause a loop
let loopCount = 0;
const startPosition = `${startI},${startJ}`;
const uniquePositions = new Set(visitedPositions.map(p => `${p.i},${p.j}`));
for (const posStr of uniquePositions) {
    // Don't place obstacle at starting position
    if (posStr === startPosition) continue;
    const [oi, oj] = posStr.split(',').map(Number);

    if (part2(grid, oi, oj)) {
        loopCount++;
    }
}

console.log("Part 2:", loopCount);