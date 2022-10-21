const itemList = ["Chainmail", "Steel Sword", "Dagger", "Buckler", "HP Potion", "Healing fairy", "MP Potion","Mana fairy", "Spear", "Helmet", "Power Necklace", 
"Strength Bracelet", "Heart Crystal","Mana Crystal", "Swift Shoes", "Posion Edge", "Mega Hammer", "Summoning Scroll", "Ressurection fairy", "Smoke Bomb"]

const enemyList = ["Goblin Warrior", "Goblin Archer", "Goblin Brute", "Vampire", "Golem", "Shield Knight", "Knight", "Assassin", "Dual Blader", "Holy Knight",
"Fire Mage", "Ice Mage", "Living Bomb", "Flying sword", "Cannoneer", "Armored Knight", "Greatsword Knight", "Ghost", "Mummy", "Quickblader"]

const d10 = () => {
    return Math.floor(Math.random() * 10)
}

const d20 = () => {
    return Math.floor(Math.random() * 20)
}

const dItem = () => {
    return Math.floor(Math.random() * itemList.length)
}

export {itemList, enemyList, d10, d20, dItem}