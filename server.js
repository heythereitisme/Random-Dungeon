import express, { response } from "express";
const app = express();
import rl from "readline-sync";

const PORT = process.env.PORT || 4000
const itemList = ["Chainmail", "Steel Sword", "Dagger", "Buckler", "HP Potion", "Healing fairy", "MP Potion","Mana fairy", "Spear", "Helmet", "Power Necklace", 
"Strength Bracelet", "Heart Crystal","Mana Crystal", "Swift Shoes", "Posion Edge", "Mega Hammer", "Summoning Scroll", "Ressurection fairy", "Smoke Bomb"]

const player = {hp: 100, maxHP: 100, mp: 100, maxMP: 100, items: ["HP potion", "MP potion"], gold: 50}

app.listen(PORT, function() {
    console.log(`listening on port ${PORT}`)
})

app.get("/", (req, res) => {
    let test = () => {
        rl.question(`There are two items before you, \x1b[36m (1)\x1b[0m and \x1b[36m (2)\x1b[0m, choose one carefully.\n`)
    }
    res.send(rl.question(`There are two items before you, \x1b[36m (1)\x1b[0m and \x1b[36m (2)\x1b[0m, choose one carefully.\n`))
})