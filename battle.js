import { damage, healthCheck, resourceReset } from "./server-functions.js";
import { d20, enemyList } from "./variables-objects.js";
import rl from "readline-sync";

const skillMenu = ["Power Slash", "Power Charge"]

let chargeFlag = false;
let playerDefFlag = false;
let enemyDefFlag = false;
let enemy;
let enemyHP;

const playerBattleRoll = () => {
  let dv = 10 + d20();
  if (chargeFlag === true) {
    dv = dv * 2;
    chargeFlag = false;
  }
  return dv;
};

const enemyRoll = () => Math.floor(Math.random() * 3)

const battleTime = async (num, e) => {
  if(e === true) {
    enemy = ("Elite ", enemyList[num].name);
    enemyHP = (enemyList[num].hp * 2);
  } else {
    enemy = enemyList[num].name;
    enemyHP = enemyList[num].hp;
  }
  console.log(`Encountered \x1b[31m${enemy}\x1b[0m`);
  battleloop:
  while (true) {
    playerDefFlag = false
    console.log("Enemy hp:", enemyHP);
    console.log("Your hp:", await healthCheck());
    let playerPhase = rl.question("Do you want to attack (1), defend (2) or use skill (3)?\n");
    if (playerPhase === "1") {
      let attackValue = playerBattleRoll();
      console.log(`\x1b[35mDealt ${attackValue} damage\x1b[0m`);
      enemyHP = enemyHP - attackValue;
    } else if (playerPhase === "2") {
      console.log("defending");
      playerDefFlag = true
    } else if (playerPhase === "3") {
      let skillNumbers = skillMenu.length;
      let skill1 = skillMenu[0];
      let skill2 = skillMenu[1];
      if (skillNumbers === 2) {
        while (true) {
          let skillMenu = rl.question(`Do you want to use ${skill1} (1), ${skill2}(2) or go back to attack menu (3)?\n`);
          if (skillMenu === "1") {
            console.log(`Used ${skill1}!`);
            let attackValue = playerBattleRoll() * 2;
            console.log(`\x1b[35mDealt ${attackValue} damage\x1b[0m`);
            enemyHP = enemyHP - attackValue;
            break;
          } else if (skillMenu === "2") {
            if (chargeFlag === false) {
              console.log(`\x1b[35mUsed ${skill2}! Your next attack's power will be doubled!\x1b[0m`);
              chargeFlag = true;
              break;
            } else {
              console.log("Power Charge already active.");
            }
          } else if (skillMenu === "3") continue battleloop;
        }
      }
    } else {
      console.log("Invalid command please try again");
      continue battleloop;
    }
  if(enemyHP > 0) {
    console.log("\x1b[31mEnemy turn\x1b[0m")
    let enemyMove = enemyRoll()
    if(enemyMove === 0) {
        console.log("\x1b[31menemy attacks\x1b[0m")
        let enemydamage = d20()
        if(playerDefFlag === true) {
            console.log("Blocked!")
            enemydamage = Math.round(enemydamage * 0.2)
        }
        console.log(await damage(enemydamage))
    } else if(enemyMove === 1) {
        console.log("\x1b[31menemy defends\x1b[0m")
    } else if(enemyMove === 2) {
        console.log("\x1b[31menemy special\x1b[0m")
        let enemydamage = (Math.round(d20() * 1.2))
        if(playerDefFlag === true) {
            console.log("Blocked!")
            enemydamage = Math.round(enemydamage * 0.2)
        }
        console.log(await damage(enemydamage))
    }
  } else {return true}
  if(await healthCheck() <= 0) {
    return false
  }
}
};

export { battleTime };
