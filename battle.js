import { checkItem, countItem, damage, healing, healthCheck, manaCheck, recoverMana, spendMana, useItem } from "./server-functions.js";
import { d10, d20, dCoin, enemyList} from "./variables-objects.js";
import rl from "readline-sync";

const skillMenu = ["Power Slash", "Power Charge"]

let chargeFlag = false;
let playerDefFlag = false;
let enemyDefFlag = false;
let enemy;
let enemyHP;
let hpPots = []
let mpPots = []
let smokeBombs = []

let enemyBlockChecker = (dv) => {
  if (enemyDefFlag === true) {
    console.log("\x1b[31mYour attack was blocked!\x1b[0m");
    return Math.round(dv * 0.5);
  } else return dv;
};

const playerBattleRoll = async() => {
  let dv = 10 + d20();
  if(await checkItem("Steel Sword") === "true") {
        dv = Math.round(dv * 1.3)
    }
    if(await checkItem("Spear") === "true") {
        dv = Math.round(dv * 1.3)
    }
    if (chargeFlag === true) {
        if(await checkItem("Power Necklace") === "true") {
            console.log("\x1b[35mYour Power Necklace improved your charge!\x1b[0m")
            dv = Math.round(dv * 3);
        } else {
        dv = Math.round(dv * 2);
    }}
chargeFlag = false
return Math.round(dv)
};

let enemyBattleRoll = () => {
  return 5 + d20();
};

const enemyRoll = () => Math.floor(Math.random() * 4);

const damageReduction = async(dv) => {
    if(await checkItem("Chainmail") === "true") {
        dv = Math.round(dv * 0.8)
    }
    if(await checkItem("Helmet") === "true") {
        dv = Math.round(dv * 0.8)
    }
    if (playerDefFlag === true) {
        console.log("\x1b[35mBlocked!\x1b[0m");
        dv = Math.round(dv * 0.2);
      }
    return dv
}

const battleTime = async (num, e) => {
  if (e === true) {
    enemy = "Elite " + enemyList[num].name;
    enemyHP = enemyList[num].hp * 2;
  } else {
    enemy = enemyList[num].name;
    enemyHP = enemyList[num].hp;
  }
  console.log(`Encountered \x1b[31m${enemy}\x1b[0m`);
  battleloop: while (true) {
    playerDefFlag = false;
    console.log("Enemy hp:", enemyHP);
    console.log("Your HP:", await healthCheck());
    console.log("Your MP:", await manaCheck());
    let playerPhase = rl.question(
      "Do you want to attack (1), defend (2), use a skill (3) or use an item (4)?\n"
    );
    if (playerPhase === "1") {
      let attackValue = await playerBattleRoll();
      attackValue = enemyBlockChecker(attackValue);
      console.log(`\x1b[35mDealt ${attackValue} damage\x1b[0m`);
      enemyHP = enemyHP - attackValue;
      if(await checkItem("Dagger") === "true") {
        if(dCoin() === 0){
        console.log(`\x1b[35mYour dagger slices true. Dealt ${attackValue} damage\x1b[0m`)
        enemyHP = enemyHP - attackValue;
      }}
    } else if (playerPhase === "2") {
      console.log("defending");
      playerDefFlag = true;
    } else if (playerPhase === "3") {
      let skillNumbers = skillMenu.length;
      let skill1 = skillMenu[0];
      let skill2 = skillMenu[1];
      if (skillNumbers === 2) {
        while (true) {
          let skillMenu = rl.question(
            `Do you want to use ${skill1} - 25 mana (1), ${skill2} - 25 mana (2) or go back to attack menu (3)?\n`
          );
          if (skillMenu === "1") {
            if ((await manaCheck()) >= 25) {
              console.log(await spendMana(25));
              console.log(`Used ${skill1}!`);
              let attackValue;
              if(await checkItem("Strength Bracelet") === "true") {
                console.log("\x1b[35mYour Strength Bracelet improves your swing!\x1b[0m")
                attackValue = await playerBattleRoll() * 2.5
              } else {
                attackValue = await playerBattleRoll() * 2;
              }
              attackValue = enemyBlockChecker(attackValue);
              console.log(`\x1b[35mDealt ${attackValue} damage\x1b[0m`);
              enemyHP = enemyHP - attackValue;
              break;
            } else {
              console.log("You do not have enough mana.");
            }
          } else if (skillMenu === "2") {
            if (chargeFlag === false) {
              if ((await manaCheck()) >= 25) {
                console.log(await spendMana(25));
                console.log(
                  `\x1b[35mUsed ${skill2}! Your next attack's power will be increased!\x1b[0m`
                );
                chargeFlag = true;
                break;
              } else {
                console.log("You do not have enough mana.");
              } 
            } else {
              console.log("Power Charge already active.");
            }
          } else if (skillMenu === "3") continue battleloop;
        }
      }
    } else if (playerPhase === "4"){
        hpPots = await countItem("HP Potion")
        mpPots = await countItem("MP Potion")
        smokeBombs = await countItem("Smoke Bomb")
        while(true){
        let itemInput = rl.question(`Do you want to use HP Potions - ${hpPots} owned (1), MP Potions - ${mpPots} owned (2), Smoke Bomb - ${smokeBombs} owned (3) or return to previous menu (4)?\n`)
        if(itemInput === "1") {
            if(await checkItem("HP Potion") === "true") {
                console.log(await healing(50))
                await useItem("HP Potion")
                break
            } else {console.log("No HP Potions.")}
        } else if(itemInput === "2"){
            if(await checkItem("MP Potion") === "true") {
                console.log(await recoverMana(50))
                await useItem("MP Potion")
                break
            } else {console.log("No MP Potions.")}
        } else if(itemInput === "3"){
            if(await checkItem("Smoke Bomb") === "true") {
                console.log("escaped")
                await useItem("Smoke Bomb")
                return true
            } else {console.log("No HP Potions.")}
        } else if(itemInput === "4") {
            continue battleloop
        } else {

        }}
    }else {
      console.log("Invalid command please try again");
      continue battleloop;
    }
    if(await checkItem("Buckler") === "true"){
        let bucklerRoll = d10()
        if(playerDefFlag === false){
            if(bucklerRoll === 0 || bucklerRoll === 1) {
                console.log("\x1b[35mYou block automatically!\x1b[0m")
                playerDefFlag = true
            }}
    }
    if (enemyHP > 0) {
      console.log("\x1b[31mEnemy turn\x1b[0m");
      enemyDefFlag = false;
      let enemyMove = enemyRoll();
      if (enemyMove === 0 || enemyMove === 1) {
        console.log("\x1b[31menemy attacks\x1b[0m");
        let enemydamage = enemyBattleRoll();
        enemydamage = await damageReduction(enemydamage);
        console.log(await damage(enemydamage));
      } else if (enemyMove === 2) {
        console.log("\x1b[31menemy defends\x1b[0m");
        enemyDefFlag = true;
      } else if (enemyMove === 3) {
        console.log("\x1b[31menemy special\x1b[0m");
        let enemydamage = Math.round(enemyBattleRoll() * 1.2);
        enemydamage = await damageReduction(enemydamage);
        console.log(await damage(enemydamage));
      }
    } else {
      return true;
    }
    if ((await healthCheck()) <= 0) {
      return false;
    }
  }
};

export { battleTime };
