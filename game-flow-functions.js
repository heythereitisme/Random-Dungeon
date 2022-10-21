import rl from "readline-sync"
import {itemList, enemyList, d10, d20, dItem} from "./variables-objects.js"
import {itemCheck, mint, spend, damage, healing, itemPusher, goldCheck, healthCheck, resourceReset} from "./server-functions.js"

let resourceChecker = () => {
    if (player.hp > player.maxHP) {
        player.hp = player.maxHP
    }
    if (player.mp > player.maxMP){
        player.mp = player.maxMP
    }}

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

const itemSelector = async() => {
    let item1 = itemRoller(dItem())
    let item2 = itemRoller(dItem())
    while(true){
        let itemChoice = rl.question(`There are two items before you, \x1b[36m${item1} (1)\x1b[0m and \x1b[36m${item2} (2)\x1b[0m, choose one carefully.\n`)
        if(itemChoice === "1") {
            console.log(`Recieved \x1b[36m${item1}\x1b[0m`)
            await itemPusher(item1)
            return item1
        } else if (itemChoice === "2") {
            console.log(`Recieved \x1b[36m${item2}\x1b[0m`)
            await itemPusher(item2)
            return item2
        }else {
            console.log('invalid command, please type "1" or "2".')
        }}
}

const mapSelector = async() => {
    let leftMap = mapRoller(d10())
    let rightMap = mapRoller(d10())
    while (leftMap === rightMap) {
        rightMap = mapReRoller()
    }
    console.log (`\nTo the left is \x1b[35m${leftMap}\x1b[0m and to the right is \x1b[35m${rightMap}\x1b[0m`)
    while(true){
        console.log(`You have ${await goldCheck()} gold.`)
        console.log(`You have ${await healthCheck()} health.`)
        let mapSelection = rl.question("Do you want to get left (L) or right (R)?\n")
        if (mapSelection === "L") {
            return leftMap
        } else if (mapSelection === "R") {
            return rightMap
        } else {
            console.log('invalid command, please type "L" or "R".')
        }}
}

const shopSelector = async() => {
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
                    if(await goldCheck() >= 50) {
                        console.log(await spend(50))
                        console.log("purchased", item1)
                        itemPusher(item1)
                        oneBought = true
                    } else {
                        console.log("You do not have enough gold.")
                    }
            } else {console.log("You already bought that.")}
                break
            case "2":
                if(twoBought === false){
                    if(await goldCheck() >= 50) {
                        console.log(await spend(50))
                        console.log("purchased", item2)
                        itemPusher(item2)
                        twoBought = true
                    } else {
                        console.log("You do not have enough gold.")
                    }
            } else {console.log("You already bought that.")}
                break
            case "3":
                if(threeBought === false) {
                    if(await goldCheck() >= 100) {
                        console.log(await spend(100))
                        console.log(await healing(100))
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



const enemySelector = async(num) => {
    let enemy = enemyList[num]
    console.log(`Encountered \x1b[31m${enemy}\x1b[0m`)
    console.log("\x1b[31mEnemy battle\x1b[0m")
    console.log(await damage(25))
    if(await healthCheck() > 0) {
        return true
    }else { 
        return false
    }
}

const eliteSelector = async(num) => {
    let enemy = enemyList[num]
    console.log(`Encountered \x1b[31melite ${enemy}\x1b[0m`)
    console.log("\x1b[31mElite Enemy battle\x1b[0m")
    console.log(await damage(50))
    if(await healthCheck() > 0) {
        return true
    }else { 
        return false
    }
}

export {eliteSelector, enemySelector, shopSelector, mapSelector, itemSelector, itemRoller, mapReRoller, mapRoller, resourceChecker}