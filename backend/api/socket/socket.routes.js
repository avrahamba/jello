

const emitter = require('../../services/emitter.service');

const connectSockets = (io) => {
    io.on('connection', function (socket) {
        function sendChangeDataHandler({ objData }) {
            socket.broadcast.to(socket.boardId).emit('change-data', objData)
        }
        emitter.on('sendSocket' + socket.id, sendChangeDataHandler)
        socket.on('disconnect', () => {
            emitter.off('sendSocket' + socket.id, sendChangeDataHandler)
        });

        socket.on('connect-to-board', boardId => {
            if (socket.boardId) {
                socket.leave(socket.boardId)
            }
            socket.join(boardId)
            socket.boardId = boardId;
        });
    })
}

module.exports = connectSockets