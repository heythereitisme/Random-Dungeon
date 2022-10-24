import {shopSelector, mapSelector, itemSelector, itemRoller, mapReRoller, mapRoller, resourceChecker} from "./game-flow-functions.js"
import {d10, d20, dItem} from "./variables-objects.js"
import {printItems, mint, spend, damage, healing, itemPusher, goldCheck, healthCheck, resourceReset, recoverMana} from "./server-functions.js"
import rl from "readline-sync"
import { battleTime } from "./battle.js";

let battleResults;

let theGame = async () => {
  await resourceReset();
  console.log("Welcome to Random Dungeon!\n\nYou stand at the entrance of a giant dungeon, with many twisting paths! You have only your sword, 50 gold coins and a handful of potions with you. This will be a tough battle.\n");
  let playerName = rl.question("What is your name adventurer?\n");
  console.log(`\nWelcome to the dungeon ${playerName}, ahead of you lies many paths, choose wisely.`);
  console.log("At the entrance there is an altar containing two items");
  await itemSelector();
  console.log("The other item is sealed away.");

  gameLoop: for (let i = 1; i < 6; i++) {
    console.log(`\nRound ${i}`);
    let mapRoll = await mapSelector();
    console.log(
      `\nYou proceed through the dungeon, now walking towards ${mapRoll}`
    );
    switch (mapRoll) {
      case "a healing shrine!":
        await recoverMana(50)
        console.log(await healing(30));
        break;
      case "a Treasure!":
        let treasure = itemRoller(dItem());
        console.log(
          `\x1b[33myou come across a treasure chest, you open it.\x1b[0m\nReceived \x1b[36m${treasure}\x1b[0m and \x1b[33m50 gold!\x1b[0m`
        );
        await mint(50);
        await itemPusher(treasure);
        break;
      case "an enemy!":
        battleResults = await battleTime(d20(), false);
        if (battleResults === true) {
          console.log("You won!");
          console.log("The enemy was guarding an altar containing two items resembling the one at the entrance.");
          itemSelector();
          console.log(await mint(50));
          break;
        } else {
          console.log("\x1b[31mYou have died\nGame Over.\x1b[0m");
          break gameLoop;
        }
      case "a shop!":
        await shopSelector();
        break;
      case "an Elite enemy!":
        battleResults = await battleTime(d20(), true);
        if (battleResults === true) {
          console.log(
            `The elite enemy falls, leaving behind two items for you to take.`
          );
          let item1 = itemRoller(dItem());
          let item2 = itemRoller(dItem());
          console.log(
            `Received \x1b[36m${item1}\x1b[0m and \x1b[36m${item2}\x1b[0m`
          );
          await itemPusher(item1);
          await itemPusher(item2);
          console.log(await mint(100));
        } else {
          console.log("\x1b[31mYou have died\nGame Over.\x1b[0m");
          break gameLoop;
        }
    }
    if (i === 5) {
      console.log("\x1b[31mfinal boss\x1b[0m");
      let finalBattle = await battleTime(20)
      if(finalBattle === true) {
        console.log("You win!")
      }else {
        console.log("\x1b[31mYou have died\nGame Over.\x1b[0m");
        break gameLoop;
      }
    }
  }

  console.log("Final items:", await printItems());
};

theGame();
