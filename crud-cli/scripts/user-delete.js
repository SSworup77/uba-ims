const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);

if(args.length<2){
    console.error('Usage: npm run user:delete fname <Name> [--all] or npm run user:delete id <UserID>');
    process.exit(1);
}

const userFile = path.join(__dirname, '..', 'data', 'users.json')

if (!fs.existsSync(userFile)) {
    console.error('No users found. Database is empty.')
    process.exit(0)
}

//reading users
const data = fs.readFileSync(userFile, 'utf8')
let users = [];
try {
    users = JSON.parse(data)
} catch (err) {
    console.error('Error parsing users file:', err)
    process.exit(1)
}
let deletedUsers = [];

// delete byu id case
if (args[0] === 'id') {
    const userId = args[1]
    const userIndex = users.findIndex(u => u.id === userId)
    if (userIndex === -1) {
        console.error(`User with ID ${userId} not found.`)
        process.exit(1)
    }
    console.log(userIndex)

    deletedUsers.push(users[userIndex])
    users.splice(userIndex, 1)
    console.log(`User with ID ${userId} deleted successfully.`)
}
// delete by first name
else if (args[0] === 'fname') {
    const firstName = args[1]
    const deleteAll = args.includes('--all')
    
    if (deleteAll) {
        const tempUsers = [...users]
        users = users.filter(u => u.firstName !== firstName)
        deletedUsers = tempUsers.filter(u => u.firstName === firstName)
        console.log(`All users with first name ${firstName} deleted successfully.`)
    } else {
        const userIndex = users.findIndex(u => u.firstName === firstName)
        if (userIndex === -1) {
            console.error(`User with first name ${firstName} not found.`)
            process.exit(1)
        }
        deletedUsers.push(users[userIndex])
        users.splice(userIndex, 1)
        console.log(`User with first name ${firstName} deleted successfully.`)
    }

}
else {
    console.error('Usage: npm run user:delete fname <Name> [--all] or npm run user:delete id <UserID>')
    process.exit(1)
}
fs.writeFileSync(userFile, JSON.stringify(users, null, 2))
console.log('Deleted users:')
deletedUsers.forEach(user => {
    console.log(`ID: ${user.id}`)
    console.log(`Name: ${user.firstName} ${user.lastName}`)
    console.log(`Created: ${user.createdAt}`)
    console.log('---------------------')
})