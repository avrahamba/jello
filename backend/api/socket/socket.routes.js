
module.exports = connectSockets

function connectSockets(io) {
    io.on('connection', socket => {

        socket.on('connect-to-board', channelId=>{
            if (socket.board) {
                socket.leave(socket.board)
            }
            socket.join(channelId)
            socket.channelId = channelId;
        });

        socket.on('change board', ()=>{
            socket.broadcast.to(socket.channelId).emit('change board')
        });

        socket.on('change task',task=>{
            // console.log('socket.channelId :', socket.channelId);
            socket.broadcast.to(socket.channelId).emit('change-task',task)
        })
    })
}