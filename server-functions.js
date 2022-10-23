import fetch from "node-fetch";

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
  return itemPushed;
};

let healing = async (v) => {
  let serverReq = await fetch(`http://localhost:4000/healing?amount=${v}`);
  let healthMessage = await serverReq.text();
  return healthMessage;
};

let damage = async (v) => {
  let serverReq = await fetch(`http://localhost:4000/damage?amount=${v}`);
  let damageMessage = await serverReq.text();
  return damageMessage;
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
    await fetch(`http://localhost:4000/recoverMana?amount=${v}`);
    return
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

export {useItem, countItem, checkItem, recoverMana, manaCheck, spendMana, printItems, mint, spend, damage, healing, itemPusher, goldCheck, healthCheck, resourceReset}
