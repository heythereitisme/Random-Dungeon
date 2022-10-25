// import { damage } from "./server-functions.js"
// import { d10 } from "./variables-objects.js"
// import {reload, bruteRetaliate, enemyHP} from "./battle.js"

// let special = async(dv, enemy) => {
//     if(enemy === "Goblin Warrior") {
//         console.log("\x1b[31mGoblin Warrior uses Power Slash!\x1b[0m")
//         dv = Math.round(dv * 1.5)
//         return await damage(dv)
//     } else if(enemy === "Goblin Archer"){
//         console.log('\x1b[31mGoblin Archer readies "True Strike"\x1b[0m')
//         dv = Math.round(dv * 1.2)
//         if(d10() === 0) {
//             console.log("\x1b[31mA critical strike!\x1b[0m")
//             dv = dv * 2
//         }
//         return await damage(dv)
//     } else if(enemy === "Goblin Brute"){
//         console.log("\x1b[31mThe brute takes a defensive stance, ready to counter any attack!\x1b[0m")
//         bruteRetaliate = true
//     } else if(enemy === "Vampire"){
//         console.log("\x1b[31mThe vampire sucks your blood!\x1b[0m")
//         enemyHP = enemyHP + dv
//         return await damage(dv)
//     } else if(enemy === "Golem"){
//         console.log("\x1b[31mThe golem slams the ground!\x1b[0m")
//         dv = Math.round(dv * 1.2)
//         return await damage(dv)
//     } else if(enemy === "Shield Knight"){
//         shield = true
//         return ("\x1b[31mThe Knight raises his shield, fully blocking all attacks!\x1b[0m")
//     } else if(enemy === "Knight"){
//         if(knightBuff === false) {
//             return("\x1b[31mThe Knight with a determined look in his eye raises his power!\x1b[0m")
//             knightBuff = true
//             } else return await damage(dv)
//     } else if(enemy === "Assassin"){
//         console.log("\x1b[31mYou are cut with a poisoned blade! You are poisoned!\x1b[0m")
//         playerPoison = true
//         return damage(dv)
//     } else if(enemy === "Dual Blader"){
//         console.log("\x1b[31mWielding both blades, the Dual Blader strikes twice!\x1b[0m")
//         console.log(await damage(dv))
//         return await damage(dv)
//     } else if(enemy === "Holy Knight"){
//         enemyHP = enemyHP + 20
//         return("\x1b[31mThe Knight casts a healing spell!\x1b[0m")
//     } else if(enemy === "Fire Mage"){
//         console.log("\x1b[31mThe mage casts Fireball!\x1b[0m")
//         dv = dv * 2
//         return await damage(dv)
//     } else if(enemy === "Ice Mage"){
//         console.log("\x1b[31mThe mage casts Ice Lance!\x1b[0m")
//         dv = Math.round(dv * 1.6)
//         return await damage(dv)
//     } else if(enemy === "Living Bomb"){
//         console.log("\x1b[31mThe bomb self destructs!\x1b[0m")
//         dv = dv * 3
//         enemyHP = 0
//         return await damage(dv)
//     } else if(enemy === "Flying Sword"){
//         parry = true
//         return("\x1b[31mThe sword takes a parrying stance, attack with caution!\x1b[0m")
//     } else if(enemy === "Cannoneer"){
//         console.log("\x1b[31mThe cannoneer fires a great blast, but he has to reload!\x1b[0m")
//         dv = dv * 3
//         reload = 2
//         return await damage(dv)
//     } else if(enemy === "Armored Knight"){
//         console.log("\x1b[31mThe knight performs a defensive charge, activating his guard!\x1b[0m")
//         dv = Math.round(dv * 0.2)
//         enemyDefFlag = true
//         return await damage(dv)
//     } else if(enemy === "Greatsword Knight"){
//         if(gskCharge === false) {
//             console.log("\x1b[31mThe knight prepares a devastating strike!\x1b[0m")
//             gskCharge = true
//         } else {
//             console.log("\x1b[31mThe knight delivers his most powerful move!\x1b[0m")
//             dv = Math.round(dv * 2.5)
//             gskCharge = false
//             return await damage(dv)
//         }
//     } else if(enemy === "Ghost"){
//         console.log("\x1b[31mThe ghosts jumps inside of you!\x1b[0m")
//         intangible = true
//         dv = Math.round(dv * 0.2)
//         return await damage(dv)
//     } else if(enemy === "Mummy"){
//         tangle = tangle++
//         dv = (dv * tangle)
//         return await damage(dv)
//     } else if(enemy === "Quickblader"){
//         console.log("\x1b[31mThe quickblader uses his speed to gain an extra turn!\x1b[0m")
//         speed = true
//         return await damage(dv)
//     } else if(enemy === "Dungeon Ogre"){
//         console.log("\x1b[31mayy lmao\x1b[0m")
//     }
// }


