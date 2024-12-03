const fs = require("fs");

const data = fs.readFileSync("./Day 1/input.txt", "utf8");

// Part 1
leftNums = [];
rightNums = [];
data.split(/\r?\n/).forEach((line) => {
    nums = line.split("   ");
    leftNums.push(nums[0])
    rightNums.push(nums[1])
});

leftNums = leftNums.sort((a, b) => a - b);
rightNums = rightNums.sort((a, b) => a - b);

let totalDistance = 0;
for (let i = 0; i < leftNums.length; i++) {
    totalDistance += Math.abs(rightNums[i] - leftNums[i])
}

console.log(totalDistance)

// Part 2
numCount = {};
for (let i = 0; i < rightNums.length; i++) {
    if (numCount[rightNums[i]])
        numCount[rightNums[i]]++;
    else
        numCount[rightNums[i]] = 1;
}

totalSimilarity = 0
for (let i = 0; i < leftNums.length; i++) {
    if (numCount[leftNums[i]])
        totalSimilarity += leftNums[i] * numCount[leftNums[i]]
}

console.log(totalSimilarity)