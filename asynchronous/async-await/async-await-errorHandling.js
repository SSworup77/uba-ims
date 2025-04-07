async function divide(num1,num2){
    try{
        if(num2==0){
            throw new Error("Cannot divide by zero")
        }
        return num1/num2
    }catch(err){
        console.log(err.message)
        return null
    }
}

async function main(){
    console.log(await divide(10,2))
    console.log(await divide(10,0))
}
main()