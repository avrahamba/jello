import httpService from './HttpService';
import { utilsServie } from './utils.service';
import { socketService } from './SocketService';


export const boardService = {
    query,
    getById,
    removeBoard,
    save,
    getEmptyList,
    getEmptyTask,
    addBoard,
    putData
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
    if (id) id += '-' + utilsServie.makeId()
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
    if (id) id += '-' + utilsServie.makeId()
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

async function putData(boardId, objData) {
    objData.socketId = socketService.getSocketId()
    return httpService.put(`board/data/${boardId}`, objData);
}