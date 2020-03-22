import httpService from './HttpService';

export const boardService = {
    query,
    getById,
    removeBoard,
    save,
    getEmptyList,
    getEmptyTask,
    addBoard
}

async function query(userId) {
    return httpService.get(`board/${userId}`);
}
function getById(id) {
    return httpService.get(`board/id/${id}`);
}
async function save(board) {
    let prm;

    if (board._id) prm = httpService.put(`board/id/${board._id}`, board);
    else {
        board.createdAt = new Date();
        prm = httpService.post('board', board);
    }
    return await prm;
}

function removeBoard(id) {
    return httpService.delete(`board/${id}`);
}

function getEmptyTask(id) {
    if (id) id += '-' + _makeId()
    // else id = _makeId()
    return {
        id,
        title: "",
        dueDate: [],
        desc: "",
        labels: [],
        cover: {},
        attachments: [],
        checklists: [],
        members: [],
        msgs: [],
        dueDate: []
    }
}

function getEmptyList(id) {
    if (id) id += '-' + _makeId()
    // else id = _makeId()
    return {
        id,
        title: "",
        tasks: []
    }
}

function addBoard(user, prefs) {
    var wrapper = { user, prefs }

    return httpService.post(`board/`, wrapper);
}

function _makeId(length = 7) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}
