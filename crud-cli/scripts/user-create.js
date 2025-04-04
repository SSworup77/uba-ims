const fs = require('fs')
const path = require('path')

const args = process.argv.slice(2);

// Check for the correct format
if (args.length < 3 || args[0] !== 'fname') {
    console.error('Usage: npm run user:create fname <Name> lname <Surname>')
    process.exit(1)
}

const nameIndex = args.indexOf('fname')
const surnameIndex = args.indexOf('lname')

if (nameIndex === -1 || surnameIndex === -1) {
    console.error('Usage: npm run user:create fname <Name> lname <Surname>')
    process.exit(1);
}

const firstName = args[nameIndex + 1];
const lastName = args[surnameIndex + 1];

//data directory
const dataDir = path.join(__dirname, '..', 'data')
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir)
}

// users file
const usersFile = path.join(dataDir, 'users.json')
let users = [];

if (fs.existsSync(usersFile)) {
    const data = fs.readFileSync(usersFile, 'utf8')
    try {
        users = JSON.parse(data)
    } catch (err) {
        console.error('Error parsing users file:', err)
        process.exit(1)
    }
}

const userId = Date.now().toString()

// create new user
const newUser = {
    id: userId,
    firstName,
    lastName,
    createdAt: new Date().toISOString()
};
users.push(newUser)
fs.writeFileSync(usersFile, JSON.stringify(users, null, 2))

console.log(`User created successfully!`)
console.log(`ID: ${userId}`)
console.log(`Name: ${firstName} ${lastName}`)