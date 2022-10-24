import { damage } from "./server-functions"
import { d10, enemyList } from "./variables-objects"

let goblinWarrior = async(dv) => {
    dv = Math.round(dv * 1.5)
    return await damage(dv)
}

let goblinArcher = async(dv) => {
    dv = Math.round(dv * 1.2)
    if(d10() === 0) {
        console.log("A critical strike!")
        dv = dv * 2
    }
    return await damage(dv)
}

let goblinBrute = () => {
    console.log("The brute takes a defensive stance, ready to counter any attack!")
    bruteRetaliate = true
}

let bruteCounter = async(dv) => {
    console.log("Countered!")
    dv = Math.round(dv * 1.5)
    bruteRetaliate = false
    return await damage(dv)
}

let Vampire = async(dv) => {
    enemyHP = enemyHP + dv
    return await damage(dv)
}

let Golem = async(dv) => {
    dv = Math.round(dv * 1.2)
    return await damage(dv)
}

let shieldKnight = () => {
    console.log("The Knight raises his shield, fully blocking all attacks!")
    shield = true
}

let Knight = async(dv) => {
    if(knightBuff === false) {
    console.log("The Knight with a determined look in his eye raises his power!")
    knightBuff = true
    return
    } else return await damage(dv)
}

let Assassin = async() => {
    console.log("You are cut with a poisoned blade! You are poisoned!")
    playerPoison = true
    return damage(dv)
}

let dualBlader = async() => {
    console.log("Wielding both blades, the Dual Blader strikes twice!")
    console.log(await damage(dv))
    return await damage(dv)
}

let holyKnight = () => {
    console.log("The Knight casts a healing spell!")
    enemyHP = enemyHP + 20
}

let fireMage = async(dv) => {
    console.log("The mage casts Fireball!")
    dv = dv * 2
    return await damage(dv)
}

let iceMage = async(dv) => {
    console.log("The mage casts Ice Lance!")
    dv = Math.round(dv * 1.6)
    return await damage(dv)
}

let livingBomb = async(dv) => {
    console.log("The bomb self destructs!")
    dv = dv * 3
    enemyHP = 0
    return await damage(dv)
}

let flyingSword = async(dv) => {
    console.log("The sword takes a parrying stance, attack with caution!")
    parry = true
}

let swordParry = async(dv) => {
    console.log("Parried!")
    dv = Math.round(dv * 2)
    parry = false
    return await damage(dv)
}

let cannoneer = async(dv) => {
    console.log("The cannoneer fires a great blast, but he has to reload!")
    dv = dv * 3
    reload = 2
    return await damage(dv)
}

let armoredKnight = async(dv) => {
    console.log("The knight performs a defensive charge, activating his guard!")
    dv = Math.round(dv * 0.2)
    enemyDefFlag = true
    return await damage(dv)
}

let greatSwordKnight = async(dv) => {
    if(gskCharge === false) {
        console.log("The knight prepares a devastating strike!")
        gskCharge = true
    } else {
        console.log("The knight delivers his most powerful move!")
        dv = Math.round(dv * 2.5)
        gskCharge = false
        return await damage(dv)
    }
}

let ghost = async(dv) => {
    console.log("The ghosts jumps inside of you!")
    intangible = true
    dv = Math.round(dv * 0.2)
    return await damage(dv)
}

let mummy = async(dv) => {
    tangle = tangle++
    dv = (dv * tangle)
}

let quickBlader = async(dv) => {
    console.log("The quickblader uses his speed to gain an extra turn!")
    speed = true
    return await damage(dv)
}
export {swordParry, goblinBrute, bruteCounter}