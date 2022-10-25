import { battleTime } from "./battle.js"
import { checkItem, countItem, resourceReset } from "./server-functions.js"

resourceReset()
await battleTime(2, true)