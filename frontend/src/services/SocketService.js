import io from 'socket.io-client';
const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/'
    : '//localhost:3030'
    // : '//192.168.43.254:3030'
let socket;

export const socketService = {
    setup,
    terminate,
    on,
    off,
    emit,
    getSocketId
}

function setup() {
    socket = io(BASE_URL);
}

function terminate() {
    socket = null;
}

function on(eventName, cb) {
    socket.on(eventName, cb)
}

function off(eventName, cb) {
    socket.off(eventName, cb)
}

function emit(eventName, data) {
    socket.emit(eventName, data)
}

function getSocketId(){
    return socket.id
}