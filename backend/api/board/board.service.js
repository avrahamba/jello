
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
                onUser,
                isAddMembers:false
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


async function changeData(boardId, data){
    const collection = await dbService.getCollection('board')
    try {
        const board = await collection.findOne({ "_id": ObjectId(boardId) })
        

        switch (data.type){
            case 'changeTitleBoard':
                board.title = data.title
                break;
        }
        await collection.replaceOne({ _id: ObjectId(boardId) }, board);
        emitter.emit('sendSocket',{data,boardId})
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


