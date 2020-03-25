import httpService from './HttpService';
import { utilsServie } from './utils.service';
import { socketService } from './SocketService';



const query = async (userId) => {
    return httpService.get(`board/${userId}`);
}
const getById = (id) => {
    return httpService.get(`board/id/${id}`);
}
const save = async (board) => {
    let prm;
    if (board._id) prm = httpService.put(`board/id/${board._id}`, board);
    else {
        board.createdAt = new Date();
        prm = httpService.post('board', board);
    }
    return await prm;
}

const removeBoard = (id) => {
    return httpService.delete(`board/${id}`);
}

const getEmptyTask = (id) => {
    if (id) id += '-' + utilsServie.makeId()
    return {
        id,
        title: "",
        dueDate: [],
        desc: "",
        labels: [],
        cover: {
            url:''
        },
        attachments: [],
        checklists: [],
        members: [],
        msgs: [],
        dueDate: []
    }
}

const getEmptyList = (id) => {
    if (id) id += '-' + utilsServie.makeId()
    return {
        id,
        title: "",
        tasks: []
    }
}

const addBoard = (user, prefs) => {
    var wrapper = { user, prefs }

    return httpService.post(`board/`, wrapper);
}

const putData = async (boardId, objData) => {
    objData.socketId = socketService.getSocketId()
    return httpService.put(`board/data/${boardId}`, objData);
}

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
