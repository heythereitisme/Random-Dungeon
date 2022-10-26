import { battleTime } from "./battle.js"
import { addScore, printItems, checkItem, countItem, res, resourceReset } from "./server-functions.js"
import {MongoClient} from "mongodb"
import fetch from "node-fetch"
import {leaderBoardPrint} from "./server-functions.js"
let test = await printItems()

await addScore(test.length * 200)
// await addScore(await printItems().length * 200)

// console.log(await test("obama"))
