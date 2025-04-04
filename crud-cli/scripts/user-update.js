const fs=require('fs')
const path=require('path')

const args=process.argv.slice(2)
if(args.length<2 || args[0]!=='id'){
    console.error('Usage: npm run user:update id <UserID> [fname <NewName>] || [lname <NewSurname>]')
    process.exit(1)
}
const userFile=path.join(__dirname,'..','data','users.json')
if(!fs.existsSync(userFile)){
    console.error('No users found. Database is empty.')
    process.exit(0)
}
const userId=args[1]
const fnameIndex=args.indexOf('fname')
const lnameIndex=args.indexOf('lname')

if(fnameIndex===-1 && lnameIndex===-1){
    console.error('Provide at least one of the name fields')
    process.exit(1)
}

const data=fs.readFileSync(userFile,'utf8')
let users=[]
try{
    users=JSON.parse(data)
}catch(err){
    console.error('Error parsing users file:',err)
    process.exit(1)
}
const userIndex=users.findIndex(u=>u.id===userId)
if(userIndex===-1){
    console.error(`User with ID ${userId} not found.`)
    process.exit(1)
}
// update firstname 
if(fnameIndex!==-1){
    const newName=args[fnameIndex+1]
    users[userIndex].firstName=newName
}
// update lastname
if(lnameIndex!==-1){
    const newSurname=args[lnameIndex+1]
    users[userIndex].lastName=newSurname
}
// adding updated date
users[userIndex].updateAt=new Date().toISOString()
fs.writeFileSync(userFile,JSON.stringify(users,null,2))
console.log(`User with ID ${userId} updated successfully.`)