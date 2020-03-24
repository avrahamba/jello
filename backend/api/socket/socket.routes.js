
module.exports = connectSockets

const emitter = require('../../services/emitter.service');

function connectSockets(io) {
    io.on('connection', socket => {


        emitter.on('sendSocket', ({ data, boardId }) => {
            if (data.socketId === socket.id)
                socket.broadcast.to(boardId).emit('change-data', data)
        })


        socket.on('connect-to-board', channelId => {
            if (socket.board) {
                socket.leave(socket.board)
            }
            socket.join(channelId)
            socket.channelId = channelId;
        });

        socket.on('change board', () => {
            socket.broadcast.to(socket.channelId).emit('change board')
        });

        socket.on('change task', task => {
            // console.log('socket.channelId :', socket.channelId);
            socket.broadcast.to(socket.channelId).emit('change-task', task)
        })
    })
}