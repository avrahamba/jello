
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy)
    
    const collection = await dbService.getCollection('board')
    console.log('test');
    try {
        const boards = await collection.find(criteria).toArray();

        return boards
    } catch (err) {
        console.log('ERROR: cannot find boards')
        throw err;
    }
}

async function remove(boardId) {
    const collection = await dbService.getCollection('board')
    try {
        await collection.deleteOne({"_id":ObjectId(boardId)})
    } catch (err) {
        console.log(`ERROR: cannot remove board ${boardId}`)
        throw err;
    }
}


async function add(board) {
    board.byUserId = ObjectId(board.byUserId);
    board.aboutUserId = ObjectId(board.aboutUserId);

    const collection = await dbService.getCollection('board')
    try {
        await collection.insertOne(board);
        return board;
    } catch (err) {
        console.log(`ERROR: cannot insert user`)
        throw err;
    }
}

function _buildCriteria(filterBy) {
    const criteria = {};
    return criteria;
}

module.exports = {
    query,
    remove,
    add
}


