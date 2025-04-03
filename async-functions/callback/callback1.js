const fs=require('fs')

const path = require('path')
fs.readFile('uba-ims/async-functions/callback/file.txt','utf8',(err,data)=>{
    if(err){
        console.log(err)
        return 
    }
    console.log(data)
})