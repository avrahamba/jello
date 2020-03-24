
const dbService = require('../../services/db.service')
const emitter = require('../../services/emitter.service');
const ObjectId = require('mongodb').ObjectId

async function getById(id) {
    const collection = await dbService.getCollection('board')
    try {
        const boardId = id.split('-');

        const board = await collection.findOne({ "_id": ObjectId(boardId[0]) })
        return board
    } catch (err) {
        console.log('ERROR: cannot find boards')
        throw err;
    }
}
async function query(userId) {
    let criteria = {
        $or: [
            { public: true },
            { 'users._id': userId }
        ]
    }
    const collection = await dbService.getCollection('board')
    try {
        const boards = await collection.find(criteria).toArray();

        return boards.map(board => {
            const onUser = (userId && board.users.findIndex(user => user._id === userId) !== -1)

            return {
                _id: board._id,
                title: board.title,
                background: board.style.background,
                onUser
            }
        })
    } catch (err) {
        console.log('ERROR: cannot find boards')
        throw err;
    }
}

async function remove(boardId) {
    const collection = await dbService.getCollection('board')
    try {
        await collection.deleteOne({ "_id": ObjectId(boardId) })
    } catch (err) {
        console.log(`ERROR: cannot remove board ${boardId}`)
        throw err;
    }
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
    const collection = await dbService.getCollection('board')
    try {
        await collection.insertOne(newBoard);
        return newBoard;
    } catch (err) {
        console.log(`ERROR: Cannot add new board `)
        throw err;
    }
}

async function save(board) {
    board._id = ObjectId(board._id);
    const collection = await dbService.getCollection('board')
    try {
        await collection.replaceOne({ _id: board._id }, board);
        return board;
    } catch (err) {
        console.log(`ERROR: cannot insert user`)
        throw err;
    }
}


async function changeData(boardId, data) {
    const collection = await dbService.getCollection('board')
    try {
        const board = await collection.findOne({ "_id": ObjectId(boardId) })

        switch (data.type) {
            case 'changeTitleBoard':
                board.title = data.title
                break;
            case 'removeTaskList':
                {
                    const ListIdx = board.taskLists.findIndex(list => list.id === data.taskListId);
                    if (ListIdx !== -1) board.taskLists.splice(ListIdx, 1);
                }
                break;
            case 'moveList':
                {
                    const { oldIndex, newIndex } = data
                    const list = board.taskLists.splice(oldIndex,1)[0]
                    board.taskLists.splice(newIndex, 0, list)
                }
                break;
            case 'moveTask':
                {
                    const { idMoveFrom, idMoveTo, oldIndex, newIndex } = data;
                    const oldListIdx = board.taskLists.findIndex(list => list.id === idMoveFrom);
                    const newListIdx = board.taskLists.findIndex(list => list.id === idMoveTo);
                    const task = board.taskLists[oldListIdx].tasks.splice(oldIndex,1)[0]
                    board.taskLists[newListIdx].tasks.splice(newIndex, 0, task)
                }
                break;
            case 'addTask':
                {
                    const { task, taskListId } = data;
                    const listIdx = board.taskLists.findIndex(list => list.id === taskListId);
                    board.taskLists[listIdx].tasks.push(task)
                }
                break;
        }
        
        await collection.replaceOne({ _id: ObjectId(boardId) }, board);
        emitter.emit('sendSocket', { data, boardId })
        return board
    }

    catch (err) {
        console.log('ERROR: cannot find boards')
        throw err;
    }
}




function _buildCriteria(filterBy) {
    const criteria = {};
    return criteria;
}

module.exports = {
    getById,
    query,
    remove,
    add,
    save,
    changeData
}


