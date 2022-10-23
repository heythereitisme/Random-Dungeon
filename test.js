import fetch from "node-fetch"

let testFunction = async() => {
    return(await fetch("http://localhost:4000/checkHP").text())
}

testFunction()