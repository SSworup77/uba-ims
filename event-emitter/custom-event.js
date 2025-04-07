const EventEmitter = require('events');

class CustomEmitter extends EventEmitter {
    constructor() {
        super();
        this.greeting='Hello';
    }
    greet(name){
        this.emit('greeting',`${this.greeting}, ${name}`)
    }
}

const myCustomEmitter = new CustomEmitter();
myCustomEmitter.on('greeting',(data)=>{
    return data
});

myCustomEmitter.greet('Sworup')