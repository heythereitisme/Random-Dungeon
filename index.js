import rl from "readline-sync";

// stat zone

const player = {hp: 100, maxHP: 100, mp: 100, maxMP: 100, items: ["HP potion", "MP potion"], gold: 50}

const itemList = ["Chainmail", "Steel Sword", "Dagger", "Buckler", "HP Potion", "Healing fairy", "MP Potion","Mana fairy", "Spear", "Helmet", "Power Necklace", 
"Strength Bracelet", "Heart Crystal","Mana Crystal", "Swift Shoes", "Posion Edge", "Mega Hammer", "Summoning Scroll", "Ressurection fairy", "Smoke Bomb"]

const enemyList = ["Goblin Warrior", "Goblin Archer", "Goblin Brute", "Vampire", "Golem", "Shield Knight", "Knight", "Assassin", "Dual Blader", "Holy Knight",
"Fire Mage", "Ice Mage", "Living Bomb", "Flying sword", "Cannoneer", "Armored Knight", "Greatsword Knight", "Ghost", "Mummy", "Quickblader"]

// dice zone

const d10 = () => {
    return Math.floor(Math.random() * 10)
}

const d20 = () => {
    return Math.floor(Math.random() * 20)
}

const dItem = () => {
    return Math.floor(Math.random() * itemList.length)
}

// function zone

let battleResults = true

