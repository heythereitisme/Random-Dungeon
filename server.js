import express, { query, response } from "express";
import { MongoClient } from "mongodb";
import {leaderboard, addLB} from "./mongo.js"
import { uri } from "./secret.js";

const app = express();
const client = new MongoClient(uri);

async function main() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
    } catch (e) {
        console.error(e);
    }finally {
        await client.close();
    }
}

async function addScore(client, newScore){
    const result = await client.db("Random_Dungeon").collection("Leaderboard").insertOne(newScore);
    console.log(`New listing created with the following id: ${result.insertedId}`);
}

const PORT = process.env.PORT || 4000

const player = {hp: 100, maxHP: 100, mp: 100, maxMP: 100, items: ["HP Potion", "MP Potion"], gold: 50, score: 0}


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
    player.score = 0
    res.send()
})

app.get("/checkHP", (req, res) => {
    console.log("HP:", player.hp)
    res.send(''+player.hp)
})

app.get("/checkMP", (req, res) => {
    console.log("MP:", player.mp)
    res.send(''+player.mp)
})

app.get("/checkGold", (req, res) => {
    console.log("gold:", player.gold)
    res.send(''+player.gold)
})

app.get("/checkItem", (req, res) => {
    let item = req.query.item
    let checkedItem = player.items.includes(item)
    console.log(`${item} in inventory: ${checkedItem}`)
    res.send(checkedItem)
})

app.get("/countItem", (req, res) => {
    let item = req.query.item
    let countedItem = player.items.filter(name => name.includes(item)).length
    console.log(`${countedItem} ${item}(s)`)
    res.send(''+countedItem)
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
    player.hp = player.hp + +amount
    resourceChecker()
    console.log("post heal hp:", player.hp)
    res.send("\x1b[32mYou feel healed.\x1b[0m")
})

app.get("/damage", (req, res) => {
    console.log("pre damage hp:", player.hp)
    let amount = req.query.amount
    player.hp = player.hp - +amount
    console.log("post damage hp:", player.hp)
    res.send(`\x1b[31mOw! ${amount} hp lost!\x1b[0m`)
})

app.get("/spendMana", (req, res) => {
    console.log("pre spell mp:", player.mp)
    let amount = req.query.amount
    player.mp = player.mp - +amount
    console.log("post spell mp:", player.mp)
    res.send(`\x1b[36mspent ${amount} mana\x1b[0m`)
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

app.get("/recoverMana", (req, res) => {
    console.log("pre recovered mp:", player.mp)
    let amount = req.query.amount
    player.mp = player.mp + +amount
    resourceChecker()
    console.log("post recovery mp:", player.mp)
    res.send(`\x1b[36mRecovered mana\x1b[0m`)
})

app.get("/addScore", (req, res) => {
    let amount = req.query.amount
    player.score = player.score + +amount
    console.log("current score:", player.score)
    res.send()
})

app.get("/useItem", (req, res) => {
    let item = req.query.item
    let itemIndex = player.items.indexOf(item)
    let killItem = player.items.splice(itemIndex, 1)
    res.send(`Used ${killItem}`)
})

app.get("/heartCrystal", (req, res) => {
    player.maxHP = player.maxHP + 50
    res.send("\x1b[32mYou absorb the crystal and your maximum health has increased!\x1b[0m")
})

app.get("/manaCrystal", (req, res) => {
    player.maxMP = player.maxMP + 50
    res.send("\x1b[36mYou absorb the crystal and your maximum mana has increased!\x1b[0m")
})

app.get("/res", (req, res) => {
    player.hp = 50
    res.send("\x1b[32mThe Resurrection fairy revived you!\x1b[0m")
})

app.get("/leaderboard", async(req, res) => {
    res.send(await leaderboard(client))
})

app.post("/lbAdd", async(req, res) => {
    let addName = req.query.name
    let addScore = player.score
    await addLB(client,
        {
            name: addName,
            score: addScore
        })
    res.send("Added to leaderboard!")
})