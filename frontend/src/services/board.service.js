import httpService from './HttpService';

export const boardService = {
    // query,
    getById,
    remove,
    // save,
    // getEmptyCreterea,
    // getEmptyBoard
}

// function query(boardId) {
//     return httpService.get(`board/${boardId}`);
// }
// function getById(id) {
//     return httpService.get(`board/${id}`);
// }
// function remove(id) {
//     return httpService.delete(`board/${id}`);
// }




const fs = require('fs');

var gBoards = _createBoards();


function query() {
    return Promise.resolve(gBoards);
}

function getById(boardId) {
    const board = gBoards.find(board => board._id === boardId)
    return Promise.resolve(board)
}

function remove(boardId) {
    const boardIdx = gBoards.findIndex(board => board._id === boardId)
    gBoards.splice(boardIdx, 1);
    _saveBoardsToFile()
    return Promise.resolve()
}

function save(board) {
    if (board._id) {
        board.updatedAt = Date.now()

        const boardIdx = gBoards.findIndex(currBug => currBug._id === board._id)
        if (boardIdx === -1) throw new Error('Bug not found')
        gBoards.splice(boardIdx, 1, board);
    } else {
        board._id = _makeId()
        board.createdAt = Date.now()
        gBoards.push(board)
    }
    _saveBoardsToFile()
    return Promise.resolve(board)
}


module.exports = {
    query,
    getById,
    save,
    remove
}

function _makeId(length = 3) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function _saveBoardsToFile() {
    fs.writeFileSync('data/board.json', JSON.stringify(gBoards, null, 2));
}


