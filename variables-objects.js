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
  "Poison Edge",
  "Mega Hammer",
  "Summoning Scroll",
  "Resurrection fairy",
  "Smoke Bomb",
];

const enemyList = [
  { name: "Goblin Warrior", hp: 70 },
  { name: "Goblin Archer", hp: 60 },
  { name: "Goblin Brute", hp: 100 },
  { name: "Vampire", hp: 70 },
  { name: "Golem", hp: 100 },
  { name: "Shield Knight", hp: 70 },
  { name: "Knight", hp: 80 },
  { name: "Assassin", hp: 60 },
  { name: "Dual Blader", hp: 60 },
  { name: "Holy Knight", hp: 80 },
  { name: "Fire Mage", hp: 60 },
  { name: "Ice Mage", hp: 70 },
  { name: "Living Bomb", hp: 50 },
  { name: "Flying Sword", hp: 60 },
  { name: "Cannoneer", hp: 60 },
  { name: "Armored Knight", hp: 100 },
  { name: "Greatsword Knight", hp: 70 },
  { name: "Ghost", hp: 50 },
  { name: "Mummy", hp: 80 },
  { name: "Quickblader", hp: 60 },
  { name: "Dungeon Ogre", hp: 500 },
];

const dCoin = () => {
  return Math.floor(Math.random() * 2);
};

const d10 = () => {
  return Math.floor(Math.random() * 10);
};

const d20 = () => {
  return Math.floor(Math.random() * 20);
};

const dItem = () => {
  return Math.floor(Math.random() * itemList.length);
};

export { itemList, enemyList, d10, d20, dItem, dCoin };
