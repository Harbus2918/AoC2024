const fs = require("fs");

const data = fs.readFileSync("./Day 5/input.txt", "utf8");

// Part 1 & 2
const rules = {}, updates = [];
let total = 0;
let invalidTotal = 0;
data.split(/\r?\n/).forEach((line) => {
    if (line.includes("|")) {
        const curRules = line.split("|")
        // Only keep part of rule of numbers that appear before themselves
        if (rules[curRules[1]]) 
            rules[curRules[1]].push(curRules[0])
        else
            rules[curRules[1]] = [curRules[0]]
        
    }
    if (line.includes(","))
        updates.push(line.split(","))
});

for (let i = 0; i < updates.length; i++) {
    const numSeen = [];
    let valid = true;
    for (let j = 0; j < updates[i].length; j++) {
        let moved = false
        // Check if all numbers seen should be before current number
        // If the number was seen and should be after, then its invalid
        if (!numSeen.every(numBefore => rules[updates[i][j]].includes(numBefore))) {
            valid = false;
            // Swap invalid number back one, remove old number from seen, and reset index to re-evaluate
            const temp = updates[i][j];
            updates[i][j] = updates[i][j - 1];
            updates[i][j - 1] = temp;
            j -= 2;
            numSeen.pop();
            moved = true;
        }
        // If no movement of numbers has happened push the number seen
        if (!moved)
            numSeen.push(updates[i][j])
    }

    if (valid)
        total += Number(updates[i][Math.floor(updates[i].length / 2)])
    else
        invalidTotal += Number(updates[i][Math.floor(updates[i].length / 2)])
}

console.log(total, invalidTotal);