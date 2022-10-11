import rl from "readline-sync";

// stat zone

let player = {hp: 100, maxHP: 100, mp: 100, maxMP: 100, items: ["HP potion", "MP potion"], items: []}

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
        return "a healing shrine!"
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
        let itemChoice = rl.question(`There are two items before you, \x1b[36m${item1} (1)\x1b[0m and \x1b[36m${item2} (2)\x1b[0m, choose one carefully.\n`)
        if(itemChoice === "1") {
            player.items.push(item1)
            return item1
        } else if (itemChoice === "2") {
            player.items.push(item2)
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

let shopSelector = () => {
    let item1 = itemRoller(dItem())
    let item2 = itemRoller(dItem())
    console.log(`The items for sale are:\nItem 1: \x1b[36m${item1}\x1b[0m - \x1b[33m50g\x1b[0m\nItem 2: \x1b[36m${item2}\x1b[0m - \x1b[33m50g\x1b[0m\n\x1b[32mFull heal\x1b[0m - \x1b[33m100g\x1b[0m`)
      while(true){
        let shopTransaction = rl.question("Would you like to buy item 1 (1), item 2 (2), recieve healing (3) or Exit (4)?\n")
        switch (shopTransaction) {
            case "1":
                console.log("purchased", item1)
                player.items.push(item1)
                break
            case "2":
                console.log("purchased", item2)
                player.items.push(item2)
                break
            case "3":
                console.log("You feel healed")
                player.hp = player.maxHp
                player.mp = player.maxMP
                break
            case "4":
                console.log("You leave the shop")
                return
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
    switch (mapRoll) {
        case "a healing shrine!":
            console.log("healing shrine")
            break
        case "a Treasure!":
            let treasure = itemRoller(dItem())
            console.log(`\x1b[33myou come across a treasure chest, you open it.\x1b[0m\nRecieved \x1b[36m${treasure}\x1b[0m!`)
            player.items.push(treasure)
            console.log(player.items)
            break
        case "an enemy!":
            console.log("\x1b[31mEnemy battle\x1b[0m")
            break
        case "a shop!":
            console.log("You come across a small shop, the shopkeeper gestures towards his wares")
            console.log(shopSelector())
            console.log(player.items)
            break
        case "an Elite enemy!":
            console.log("\x1b[31mElite battle\x1b[0m")
    }
}

console.log("\x1b[31mfinal boss\x1b[0m")