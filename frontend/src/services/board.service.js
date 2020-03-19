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
// function getEmptyCreterea() {
//     return {
//         name: '',
//         inStock: '',
//         type: '',
//         _sort: '',
//         _order: 'asc'
//     }
// }
// function getEmptyBoard() {
//     return {
//         name: '',
//         price: 0,
//         type: '',
//         img: '',
//         inStock: false
//     }
// }

// async function save(board) {
//     let prm;
//     if (board._id) prm = httpService.put(`board/${board._id}`, board);
//     else {
//         board.createdAt = new Date();
//         prm = httpService.post('board', board);
//     }
//     return await prm;
// }