// let goblinWarrior = async(dv) => {
//     dv = Math.round(dv * 1.5)
//     return await damage(dv)
// }

// let goblinArcher = async(dv) => {
//     dv = Math.round(dv * 1.2)
//     if(d10() === 0) {
//         console.log("A critical strike!")
//         dv = dv * 2
//     }
//     return await damage(dv)
// }

// let goblinBrute = () => {
//     console.log("The brute takes a defensive stance, ready to counter any attack!")
//     bruteRetaliate = true
// }

// let bruteCounter = async(dv) => {
//     console.log("Countered!")
//     dv = Math.round(dv * 1.5)
//     bruteRetaliate = false
//     return await damage(dv)
// }

// let Vampire = async(dv) => {
//     enemyHP = enemyHP + dv
//     return await damage(dv)
// }

// let Golem = async(dv) => {
//     dv = Math.round(dv * 1.2)
//     return await damage(dv)
// }

// let shieldKnight = () => {
//     console.log("The Knight raises his shield, fully blocking all attacks!")
//     shield = true
// }

// let Knight = async(dv) => {
//     if(knightBuff === false) {
//     console.log("The Knight with a determined look in his eye raises his power!")
//     knightBuff = true
//     return
//     } else return await damage(dv)
// }

// let Assassin = async() => {
//     console.log("You are cut with a poisoned blade! You are poisoned!")
//     playerPoison = true
//     return damage(dv)
// }

// let dualBlader = async() => {
//     console.log("Wielding both blades, the Dual Blader strikes twice!")
//     console.log(await damage(dv))
//     return await damage(dv)
// }

// let holyKnight = () => {
//     console.log("The Knight casts a healing spell!")
//     enemyHP = enemyHP + 20
// }

// let fireMage = async(dv) => {
//     console.log("The mage casts Fireball!")
//     dv = dv * 2
//     return await damage(dv)
// }

// let iceMage = async(dv) => {
//     console.log("The mage casts Ice Lance!")
//     dv = Math.round(dv * 1.6)
//     return await damage(dv)
// }

// let livingBomb = async(dv) => {
//     console.log("The bomb self destructs!")
//     dv = dv * 3
//     enemyHP = 0
//     return await damage(dv)
// }

// let flyingSword = async(dv) => {
//     console.log("The sword takes a parrying stance, attack with caution!")
//     parry = true
// }

// let swordParry = async(dv) => {
//     console.log("Parried!")
//     dv = Math.round(dv * 2)
//     parry = false
//     return await damage(dv)
// }

// let cannoneer = async(dv) => {
//     console.log("The cannoneer fires a great blast, but he has to reload!")
//     dv = dv * 3
//     reload = 2
//     return await damage(dv)
// }

// let armoredKnight = async(dv) => {
//     console.log("The knight performs a defensive charge, activating his guard!")
//     dv = Math.round(dv * 0.2)
//     enemyDefFlag = true
//     return await damage(dv)
// }

// let greatSwordKnight = async(dv) => {
//     if(gskCharge === false) {
//         console.log("The knight prepares a devastating strike!")
//         gskCharge = true
//     } else {
//         console.log("The knight delivers his most powerful move!")
//         dv = Math.round(dv * 2.5)
//         gskCharge = false
//         return await damage(dv)
//     }
// }

// let ghost = async(dv) => {
//     console.log("The ghosts jumps inside of you!")
//     intangible = true
//     dv = Math.round(dv * 0.2)
//     return await damage(dv)
// }

// let mummy = async(dv) => {
//     tangle = tangle++
//     dv = (dv * tangle)
// }

// let quickBlader = async(dv) => {
//     console.log("The quickblader uses his speed to gain an extra turn!")
//     speed = true
//     return await damage(dv)
// }
// export {bruteCounter, swordParry, special}