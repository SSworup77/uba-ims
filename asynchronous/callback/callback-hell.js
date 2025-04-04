const fs=require('fs')

fs.readFile('uba-ims/async-functions/callback/file.txt','utf8',(err,data)=>{
    if(err){
        console.log(err);
        return 
    }
    const modifiedData=data.toUpperCase()
    fs.writeFile('uba-ims/async-functions/callback/output.txt',modifiedData,(err)=>{
        if(err){
            console.log(err);
            return 
        }
        console.log('data written successfully')

        fs.readFile('uba-ims/async-functions/callback/output.txt','utf8',(err,data)=>{
            if(err){
                console.log(err);
                return 
            }
            console.log(data);
        })
    })
})