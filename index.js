import {shopSelector, mapSelector, itemSelector, itemRoller, slowDown} from "./game-flow-functions.js"
import {d20, dItem} from "./variables-objects.js"
import {printItems, mint, healing, itemPusher,resourceReset, recoverMana, leaderBoardPrint, submitScore, addScore} from "./server-functions.js"
import rl from "readline-sync"
import { battleTime } from "./battle.js";

let battleResults;

let theGame = async () => {
  await resourceReset();
  console.log(await leaderBoardPrint());
  await slowDown(5000);
  console.log(
    "Welcome to Random Dungeon!\n\nYou stand at the entrance of a giant dungeon, with many twisting paths! A great treasure is said to be at the end! You have only your sword, 50 gold coins and a handful of potions with you. This will be a tough battle.\n"
  );
  let playerName = rl.question("What is your name adventurer?\n");
  console.log(
    `\nWelcome to the dungeon ${playerName}, ahead of you lies many paths, choose wisely.`
  );
  await slowDown(3000);
  console.log("At the entrance there is an altar containing two items");
  await slowDown(3000);
  await itemSelector();
  await slowDown(1000);
  console.log("The other item is sealed away.");
  await slowDown(3000);

  gameLoop: for (let i = 1; i < 6; i++) {
    console.log(`\nRound ${i}`);
    let mapRoll = await mapSelector();
    console.log(
      `\nYou proceed through the dungeon, now walking towards ${mapRoll}`
    );
    await slowDown(3000);
    switch (mapRoll) {
      case "a healing shrine!":
        await recoverMana(50);
        console.log("You stand in the healing shrine...");
        await slowDown(3000);
        console.log(await healing(30));
        await slowDown(1000);
        break;
      case "a Treasure!":
        let treasure = itemRoller(dItem());
        console.log(
          `\x1b[33myou come across a treasure chest, you open it.\x1b[0m\nReceived \x1b[36m${treasure}\x1b[0m and \x1b[33m50 gold!\x1b[0m`
        );
        await mint(50);
        await itemPusher(treasure);
        await addScore(100);
        await slowDown(3000);
        break;
      case "an enemy!":
        battleResults = await battleTime(d20(), false);
        if (battleResults === true) {
          console.log("\x1b[33mYou won!\x1b[0m");
          await slowDown(1000);
          console.log(
            "The enemy was guarding an altar containing two items resembling the one at the entrance."
          );
          itemSelector();
          console.log(await mint(50));
          await addScore(200);
          break;
        } else {
          console.log("\x1b[31mYou have died\nGame Over.\x1b[0m");
          await slowDown(3000);
          break gameLoop;
        }
      case "a shop!":
        await shopSelector();
        break;
      case "an Elite enemy!":
        battleResults = await battleTime(d20(), true);
        if (battleResults === true) {
          console.log(
            `\x1b[33mThe elite enemy falls, leaving behind two items for you to take.\x1b[0m`
          );
          await slowDown(3000);
          let item1 = itemRoller(dItem());
          let item2 = itemRoller(dItem());
          console.log(
            `Received \x1b[36m${item1}\x1b[0m and \x1b[36m${item2}\x1b[0m`
          );
          await slowDown(3000);
          await itemPusher(item1);
          await itemPusher(item2);
          console.log(await mint(100));
          await slowDown(3000);
          await addScore(500);
        } else {
          console.log("\x1b[31mYou have died\nGame Over.\x1b[0m");
          await slowDown(3000);
          break gameLoop;
        }
    }
    if (i === 5) {
      console.log(
        "\x1b[31mfinal boss\nYou hear growling ahead, you look ahead and see a giant ogre! He appears to be guarding the ultimate treasure!\x1b[0m"
      );
      await slowDown(5000);
      let finalBattle = await battleTime(20);
      if (finalBattle === true) {
        console.log(
          "\x1b[33mAfter defeating the Ogre you come across a huge treasure chest, when you get home you will live like a king!\x1b[0m"
        );
        await slowDown(3000);
        console.log("\x1b[33mYou win!\x1b[33m");
      } else {
        console.log("\x1b[31mYou have died\nGame Over.\x1b[0m");
        await slowDown(3000);
        break gameLoop;
      }
    }
  }
  let items = await printItems();
  await addScore(items.length * 200);
  console.log("Final items:", await printItems());
  await slowDown(3000);
  console.log(await submitScore(playerName));
  await slowDown(1000);
  console.log(await leaderBoardPrint());
};

theGame();
