const fs = require("fs");

const data = fs.readFileSync("./Day 4/input.txt", "utf8");

function checkDiag(isTop, i, j) {
  let diag = "";
  for (let d of [-1, 0, 1]) {
    const ni = i + d;
    let nj;
    if (isTop) nj = j + d;
    else nj = j - d;
    if (ni < 0 || ni >= grid.length || nj < 0 || nj >= grid[ni].length) {
      diag = "";
      return diag;
    }
    diag += grid[ni][nj];
  }
  return diag;
}

// Part 1
const grid = [];
data.split(/\r?\n/).forEach((line) => {
  grid.push(line.split(""));
});

const directions = [-1, 0, 1];
const seq = "XMAS";
const sequences = ["MAS", "SAM"];
let total = 0;
let part2 = 0;

for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[i].length; j++) {
    if (grid[i][j] === "X") {
      // Check all possible directions
      directions.forEach((di) => {
        directions.forEach((dj) => {
          if (di === 0 && dj === 0) return; // Skip the (0,0) direction

          let sequence = "";
          // Go in said direction for length of goal seq to see if sequence would be what we're looking for
          for (let n = 0; n < seq.length; n++) {
            const ni = i + di * n;
            const nj = j + dj * n;

            // Ensure indices are not out of bounds
            if (ni < 0 || ni >= grid.length || nj < 0 || nj >= grid[0].length) {
              sequence = ""; // Invalid sequence
              break;
            }

            sequence += grid[ni][nj];
          }

          // Check if the sequence matches the target
          if (sequence === seq) {
            total++;
          }
        });
      });
    }

    if (grid[i][j] === "A") {
      // Check diagonal 1 (top-left to bottom-right)
      let diag1 = checkDiag(true, i, j);

      // Check diagonal 2 (top-right to bottom-left)
      let diag2 = checkDiag(false, i, j);

      // Now check if both diagonals form either "MAS" or "SAM"
      if (sequences.includes(diag1) && sequences.includes(diag2)) {
        part2++;
      }
    }
  }
}

console.log(total);
console.log(part2);
