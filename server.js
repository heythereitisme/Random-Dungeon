import express, { response } from "express";
const app = express();

const PORT = process.env.PORT || 4000

const player = {hp: 100, maxHP: 100, mp: 100, maxMP: 100, items: ["HP potion", "MP potion"], gold: 50}
const itemList = ["Chainmail", "Steel Sword", "Dagger", "Buckler", "HP Potion", "Healing fairy", "MP Potion","Mana fairy", "Spear", "Helmet", "Power Necklace", 
"Strength Bracelet", "Heart Crystal","Mana Crystal", "Swift Shoes", "Posion Edge", "Mega Hammer", "Summoning Scroll", "Ressurection fairy", "Smoke Bomb"]
const enemyList = ["Goblin Warrior", "Goblin Archer", "Goblin Brute", "Vampire", "Golem", "Shield Knight", "Knight", "Assassin", "Dual Blader", "Holy Knight",
"Fire Mage", "Ice Mage", "Living Bomb", "Flying sword", "Cannoneer", "Armored Knight", "Greatsword Knight", "Ghost", "Mummy", "Quickblader"]

app.listen(PORT, function() {
    console.log(`listening on port ${PORT}`)
})

let resourceChecker = () => {
    if (player.hp > player.maxHP) {
        player.hp = player.maxHP
    }
    if (player.mp > player.maxMP){
        player.mp = player.maxMP
    }}

app.get("/reset", (req, res) => {
    console.log("player reset")
    player.maxHP = 100
    player.hp = 100
    player.maxMP = 100
    player.mp = 100
    player.items = ["HP Potion", "MP Potion"]
    player.gold = 50
    res.send()
})

app.get("/printHP", (req, res) => {
    console.log("HP:", player.hp)
    res.send(''+player.hp)
})

app.get("/printGold", (req, res) => {
    console.log("gold:", player.gold)
    res.send(''+player.gold)
})

app.get("/itemPush", (req, res) => {
    console.log("Pushed item")
    let item = req.query.item  
    player.items.push(item)
    console.log(player.items)
    res.send(item)
})

app.get("/healing", (req, res) => {
    console.log("pre heal hp:", player.hp)
    let amount = req.query.amount
    console.log("heal amount is", amount)
    player.hp = player.hp + +amount
    resourceChecker()
    console.log("post heal hp:", player.hp)
    res.send("\x1b[32mYou feel healed.\x1b[0m")
})

app.get("/damage", (req, res) => {
    console.log("pre damage hp:", player.hp)
    let amount = req.query.amount
    player.hp = player.hp - +amount
    resourceChecker()
    console.log("post damage hp:", player.hp)
    res.send(`\x1b[31mOw! ${amount} hp lost!\x1b[0m`)
})

app.get("/mint", (req, res) => {
    let amount = req.query.amount
    player.gold = player.gold + +amount
    res.send(`\x1b[33mGained ${amount} gold!\x1b[0m`)
})

app.get("/spend", (req, res) => {
    let amount = req.query.amount
    player.gold = player.gold - +amount
    console.log(`Spent ${amount} gold`)
    res.send(`\x1b[33mspent ${amount}\x1b[0m`)
})

app.get("/itemPrint", (req, res) => {
    console.log("printing items")
    res.send(player.items)
})