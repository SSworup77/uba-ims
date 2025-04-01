const { Command } = require('commander');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const path = require('path');

const program = new Command();
program.version('1.0.0');
const dbPath = path.join(__dirname, 'users.json');
const adapter = new FileSync(dbPath);
const db = low(adapter);

db.defaults({ users: [] }).write();

// Create user
program
  .command('user:create <fname> <lname>')
  .description('Create a new user')
  .action((fname, lname) => {
    const id = Date.now();
    db.get('users')
      .push({ id, fname, lname })
      .write();
    console.log(`User created: ${fname} ${lname} with ID ${id}`);
  });

// List all users
program
  .command('user:list')
  .description('List all users')
  .alias('li')
  .action(() => {
    const users = db.get('users').value();
    if (users.length === 0) {
      console.log('No users found');
      return;
    }
    
    console.log('User List:');
    users.forEach(user => {
      console.log(`ID: ${user.id}, Name: ${user.fname} ${user.lname}`);
    });
  });

program
  .command('user:delete <id>')
  .description('Delete a user')
  .action((id) => {
    const userID=parseInt(id)
    const user=db.get('users').find({id:userID}).value()
    
    if(!user){
      console.log('User not found')
    }
    db.get('users')
      .remove({id:userID})
      .write();
    
    console.log(`User with ID ${userID} deleted successfully`)
  })
program.parse(process.argv);
