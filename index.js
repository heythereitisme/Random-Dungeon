import rl from "readline-sync";

// stat zone

let player = {hp: 100, mp: 100, items: ["HP potion", "MP potion"], weapon: "sword", armor: ["Clothing"]}

let itemList = ["chainmail", "steel sword", "dagger", "buckler", "hp potion", "healing fairy", "mana potion","mana fairy", "spear", "helmet", "power necklace", 
"strength bracelet", "heart crystal","mana crystal", "swift shoes", "posion edge", "mega hammer", "summoning scroll", "ressurection fairy", "smoke bomb"]

// dice zone

let d10 = () => {
    return Math.floor(Math.random() * 10)
}

let d20 = () => {
    return Math.floor(Math.random() * 20)
}

let dItem = () => {
    return Math.floor(Math.random() * itemList.length)
}

// function zone

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

let itemRoller = (num) => {
    let itemReturn = itemList[num]
    itemList.splice(num, 1)
    return itemReturn
}

let itemSelector = () => {
    let item1 = itemRoller(dItem())
    let item2 = itemRoller(dItem())
    while(true){
        let itemChoice = rl.question(`There are two items before you, ${item1} (1) and ${item2} (2), choose one carefully.\n`)
        if(itemChoice === "1") {
            return item1
        } else if (itemChoice === "2") {
            return item2
        }else {
            console.log('invalid command, please type "1" or "2".')
        }}
}

let mapSelector = () => {
    let leftMap = mapRoller(d10())
    let rightMap = mapRoller(d10())
    console.log (`\nTo the left is ${leftMap} and to the right is ${rightMap}`)
    while(true){
        let mapSelection = rl.question("Do you want to get left (L) or right (R)?\n")
        if (mapSelection === "L") {
            return leftMap
        } else if (mapSelection === "R") {
            return rightMap
        } else {
            console.log('invalid command, please type "L" or "R".')
        }}
}

// game zone

// console.log("Welcome to Random Dungeon!\n\nYou stand at the entrance of a giant dungeon, with many twisting paths! You have only your sword, 50 gold coins and a handful of potions with you. This will be a tough battle.\n");
// let playerName = rl.question("What is your name adventurer?");
// console.log(`\nWelcome to the dungeon ${playerName}, ahead of you lies many paths, choose wisely.`);

console.log("At the entrance there is an altar containing two items")
console.log(itemSelector())

for (let i = 1; i < 6; i++) {
    console.log(`\nRound ${i}`)
    let mapRoll = (mapSelector())
    console.log(`\nYou proceed throught the dungeon, now walking towards ${mapRoll}`)
}

console.log("final boss")