function divide(num1, num2){
    return new Promise((resolve,reject)=>{
        if(num2===0){
            reject("Cannot divide by zero")
        }else{
            resolve(num1/num2)
        }
    })
}
divide(10,0).then((result)=>console.log(result)).catch((error)=>console.log(error))