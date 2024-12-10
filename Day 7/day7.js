const fs = require("fs");

const data = fs.readFileSync("./Day 7/input.txt", "utf8");

// Uses depth-first search.
// ops is an array of the allowed operators: e.g. ['+', '*'] for Part 1 and ['+', '*', '||'] for Part 2
function canReachTarget(target, nums, ops) {
  if (nums.length === 0) return false;
  if (nums.length === 1) return nums[0] === target;

  // Recursive function to try both operators at each step.
  function dfs(index, currentValue) {
    // If we've placed operators between all numbers, check if we reached the target
    if (index === nums.length) {
      return currentValue === target;
    }

    const nextNum = nums[index];

    for (const op of ops) {
      let newVal;
      if (op === "+") {
        newVal = currentValue + nextNum;
      } else if (op === "*") {
        newVal = currentValue * nextNum;
      } else if (op === "||") {
        newVal = Number(String(currentValue) + String(nextNum));
      } else {
        throw new Error("Unknown operator");
      }

      if (dfs(index + 1, newVal)) return true;
    }

    return false;
  }

  return dfs(1, nums[0]);
}

const equations = [];
data.split(/\r?\n/).forEach((line) => {
  // Each line looks like "190: 10 19", so split by ":"
  const [targetStr, numbersStr] = line.split(":");
  const target = parseInt(targetStr.trim(), 10);
  const nums = numbersStr.trim().split(/\s+/).map(Number);
  equations.push({ target, nums });
});

// Part 1: Only use '+' and '*'
let part1Sum = 0;
for (const { target, nums } of equations) {
  if (canReachTarget(target, nums, ['+', '*'])) {
    part1Sum += target;
  }
}

// Part 2: Use '+', '*', and '||'
let part2Sum = 0;
for (const { target, nums } of equations) {
  if (canReachTarget(target, nums, ['+', '*', '||'])) {
    part2Sum += target;
  }
}

console.log("Part 1:", part1Sum);
console.log("Part 2:", part2Sum);