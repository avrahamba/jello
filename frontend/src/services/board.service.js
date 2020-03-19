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
function getById(id) {
    return httpService.get(`board/${id}`);
}
function remove(id) {
    return httpService.delete(`board/${id}`);
}



