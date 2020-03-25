import io from 'socket.io-client';
const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/'
    : '//localhost:3030'
// : '//192.168.43.254:3030'
let socket;


const setup = () => {
    socket = io(BASE_URL);
}

const terminate = () => {
    socket = null;
}

const on = (eventName, cb) => {
    socket.on(eventName, cb)
}

const off = (eventName, cb) => {
    socket.off(eventName, cb)
}

const emit = (eventName, data) => {
    socket.emit(eventName, data)
}

const getSocketId = () => {
    return socket.id
}

export const socketService = {
    setup,
    terminate,
    on,
    off,
    emit,
    getSocketId
}