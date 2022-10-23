const itemList = [
  "Chainmail",
  "Steel Sword",
  "Dagger",
  "Buckler",
  "HP Potion",
  "Healing fairy",
  "MP Potion",
  "Mana fairy",
  "Spear",
  "Helmet",
  "Power Necklace",
  "Strength Bracelet",
  "Heart Crystal",
  "Mana Crystal",
  "Swift Shoes",
  "Posion Edge",
  "Mega Hammer",
  "Summoning Scroll",
  "Ressurection fairy",
  "Smoke Bomb",
];

const enemyList = [
  { name: "Goblin Warrior", hp: 70 },
  { name: "Goblin Archer", hp: 40},
  { name: "Goblin Brute", hp: 100 },
  { name: "Vampire", hp: 60 },
  { name: "Golem", hp: 100 },
  { name: "Shield Knight", hp: 50},
  { name: "Knight", hp: 70 },
  { name: "Assassin", hp: 40 },
  { name: "Dual Blader", hp: 40 },
  { name: "Holy Knight", hp: 80 },
  { name: "Fire Mage", hp: 50 },
  { name: "Ice Mage", hp: 60 },
  { name: "Living Bomb", hp: 20 },
  { name: "Flying sword", hp:40 },
  { name: "Cannoneer", hp: 50 },
  { name: "Armored Knight", hp: 100 },
  { name: "Greatsword Knight", hp: 70 },
  { name: "Ghost", hp: 30 },
  { name: "Mummy", hp: 60 },
  { name: "Quickblader", hp: 40 },
  { name: "Dungeon Ogre", hp: 400}
];

const d10 = () => {
  return Math.floor(Math.random() * 10);
};

const d20 = () => {
  return Math.floor(Math.random() * 20);
};

const dItem = () => {
  return Math.floor(Math.random() * itemList.length);
};

export {itemList, enemyList, d10, d20, dItem };
