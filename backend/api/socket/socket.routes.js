
module.exports = connectSockets

const emitter = require('../../services/emitter.service');

function connectSockets(io) {
    io.on('connection', socket => {

        emitter.on('sendSocket' + socket.id, ({ data, boardId }) => {
            socket.broadcast.to(boardId).emit('change-data', data)
        })

        socket.on('connect-to-board', channelId => {
            if (socket.board) {
                socket.leave(socket.board)
            }
            socket.join(channelId)
            socket.channelId = channelId;
        });

    })
}