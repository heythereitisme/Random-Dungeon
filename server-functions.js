import fetch from "node-fetch";
import { d10 } from "./variables-objects.js";

let resourceReset = async () => {
  await fetch("http://localhost:4000/reset");
};

let healthCheck = async () => {
  let serverReq = await fetch("http://localhost:4000/checkHP");
  let healthAmount = await serverReq.text();
  return +healthAmount;
};

let manaCheck = async () => {
    let serverReq = await fetch("http://localhost:4000/checkMP");
    let manaAmount = await serverReq.text();
    return +manaAmount;
  };

let goldCheck = async () => {
  let serverReq = await fetch("http://localhost:4000/checkGold");
  let goldAmount = await serverReq.text();
  return +goldAmount;
};

let itemPusher = async (item) => {
  let serverReq = await fetch(`http://localhost:4000/itemPush?item=${item}`);
  let itemPushed = serverReq.text();
  if(await checkItem("Healing fairy") === "true") {
    console.log(await healing(75))
    await useItem("Healing fairy")
  }
  if(await checkItem("Mana fairy") === "true") {
    console.log(await recoverMana(100))
    await useItem("Mana fairy")
  }
  if(await checkItem("Heart Crystal") === "true") {
    console.log(await heartCrystal())
    await healing(50)
    await useItem("Heart Crystal")
  }
  if(await checkItem("Mana Crystal") === "true") {
    console.log(await manaCrystal())
    await recoverMana(50)
    await useItem("Mana Crystal")
  }
  return itemPushed;
};

let healing = async (v) => {
  let serverReq = await fetch(`http://localhost:4000/healing?amount=${v}`);
  let healthMessage = await serverReq.text();
  return healthMessage;
};

let damage = async (v) => {
  if(await checkItem("Swift Shoes") === "true"){
    if(d10() === 0) {
        return("\x1b[35mDodged!\x1b[0m")
    } else {
        let serverReq = await fetch(`http://localhost:4000/damage?amount=${v}`);
        let damageMessage = await serverReq.text();
        return damageMessage;
    }
  } else {
        let serverReq = await fetch(`http://localhost:4000/damage?amount=${v}`);
        let damageMessage = await serverReq.text();
        return damageMessage;
  }
  
};

let spend = async (v) => {
  let serverReq = await fetch(`http://localhost:4000/spend?amount=${v}`);
  let goldSpent = await serverReq.text();
  return goldSpent;
};

let mint = async (v) => {
  let serverReq = await fetch(`http://localhost:4000/mint?amount=${v}`);
  let moneyMessage = await serverReq.text();
  return moneyMessage;
};

let printItems = async () => {
  let serverReq = await fetch("http://localhost:4000/itemPrint");
  let items = await serverReq.json();
  return items;
};

let spendMana = async (v) => {
    let serverReq = await fetch(`http://localhost:4000/spendMana?amount=${v}`);
    let manaSpent = await serverReq.text();
    return manaSpent
}

let recoverMana = async (v) => {
    let serverReq = await fetch(`http://localhost:4000/recoverMana?amount=${v}`);
    let recoveryMessage = serverReq.text()
    return recoveryMessage
  };

let checkItem = async(v) => {
    let serverReq = await fetch(`http://localhost:4000/checkItem?item=${v}`)
    let checkedItem = await serverReq.text()
    return checkedItem
}

let countItem = async(v) => {
    let serverReq = await fetch(`http://localhost:4000/countItem?item=${v}`)
    let countedItem = await serverReq.text()
    return countedItem
  }  

let useItem = async(v) => {
    let serverReq = await fetch(`http://localhost:4000/useItem?item=${v}`)
    let usedItem = serverReq.text()
    return usedItem
}

let heartCrystal = async() => {
    let serverReq = await fetch('http://localhost:4000/heartCrystal')
    let itemMessage = await serverReq.text()
    return itemMessage
}

let manaCrystal = async() => {
    let serverReq = await fetch('http://localhost:4000/manaCrystal')
    let itemMessage = await serverReq.text()
    return itemMessage
}

let res = async() => {
    let serverReq = await fetch('http://localhost:4000/res')
    let resMessage = await serverReq.text()
    return resMessage
}

let leaderBoardPrint = async() => {
  let serverReq = await fetch("http://localhost:4000/leaderboard")
  let please = await serverReq.json()
  console.log("Leaderboard:")
  return please
}

let submitScore = async(n) => {
  let serverReq = await fetch(`http://localhost:4000/lbAdd?name=${n}`, {method:'POST'})
  let message = await serverReq.text()
  return message
}

export {submitScore, leaderBoardPrint, res, manaCrystal, heartCrystal, useItem, countItem, checkItem, recoverMana, manaCheck, spendMana, printItems, mint, spend, damage, healing, itemPusher, goldCheck, healthCheck, resourceReset}