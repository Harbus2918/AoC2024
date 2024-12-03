const fs = require("fs");

const data = fs.readFileSync("./Day 2/input.txt", "utf8");

function isSequenceSafe(levels) {
    const isIncreasing = levels[1] > levels[0];

    for (let i = 1; i < levels.length; i++) {
        const diff = levels[i] - levels[i - 1];

        if (
            (isIncreasing && diff < 0) ||
            (!isIncreasing && diff > 0) ||
            Math.abs(diff) > 3 ||
            Math.abs(diff) < 1
        ) {
            return false;
        }
    }
    return true;
}

// Part 1 & 2
total = 0;
data.split(/\r?\n/).forEach((line) => {
    const levels = line.split(" ").map((num) => parseInt(num, 10));
    if (isSequenceSafe(levels)) {
        total += 1;
    } else {
        // Try removing one level at a time
        let safeAfterRemoval = false;
        for (let i = 0; i < levels.length; i++) {
            const levelsCopy = levels.slice(0, i).concat(levels.slice(i + 1));
            if (isSequenceSafe(levelsCopy)) {
                safeAfterRemoval = true;
                break;
            }
        }
        if (safeAfterRemoval) {
            total += 1;
        }
    }
});

console.log(total)
