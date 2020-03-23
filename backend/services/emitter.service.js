const EventEmitter = require('events');

class EmitterClass extends EventEmitter {};
const emitter = new EmitterClass();

module.exports = emitter;