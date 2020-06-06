
const emitter = require('../../services/emitter.service');
const mongoose = require("mongoose");

const Board = mongoose.model("Board");

const getById = async (id) => {
    const boardId = id.split('-')[0];
    return Board.findById(boardId);
}

const query = async (userId) => {
    let criteria = {
        $or: [
            { public: true },
            { 'users._id': userId }
        ]
    }

    const boards = await Board.find(criteria);
    return boards.map(board => {
        const onUser = (userId && board.users.findIndex(user => user._id === userId) !== -1)
        const taskLists = board.taskLists.length
        const tasks = board.taskLists.reduce((acc, taskList) => acc + taskList.tasks.length, 0)

        return {
            _id: board._id,
            title: board.title,
            background: board.style.background,
            onUser,
            isAddMembers: false,
            taskLists,
            tasks
        }
    })
}

const remove = async (boardId) => {

    // const boardId = id.split('-')[0];
    // await collection.deleteOne({ "_id": ObjectId(boardId) })

}


const add = async (wrapper) => {
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
    const board = await Board.insertMany([newBoard])
    return board[0];
}

const save = async (board) => {

    Board.replaceOne({ _id: board._id }, board)
    return board;
}

//!!!!
const changeData = async (boardId, objData) => {
    switch (objData.type) {
        case 'changeTitleBoard':
            await Board.updateOne({ _id: boardId }, { $set: { title: objData.title } })
            break;
        case 'removeTaskList':
            console.log('removeTaskList');
            await Board.updateOne({ _id: boardId }, { $pull: { taskLists: { id: objData.taskListId } } })
            break;
        case 'moveList':
            {
                const { oldIndex, newIndex } = objData
                const board = await Board.findById(boardId)
                const list = board.taskLists.splice(oldIndex, 1)[0]
                board.taskLists.splice(newIndex, 0, list)
                await Board.updateOne({ _id: boardId }, { $set: { taskLists: board.taskLists } })
            }
            break;
        case 'moveTask':
            {
                const { idMoveFrom, idMoveTo, oldIndex, newIndex } = objData;
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
                const { task, taskListId } = objData;
                await Board.updateOne({ _id: boardId, 'taskLists.id': taskListId }, { $push: { 'taskLists.$.tasks': task } })
            }
            break;
        case 'addList':
            {
                const { newList } = objData;
                await Board.updateOne({ _id: boardId }, { $push: { taskLists: newList } })
            }
            break;
        case 'setListTitle':
            {
                const { taskListId, title } = objData;
                await Board.updateOne({ _id: boardId, 'taskLists.id': taskListId }, { $set: { 'taskLists.$.title': title } })
            }
            break;
        case 'removeTask':
            {
                const { taskId } = objData;
                await Board.updateOne({ _id: boardId, 'taskLists.tasks.id': taskId }, { $pull: { 'taskLists.$.tasks': { id: taskId } } });
            }
            break;
        case 'saveUsersBoard':
            {
                const { users } = objData;
                await Board.updateOne({ _id: boardId }, { $set: { 'users': users } })
            }
            break;
        case 'setPublic':
            {
                const { isPublic } = objData;
                await Board.updateOne({ _id: boardId }, { $set: { 'public': isPublic } })
            }
            break;
        case 'setBackground':
            {
                const { newBackground } = objData;
                await Board.updateOne({ _id: boardId }, { $set: { 'style.background': newBackground } })
            }
            break;
        case 'saveTask':
            {
                const { objSave } = objData
                const { taskId, type } = objSave
                let boards = await Board.find({ _id: boardId, 'taskLists.tasks.id': taskId }, { 'taskLists.tasks.$': true })
                const taskIdx = boards[0].taskLists[0].tasks.findIndex(task => task.id === taskId)
                let name, dataChange;
                switch (type) {
                    case 'setTitle':
                        name = 'title';
                        dataChange = objSave.title;
                        break;
                    case 'setDueDate':
                        name = 'dueDate';
                        dataChange = objSave.dueDate;
                        break;
                    case 'setLabel':
                        name = 'labels';
                        dataChange = objSave.labels;
                        break;
                    case 'attachments':
                        name = 'attachments';
                        dataChange = objSave.attachments;
                        break;
                    case 'editDesc':
                        name = 'desc';
                        dataChange = objSave.desc;
                        break;
                    case 'setChecklists':
                        name = 'checklists';
                        dataChange = objSave.checklists;
                        break;
                    case 'setMsgs':
                        name = 'msgs';
                        dataChange = objSave.msgs;
                        break;
                    case 'addMember':
                        name = 'members';
                        dataChange = objSave.users;
                        break;
                    case 'setCover':
                        name = 'cover';
                        dataChange = objSave.cover;
                        break;
                }
                await Board.updateOne({ _id: boardId, 'taskLists.tasks.id': taskId }, { $set: { [`taskLists.$.tasks.${taskIdx}.${name}`]: dataChange } })
            }
            break
    }
    emitter.emit('sendSocket' + objData.socketId, { objData })
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


