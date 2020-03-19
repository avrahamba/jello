import httpService from './HttpService';

export const boardService = {
    // query,
    getById,
    removeBoard,
    save,
    getEmptyList,
    getEmptyTask,
    getEmptyBoard
}

// function query(boardId) {
//     return httpService.get(`board/${boardId}`);
// }
function getById(id) {
    return httpService.get(`board/${id}`);
}
function removeBoard(id) {
    return httpService.delete(`board/${id}`);
}

function getEmptyTask() {
    return {
        id: "",
        title: "",
        desc: "",
        labels: [],
        cover: {},
        atachment: [],
        checklists: [],
        members: [],
        msgs: []
    }
}

function getEmptyList() {
    return {
        id: "",
        title: "",
        tasks: []
    }
}

function getEmptyBoard() {
    return {
        id: "",
        title: "",
        background: ""
    }
}

async function save(board) {
    let prm;
    //  if (board._id) prm = httpService.put(`board/${board._id}`, board);
    //  else {
    //     board.createdAt = new Date();
    prm = httpService.post('board', board);

    return await prm;
}
