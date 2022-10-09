import rl from "readline-sync";

console.log("Welcome to Random Dungeon!\n\nYou stand at the entrance of a giant dungeon, with many twisting paths! You have only your sword and a handful of potions with you. This will be a tough battle.\n");
let playerName = rl.question("What is your name adventurer?");
console.log(`\nWelcome to the dungeon ${playerName}, ahead of you lies many paths, choose wisely.`);
