import { healthCheck } from "./server-functions.js"
import {d20, enemyList} from "./variables-objects.js"
import rl from "readline-sync"

const skillMenu = ["Power Slash", "Power Charge"]

let chargeFlag = false
const playerBattleRoll = () => {
    let dv = 10 + d20()
    if(chargeFlag === true) {
        dv = dv * 2
        chargeFlag = false
    }
    return dv
}

const battleTime = async(num) => {
    let enemy = enemyList[num].name
    let enemyHP = enemyList[num].hp
    console.log(`Encountered \x1b[31m${enemy}\x1b[0m`)
    while(enemyHP > 0) {
        console.log("Enemy hp:", enemyHP)
        console.log("Your hp:", await healthCheck())
        let playerPhase = rl.question("Do you want to attack (1), defend (2) or use skill (3)?\n")
        if(playerPhase === "1") {
            let attackValue = playerBattleRoll()
            console.log(`\x1b[35mDealt ${attackValue} damage\x1b[0m`)
            enemyHP = enemyHP - attackValue
        } else if(playerPhase === "2") {
            console.log("defend")
        } else if(playerPhase === "3") {
            let skillNumbers = skillMenu.length
            let skill1 = skillMenu[0]
            let skill2 = skillMenu[1]
            if(skillNumbers === 2) {
                while(true){
                let skillMenu = rl.question(`Do you want to use ${skill1} (1), ${skill2}(2) or go back to attack menu (3)?\n`)
                if(skillMenu === "1") {
                    console.log(`Used ${skill1}!`)
                    let attackValue = (playerBattleRoll() * 2)
                    console.log(`\x1b[35mDealt ${attackValue} damage\x1b[0m`)
                    enemyHP = enemyHP - attackValue
                    break
                } else if(skillMenu === "2") {
                    if(chargeFlag === false) {
                        console.log(`\x1b[35mUsed ${skill2}! Your next attacks power will be doubled!\x1b[0m`)
                        chargeFlag = true
                        break
                    } else {
                        console.log("Power Charge already active.")
                    }
                } else if(skillMenu === "3")
                    break
            }}
        } else {
            console.log("Invalid command please try again")
        }
    }}



battleTime(d20())

export {battleTime}