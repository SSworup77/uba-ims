const fs = require('fs')
const path = require('path')

const args = process.argv.slice(2)
const isSpecificUser = args.length > 0

const usersFile = path.join(__dirname, '..', 'data', 'users.json')

// checking user file
if (!fs.existsSync(usersFile)) {
    console.error('No users found. Database is empty.')
    process.exit(0)
}

// read users from file
const data = fs.readFileSync(usersFile, 'utf8')
let users = []

try {
    users = JSON.parse(data)
} catch (err) {
    console.error('Error parsing users file:', err)
    process.exit(1)
}

if (users.length === 0) {
    console.log('No users found in the database.')
    process.exit(0);
}

// for specific user
if (isSpecificUser) {
    if (args[0] === 'id') {
        const userId = args[1];
        const user = users.find(u => u.id === userId);

        if (!user) {
            console.error(`User with ID ${userId} not found.`)
            process.exit(1)
        }

        console.log('User details:');
        console.log(`ID: ${user.id}`);
        console.log(`Name: ${user.firstName} ${user.lastName}`);
        console.log(`Created: ${user.createdAt}`);
    } else if (args[0] === 'fname') {
        // find user by first name and last name
        const firstName = args[1]
        let lastName = null

        const lnameIndex = args.indexOf('lname')
        if (lnameIndex !== -1 && args.length > lnameIndex + 1) {
            lastName = args[lnameIndex + 1]
        }

        const matchedUsers = users.filter(u => {
            if (lastName) {
                return u.firstName === firstName && u.lastName === lastName
            }
            return u.firstName === firstName
        });

        if (matchedUsers.length === 0) {
            console.error(`No users found with the provided name.`);
            process.exit(1);
        }

        console.log(`Found ${matchedUsers.length} user(s):`)
        matchedUsers.forEach(user => {
            console.log('\n------------------------')
            console.log(`ID: ${user.id}`)
            console.log(`Name: ${user.firstName} ${user.lastName}`)
            console.log(`Created: ${user.createdAt}`)
        });
    } else {
        console.error('Usage: npm run user:read [id <UserID> | fname <Name> [lname <Surname>]]');
        process.exit(1);
    }
} else {
    // list all users
    console.log(`Total users: ${users.length}`)
    console.log('------------------------')

    users.forEach(user => {
        console.log(`ID: ${user.id}`)
        console.log(`Name: ${user.firstName} ${user.lastName}`)
        console.log(`Created: ${user.createdAt}`)
        console.log('------------------------')
    });
}