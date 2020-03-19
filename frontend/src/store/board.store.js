import { boardService } from '../services/board.service';
import { userService } from '../services/UserService';

export const boardStore = {
    state: {
        board: null,
        currTask: null
    },
    mutations: {
        //* Board Mutations
        setBoard(state, { board }) {
            state.board = board;
        },
        //* List Mutations
        addList(state, { list }) {
            state.board.taskLists.unshift(list);
        },
        saveList(state, { list }) {
            const ListIdx = state.board.taskLists.findIndex(list => list.id === taskObj.listId);
            if (idx !== -1) state.board.taskLists[ListIdx].splice(ListIdx, 1, list);
        },
        removeList(state, listId) {
            const ListIdx = state.board.taskLists.findIndex(list => list.id === taskObj.listId);
            if (idx !== -1) state.board.taskLists[ListIdx].splice(ListIdx, 1);
        },

        //* Task Mutations
        addTask(state, { taskObj }) {
            const ListIdx = state.board.taskLists.findIndex(list => list.id === taskObj.listId);
            state.board.taskLists[ListIdx].unshift(taskObj.task)
        },
        saveTask(state, { taskObj }) {
            const ListIdx = state.board.taskLists.findIndex(list => list.id === taskObj.listId);
            const taskIdx = state.board.taskLists[ListIdx].findIndex(task => task.id === taskObj.taskId);
            if (taskIdx !== -1 || ListIdx !== -1) state.board.taskLists[ListIdx].splice(taskIdx, 1, taskObj.task);;
        },
        removeTask(state, taskObj) {
            const ListIdx = state.board.taskLists.findIndex(list => list.id === taskObj.listId);
            const taskIdx = state.board.taskLists[ListIdx].findIndex(task => task.id === taskObj.taskId);
            if (taskIdx !== -1 || ListIdx !== -1) state.board.taskLists[ListIdx].splice(taskIdx, 1);
        },
        setCurrTask(state, taskObj) {
            const ListIdx = state.board.taskLists.findIndex(list => list.id === taskObj.listId);
            const taskIdx = state.board.taskLists[ListIdx].findIndex(task => task.id === taskObj.taskId);
            const task = state.board.taskLists[ListIdx].tasks[taskIdx]
            state.currTask = task;
        }
    },
    getters: {
        currBoard(state) {
            return state.currBoard;
        },
        currTask(state) {
            return state.currTask;
        }
    },
    actions: {
        //* Board Actions
        async getBoard(context, { boardId }) {
            const boardCopy = JSON.parse(JSON.stringify(context.state.board));
            try {
                const board = await boardService.getById(boardId);
                context.commit('setBoard', board);
                return board;
            }
            catch{
                context.commit('setBoard', boardCopy);
            }
        },

        //* List Actions
        async saveList(context, { list }) {
            const boardCopy = JSON.parse(JSON.stringify(context.state.board));
            try {
                context.commit('saveList', list);
                const res = await boardService.save(context.state.board);
                return res
            }
            catch{
                context.commit('setBoard', boardCopy);
            }
        },

        async addList(context) {
            const boardCopy = JSON.parse(JSON.stringify(context.state.board));
            const newList = boardService.getEmptyList();
            try {
                context.commit('addList', newList);
                const res = await boardService.save(context.state.board);
                return res

            }
            catch{
                context.commit('setBoard', boardCopy);
            }
        },

        async removeList(context, { listId }) {
            const boardCopy = JSON.parse(JSON.stringify(context.state.board));
            try {
                context.commit('removeList', listId);
                const res = await boardService.save(context.state.board);
                return res

            }
            catch{
                context.commit('setBoard', boardCopy);
            }
        },

        //*Task ACtions
        async getTask(context, { taskObj }) {
            const boardCopy = JSON.parse(JSON.stringify(context.state.board));
            try {
                context.commit('setCurrToy', taskObj);
                //TODO: ask aviv what about returning an object after get action ! return task ?

            }
            catch{
                context.commit('setBoard', boardCopy);
            }

        },

        async saveTask(context, { taskObj }) {
            const boardCopy = JSON.parse(JSON.stringify(context.state.board));
            try {
                context.commit('saveTask', taskObj);
                const res = await boardService.save(context.state.board);
                return res
            }
            catch{
                context.commit('setBoard', boardCopy);
            }
        },

        async addTask(context, { listID }) {
            const boardCopy = JSON.parse(JSON.stringify(context.state.board));
            const emptyTask = boardService.getEmptyTask();
            const taskObj = { emptyTask, listID }

            try {
                context.commit('addTask', taskObj);
                const res = await boardService.save(context.state.board);
                return res
            }
            catch{
                context.commit('setBoard', boardCopy);
            }
        },
        async removeTask(context, { taskObj }) {
            const boardCopy = JSON.parse(JSON.stringify(context.state.board));
            try {
                //remove the task from the local board(not copy) 
                context.commit('removeTask', taskObj);
                const res = await boardService.save(context.state.board);
                return res
            }
            catch{
                context.commit('setBoard', boardCopy);
            }
        },
    }
}   