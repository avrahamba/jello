

const emitter = require('../../services/emitter.service');

const connectSockets = (io) => {
    io.on('connection', socket => {
        
//!!!!
        emitter.on('sendSocket' + socket.id, ({ data }) => {
            socket.broadcast.to(socket.boardId).emit('change-data', data)
        })

        socket.on('connect-to-board', boardId => {
            if (socket.board) {
                socket.leave(socket.board)
            }
            socket.join(boardId)
            socket.boardId = boardId;
        });

    })
}

module.exports = connectSockets