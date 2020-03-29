

const emitter = require('../../services/emitter.service');

const connectSockets = (io) => {
    io.on('connection', socket => {

        emitter.on('sendSocket' + socket.id, ({ data }) => {
            data.socketId = socket.id
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

module.exports = connectSockets