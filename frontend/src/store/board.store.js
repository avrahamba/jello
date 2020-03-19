import { boardService } from '../services/board.service';
import { userService } from '../services/UserService';

export const boardStore = {
    state: {
        currBoard: null,
    },
    mutations: {
        setCurrBoard(state, board) {
            state.currBoard = board;
        },
        addBoard(state, { board }) {
            state.boards.unshift(board);
        },
        editBoard(state, { board }) {
            const idx = state.boards.findIndex(currBoard => currBoard._id === board._id);
            state.boards.splice(idx, 1, board);
        },
        removeBoard(state, boardId) {
            const idx = state.boards.findIndex(board => board._id === boardId);
            if (idx !== -1) state.boards.splice(idx, 1);
        }
    },
    getters: {
        currBoard(state) {
            return state.currBoard;
        }
    },
    actions: {
        async getBoard(context, { boardId }) {
            const board = await boardService.getById(boardId);
            context.commit('setCurrBoard', board);
            return board;
        },
        async saveBoard(context, { board }) {
            const isEdit = !!board._id;
            const savedBoard = await boardService.save(board);
            context.commit({
                type: (isEdit) ? 'editBoard' : 'addBoard',
                board: savedBoard
            });
        },
        async removeBoard(context, { boardId }) {
            const res = await boardService.remove(boardId);
            if (!res.failed) context.commit('removeBoard', boardId);
        }
    }
}   