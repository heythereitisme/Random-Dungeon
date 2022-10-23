import { checkItem, countItem } from "./server-functions.js"

let testFunction = async() => {
    return(await countItem("HP Potion"))
}

console.log(await testFunction())