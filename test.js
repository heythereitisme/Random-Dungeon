import fetch from "node-fetch"

let testFunction = async() => {
    const test = await fetch("http://localhost:4000/")
    let testResponse = await test.json()
    console.log(testResponse)
}

testFunction()