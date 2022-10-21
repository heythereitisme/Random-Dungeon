import fetch from "node-fetch"
import {eliteSelector, enemySelector, healShrine, shopSelector, mapSelector, itemSelector, itemRoller, mapReRoller, mapRoller, resourceChecker} from "./game-flow-functions.js"
import {player, itemList, enemyList, d10, d20, dItem,} from "./variables-objects.js"

let battleResults;

let testFunction = async() => {
    const test = await fetch("http://localhost:4000/")
    let testResponse = await test.json()
    console.log(testResponse)
}
// game zone

// console.log("Welcome to Random Dungeon!\n\nYou stand at the entrance of a giant dungeon, with many twisting paths! You have only your sword, 50 gold coins and a handful of potions with you. This will be a tough battle.\n");
// let playerName = rl.question("What is your name adventurer?\n");
// console.log(`\nWelcome to the dungeon ${playerName}, ahead of you lies many paths, choose wisely.`);

let theGame = async() => {

    console.log("At the entrance there is an altar containing two items")
    itemSelector()
    console.log("The other item is sealed away.")

    await testFunction()

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
                    // console.log("You won!")
                    // console.log("The enemy was guarding an altar containing two items resmembling the one at the entrance.")
                    // itemSelector()
                    // player.gold = player.gold + 50
                    testFunction()
                    
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
}

theGame()