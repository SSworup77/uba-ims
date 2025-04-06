async function getData(){
    setTimeout(function(){
        console.log("Data fetched")
    },3000)
}
let output = getData()
console.log(output)