const mapRoller = (num) => {
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

const mapReRoller = () => {
    console.log("\x1b[34mrerolled map\x1b[0m")
        let rightMap = mapRoller(d10())
        return rightMap
}

const itemRoller = (num) => {
    let itemReturn = itemList[num]
    itemList.splice(num, 1)
    return itemReturn
}

const itemSelector = () => {
    let item1 = itemRoller(dItem())
    let item2 = itemRoller(dItem())
    while(true){
        let itemChoice = rl.question(`There are two items before you, \x1b[36m${item1} (1)\x1b[0m and \x1b[36m${item2} (2)\x1b[0m, choose one carefully.\n`)
        if(itemChoice === "1") {
            console.log(`Recieved \x1b[36m${item1}\x1b[0m`)
            player.items.push(item1)
            return item1
        } else if (itemChoice === "2") {
            console.log(`Recieved \x1b[36m${item2}\x1b[0m`)
            player.items.push(item2)
            return item2
        }else {
            console.log('invalid command, please type "1" or "2".')
        }}
}

const mapSelector = () => {
    let leftMap = mapRoller(d10())
    let rightMap = mapRoller(d10())
    while (leftMap === rightMap) {
        rightMap = mapReRoller()
    }
    console.log (`\nTo the left is \x1b[35m${leftMap}\x1b[0m and to the right is \x1b[35m${rightMap}\x1b[0m`)
    while(true){
        console.log(`You have ${player.gold} gold.`)
        let mapSelection = rl.question("Do you want to get left (L) or right (R)?\n")
        if (mapSelection === "L") {
            return leftMap
        } else if (mapSelection === "R") {
            return rightMap
        } else {
            console.log('invalid command, please type "L" or "R".')
        }}
}

const shopSelector = () => {
    let item1 = itemRoller(dItem())
    let item2 = itemRoller(dItem())
    let oneBought = false
    let twoBought = false
    let threeBought = false
    console.log("You come across a small shop, the shopkeeper gestures towards his wares")
    console.log(`The items for sale are:\nItem 1: \x1b[36m${item1}\x1b[0m - \x1b[33m50g\x1b[0m\nItem 2: \x1b[36m${item2}\x1b[0m - \x1b[33m50g\x1b[0m\n\x1b[32mFull heal\x1b[0m - \x1b[33m100g\x1b[0m`)
      while(true){
        let shopTransaction = rl.question("Would you like to buy item 1 (1), item 2 (2), recieve healing (3) or Exit (4)?\n")
        switch (shopTransaction) {
            case "1":
                if(oneBought === false){
                    if(player.gold >= 50) {
                        player.gold = player.gold - 50
                        console.log("purchased", item1)
                        player.items.push(item1)
                        oneBought = true
                    } else {
                        console.log("You do not have enough gold.")
                    }
            } else {console.log("You already bought that.")}
                break
            case "2":
                if(twoBought === false){
                    if(player.gold >= 50) {
                        player.gold = player.gold - 50
                        console.log("purchased", item2)
                        player.items.push(item2)
                        twoBought = true
                    } else {
                        console.log("You do not have enough gold.")
                    }
            } else {console.log("You already bought that.")}
                break
            case "3":
                if(threeBought === false) {
                    if(player.gold >= 100) {
                        player.gold = player.gold - 100
                        console.log("\x1b[32mYou feel healed.\x1b[0m")
                        player.hp = player.maxHp
                        player.mp = player.maxMP
                        threeBought = true
                    } else {
                        console.log("You do not have enough gold.")
                    }
                } else {console.log("You already bought that.")}
                break
            case "4":
                console.log("You leave the shop")
                return
            default: console.log("Invalid command, please try again.")
        }}
}

const healShrine = () => {
    let healAmount = player.maxHP * 0.3
    player.hp = player.hp + healAmount
    player.mp = player.maxMP
    console.log("\x1b[32mYou feel healed.\x1b[0m")
}

const enemySelector = (num) => {
    let enemy = enemyList[num]
    console.log(`Encountered \x1b[31m${enemy}\x1b[0m`)
    console.log("\x1b[31mEnemy battle\x1b[0m")
    return true
}

const eliteSelector = (num) => {
    let enemy = enemyList[num]
    console.log(`Encountered \x1b[31melite ${enemy}\x1b[0m`)
    console.log("\x1b[31mElite Enemy battle\x1b[0m")
    return false
}

// game zone

// console.log("Welcome to Random Dungeon!\n\nYou stand at the entrance of a giant dungeon, with many twisting paths! You have only your sword, 50 gold coins and a handful of potions with you. This will be a tough battle.\n");
// let playerName = rl.question("What is your name adventurer?");
// console.log(`\nWelcome to the dungeon ${playerName}, ahead of you lies many paths, choose wisely.`);

console.log("At the entrance there is an altar containing two items")
itemSelector()
console.log("The other item is sealed away.")

gameLoop:
for (let i = 1; i < 6; i++) {
    console.log(`\nRound ${i}`)
    let mapRoll = (mapSelector())
    console.log(`\nYou proceed throught the dungeon, now walking towards ${mapRoll}`)
    switch (mapRoll) {
        case "a healing shrine!":
            healShrine()
            break
        case "a Treasure!":
            let treasure = itemRoller(dItem())
            console.log(`\x1b[33myou come across a treasure chest, you open it.\x1b[0m\nRecieved \x1b[36m${treasure}\x1b[0m!`)
            player.items.push(treasure)
            break
        case "an enemy!":
            battleResults = enemySelector(d20())
            if (battleResults === true) {
                console.log("You won!")
                console.log("The enemy was guarding an altar containing two items resmembling the one at the entrance.")
                itemSelector()
                player.gold = player.gold + 50
                break
            } else {
                console.log("\x1b[31mYou have died\nGame Over.\x1b[0m")
                break gameLoop
            }
        case "a shop!":
            shopSelector()
            break 
        case "an Elite enemy!":
            battleResults = eliteSelector(d20())
            if (battleResults === true) {
                console.log(`The elite enemy falls, leaving behind two items for you to take.`)
                let item1 = itemRoller(dItem())
                let item2 = itemRoller(dItem())
                console.log(`Received \x1b[36m${item1}\x1b[0m and \x1b[36m${item2}\x1b[0m`)
                player.items.push(item1)
                player.items.push(item2)
                player.gold = player.gold + 100
            } else {
                console.log("\x1b[31mYou have died\nGame Over.\x1b[0m")
                break gameLoop
            }
    
    }
    if (i === 5) {
        console.log("\x1b[31mfinal boss\x1b[0m")
    }
}

console.log("Final items:", player.items)