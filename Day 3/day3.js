const fs = require("fs");

const data = fs.readFileSync("./Day 3/input.txt", "utf8");

// Part 1
let total = 0
const regex = /mul\((\d+),(\d+)\)/g;
for (const match of data.matchAll(regex)) {
    total += match[1] * match[2]
}
console.log(total)

// Part 2
total = 0
const regex2 = /(mul\((\d+),(\d+)\))|(do|don't)\(\)/g
let noTotal = false;
// Needs to be one continuous line for the do/don't rule
for (const match of data.matchAll(regex2)) {
    if (match[0] === "don't()")
        noTotal = true
    else if (match[0] === "do()")
        noTotal = false
    else if (!noTotal) {
        total += match[2] * match[3]
    }
}

console.log(total)