const EventEmitter = require('events');
const firstEmitter = new EventEmitter();

//to register a listener
firstEmitter.on('greet', (name) => {
    return `Hello ${name}`
})
firstEmitter.emit('greet','Sworup') 