
const emitter = require('../../services/emitter.service');
const mongoose = require("mongoose");

const Board = mongoose.model("Board");


// async function getById(id) {
//     const collection = await dbService.getCollection('board')
//     try {
//         const boardId = id.split('-');

//         const board = await collection.findOne({ "_id": ObjectId(boardId[0]) })
//         return board
//     } catch (err) {
//         console.log('ERROR: cannot find boards')
//         throw err;
//     }
// }

async function getById(id) {
    const boardId = id.split('-')[0];
    return Board.findById(boardId);
}

async function query(userId) {
    let criteria = {
        $or: [
            { public: true },
            { 'users._id': userId }
        ]
    }

    const boards = await Board.find(criteria);
    // console.log('boards', boards);

    return boards.map(board => {
        const onUser = (userId && board.users.findIndex(user => user._id === userId) !== -1)
        return {
            _id: board._id,
            title: board.title,
            background: board.style.background,
            onUser,
            isAddMembers: false
        }
    })
}

async function remove(boardId) {

    // const boardId = id.split('-')[0];
    // await collection.deleteOne({ "_id": ObjectId(boardId) })

}


async function add(wrapper) {
    const user = wrapper.user;
    const prefs = wrapper.prefs
    const miniUser = {
        _id: user._id,
        name: user.name,
        email: user.email
    }

    const newBoard = {
        title: prefs.title,
        users: [miniUser],
        taskLists: [],
        style: { background: prefs.style.background },
        public: prefs.public

    }
    Board.insertMany([newBoard])
    return newBoard;
}

async function save(board) {

    Board.replaceOne({ _id: board._id }, board)
    return board;
}


async function changeData(boardId, data) {
    switch (data.type) {
        case 'changeTitleBoard':
            await Board.updateOne({ _id: boardId }, { $set: { title: data.title } })
            break;
        case 'removeTaskList':
            await Board.updateOne({ _id: boardId }, { $pull: { taskLists: { id: data.taskListId } } })
            break;
        case 'moveList':
            {
                const { oldIndex, newIndex } = data
                const board = await Board.findById(boardId)
                const list = board.taskLists.splice(oldIndex, 1)[0]
                board.taskLists.splice(newIndex, 0, list)
                await Board.updateOne({ _id: boardId }, { $set: { taskLists: board.taskLists } })
            }
            break;
        case 'moveTask':
            {
                const { idMoveFrom, idMoveTo, oldIndex, newIndex } = data;
                // let obj = await Board.find({ _id: boardId, 'taskLists.id': idMoveFrom }, { ['taskLists.$.tasks']: true })
                // // const taskIdx = obj.taskLists[0].tasks.findIndex(task => task.id === taskId)
                // const task = obj[0].taskLists[0].tasks[oldIndex]
                // console.log('task:', task);
                // await Board.updateOne({ _id: boardId }, { $pull: { 'taskLists.tasks': { id: task.id } } })
                // // await Board.updateOne({ _id: boardId },{ $set: { taskLists: board.taskLists }})



                
                const board = await Board.findById(boardId)
                const oldListIdx = board.taskLists.findIndex(list => list.id === idMoveFrom);
                const newListIdx = board.taskLists.findIndex(list => list.id === idMoveTo);
                const task = board.taskLists[oldListIdx].tasks.splice(oldIndex, 1)[0]
                board.taskLists[newListIdx].tasks.splice(newIndex, 0, task)
                await Board.updateOne({ _id: boardId }, { $set: { taskLists: board.taskLists } })
            }
            break;
        case 'addTask':
            {
                const { task, taskListId } = data;
                await Board.updateOne({ _id: boardId, 'taskLists.id': taskListId }, { $push: { 'taskLists.$.tasks': task } })
            }
            break;
        case 'addList':
            {
                const { newList } = data;
                await Board.updateOne({ _id: boardId }, { $push: { taskLists: newList } })
            }
            break;
        case 'setListTitle':
            {
                const { taskListId, title } = data;
                await Board.updateOne({ _id: boardId, 'taskLists.id': taskListId }, { $set: { 'taskLists.$.title': title } })
            }
            break;
        case 'removeTask':
            {
                const { taskId } = data;
                await Board.updateOne({ _id: boardId }, { $pull: { taskLists: { tasks: { $elemMatch: { id: taskId } } } } })
            }
            break;
        case 'saveTask':
            {
                const { objSave } = data
                const { taskId, type } = objSave
                let obj = await Board.find({ _id: boardId, 'taskLists.tasks.id': taskId }, { 'taskLists.tasks.$': true })
                const taskIdx = obj[0].taskLists[0].tasks.findIndex(task => task.id === taskId)
                switch (type) {
                    case 'setTitle':
                        await Board.updateOne({ _id: boardId, 'taskLists.tasks.id': taskId }, { $set: { ['taskLists.$.tasks.' + taskIdx + '.title']: objSave.title } })
                        break;
                    case 'setDueDate':
                        await Board.updateOne({ _id: boardId, 'taskLists.tasks.id': taskId }, { $set: { ['taskLists.$.tasks.' + taskIdx + '.dueDate']: objSave.dueDate } })
                        break;
                    case 'setLabel':
                        await Board.updateOne({ _id: boardId, 'taskLists.tasks.id': taskId }, { $set: { ['taskLists.$.tasks.' + taskIdx + '.labels']: objSave.labels } })
                        break;
                    case 'attachments':
                        await Board.updateOne({ _id: boardId, 'taskLists.tasks.id': taskId }, { $set: { ['taskLists.$.tasks.' + taskIdx + '.attachments']: objSave.attachments } })
                        break;
                    case 'editDesc':
                        await Board.updateOne({ _id: boardId, 'taskLists.tasks.id': taskId }, { $set: { ['taskLists.$.tasks.' + taskIdx + '.taskId']: objSave.taskId } })
                        break;
                    case 'setChecklists':
                        await Board.updateOne({ _id: boardId, 'taskLists.tasks.id': taskId }, { $set: { ['taskLists.$.tasks.' + taskIdx + '.taskId']: objSave.taskId } })
                        break;
                    case 'setMsgs':
                        await Board.updateOne({ _id: boardId, 'taskLists.tasks.id': taskId }, { $set: { ['taskLists.$.tasks.' + taskIdx + '.taskId']: objSave.taskId } })
                        break;
                }
            }
            break
    }
    emitter.emit('sendSocket' + data.socketId, { data, boardId })
    return true
}


module.exports = {
    getById,
    query,
    remove,
    add,
    save,
    changeData
}


