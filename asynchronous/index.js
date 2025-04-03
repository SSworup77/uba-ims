const path=require('path')
const testing="This is unused variable"

var a=2
var b=5
var sum=a+b
console.log(sum)

function example(arg=1){
    if(arg==1){
        //dom something
    }
    else if(arg==2){
        //do something else
    }
}