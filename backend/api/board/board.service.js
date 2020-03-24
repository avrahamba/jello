
const emitter = require('../../services/emitter.service');
const mongoose = require("mongoose");
const User = mongoose.model("User");
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
    console.log('boards', boards);


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
    // const user = wrapper.user;
    // const prefs = wrapper.prefs
    // const miniUser = {
    //     _id: user._id,
    //     name: user.name,
    //     email: user.email
    // }

    // const newBoard = {
    //     title: prefs.title,
    //     users: [miniUser],
    //     taskLists: [],
    //     style: { background: prefs.style.background },
    //     public: prefs.public

    // }
    // const collection = await dbService.getCollection('board')
    // try {
    //     await collection.insertOne(newBoard);
    //     return newBoard;
    // } catch (err) {
    //     console.log(`ERROR: Cannot add new board `)
    //     throw err;
    // }
}

async function save(board) {
    // board._id = ObjectId(board._id);
    // const collection = await dbService.getCollection('board')
    // try {
    //     await collection.replaceOne({ _id: board._id }, board);
    //     return board;
    // } catch (err) {
    //     console.log(`ERROR: cannot insert user`)
    //     throw err;
    // }
}


async function changeData(boardId, data) {
    // const collection = await dbService.getCollection('board')
    // try {
    //     const board = await collection.findOne({ "_id": ObjectId(boardId) })

    //     switch (data.type) {
    //         case 'changeTitleBoard':
    //             board.title = data.title
    //             break;
    //         case 'removeTaskList':
    //             {
    //                 const ListIdx = board.taskLists.findIndex(list => list.id === data.taskListId);
    //                 if (ListIdx !== -1) board.taskLists.splice(ListIdx, 1);
    //             }
    //             break;
    //         case 'moveList':
    //             {
    //                 const { oldIndex, newIndex } = data
    //                 const list = board.taskLists.splice(oldIndex, 1)[0]
    //                 board.taskLists.splice(newIndex, 0, list)
    //             }
    //             break;
    //         case 'moveTask':
    //             {
    //                 const { idMoveFrom, idMoveTo, oldIndex, newIndex } = data;
    //                 const oldListIdx = board.taskLists.findIndex(list => list.id === idMoveFrom);
    //                 const newListIdx = board.taskLists.findIndex(list => list.id === idMoveTo);
    //                 const task = board.taskLists[oldListIdx].tasks.splice(oldIndex, 1)[0]
    //                 board.taskLists[newListIdx].tasks.splice(newIndex, 0, task)
    //             }
    //             break;
    //         case 'addTask':
    //             {
    //                 const { task, taskListId } = data;
    //                 const listIdx = board.taskLists.findIndex(list => list.id === taskListId);
    //                 board.taskLists[listIdx].tasks.push(task)
    //             }
    //             break;
    //         case 'addList':
    //             {
    //                 const { newList } = data;
    //                 board.taskLists.push(newList)
    //             }
    //             break;
    //         case 'setListTitle':
    //             {
    //                 const { taskListId, title } = data;
    //                 const listIdx = board.taskLists.findIndex(list => list.id === taskListId);
    //                 board.taskLists[listIdx].title = title
    //             }
    //             break;
    //         case 'removeTask':
    //             {
    //                 const { taskId } = data;
    //                 let taskIdx
    //                 const tasklistIdx = board.taskLists.findIndex(list => {
    //                     taskIdx = list.tasks.findIndex(task => task.id === taskId)
    //                     if (taskIdx !== -1) return true
    //                     return false
    //                 });
    //                 board.taskLists[tasklistIdx].tasks.splice(taskIdx, 1)
    //             }
    //             break;
    //         case 'saveTask':
    //             {
    //                 const { objSave } = data
    //                 const { taskId, type } = objSave
    //                 let taskIdx;
    //                 const taskListIdx = board.taskLists.findIndex(tl => {
    //                     const findTask = tl.tasks.findIndex(task => task.id === taskId)
    //                     if (findTask === -1) return false
    //                     taskIdx = findTask
    //                     return true
    //                 })
    //                 const task = board.taskLists[taskListIdx].tasks[taskIdx]
    //                 switch (type) {
    //                     case 'setTitle':
    //                         task.title = objSave.title
    //                         break;
    //                     case 'setDueDate':
    //                         task.dueDate = objSave.dueDate
    //                         break;
    //                     case 'setLabel':
    //                         task.labels = objSave.labels
    //                         break;
    //                     case 'attachments':
    //                         task.attachments = objSave.attachments
    //                         break;
    //                     case 'editDesc':
    //                         task.desc = objSave.desc
    //                         break;
    //                     case 'setChecklists':
    //                         task.checklists = objSave.checklists
    //                         break;
    //                     case 'setMsgs':
    //                         task.msgs = objSave.msgs
    //                         break;
    //                 }
    //                 board.taskLists[taskListIdx].tasks.splice(taskIdx, 1, task)
    //             }
    //             break
    //     }

    //     await collection.replaceOne({ _id: ObjectId(boardId) }, board);
    //     emitter.emit('sendSocket' + data.socketId, { data, boardId })
    //     return board
    // }

    // catch (err) {
    //     console.log('ERROR: cannot find boards')
    //     throw err;
    // }
}


module.exports = {
    getById,
    query,
    remove,
    add,
    save,
    changeData
}


