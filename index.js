import rl from "readline-sync";

// console.log("Welcome to Random Dungeon!\n\nYou stand at the entrance of a giant dungeon, with many twisting paths! You have only your sword, 50 gold coins and a handful of potions with you. This will be a tough battle.\n");
// let playerName = rl.question("What is your name adventurer?");
// console.log(`\nWelcome to the dungeon ${playerName}, ahead of you lies many paths, choose wisely.`);

let d10 = () => {
    return Math.floor(Math.random() * 10)
}

let mapRoller = (num) => {
    if(num === 0 || num === 1) {
        return "a healing shrine."
    } else if (num === 2 || num === 3) {
        return "an enemy!"
    } else if (num === 4 || num === 5) {
        return "a Treasure!"
    } else if (num === 6 || num === 7) {
        return "a shop!"
    } else if (num === 8 || num === 9) {
        return "an Elite enemy!"
    }
}

let mapSelector = () => {
    let leftMap = mapRoller(d10())
    let rightMap = mapRoller(d10())
    console.log (`To the left is ${leftMap} and to the right is ${rightMap}`)
    let mapSelection = rl.question("Do you want to get left (L) or right (R)?\n")
    if (mapSelection === "L") {
        return leftMap
    } else if (mapSelection === "R") {
        return rightMap
    }
}
let mapRoll = (mapSelector())

console.log(`You proceed throught the dungeon, now walking towards ${mapRoll}`)