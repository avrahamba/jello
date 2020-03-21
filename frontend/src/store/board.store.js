import { boardService } from '../services/board.service';
import { userService } from '../services/UserService';

export const boardStore = {
    state: {
        board: null,
        currTask: null
    },
    mutations: {
        //* Board Mutations
        setBoard(state, board) {
            state.board = board;
        },
        //* List Mutations
        addList(state, list) {
            state.board.taskLists.push(list);
        },
        saveList(state, list) {
            const ListIdx = state.board.taskLists.findIndex(list => list.id === taskObj.taskListId);
            if (ListIdx !== -1) state.board.taskLists.splice(ListIdx, 1, list);
        },
        //!work
        removeList(state, taskListId) {
            const ListIdx = state.board.taskLists.findIndex(list => list.id === taskListId);
            if (ListIdx !== -1) state.board.taskLists.splice(ListIdx, 1);

        },

        //* Task Mutations
        addTask(state, taskObj) {
            const ListIdx = state.board.taskLists.findIndex(list => list.id === taskObj.taskListId);
            state.board.taskLists[ListIdx].tasks.push(taskObj.task)
        },
        saveTask(state, taskObj) {
            const ListIdx = state.board.taskLists.findIndex(list => list.id === taskObj.taskListId);
            const taskIdx = state.board.taskLists[ListIdx].tasks.findIndex(task => task.id === taskObj.taskToSave.id);
            if (taskIdx !== -1 && ListIdx !== -1) state.board.taskLists[ListIdx].tasks.splice(taskIdx, 1, taskObj.taskToSave);
        },
        removeTask(state, taskObj) {
            const ListIdx = state.board.taskLists.findIndex(list => list.id === taskObj.taskListId);
            const taskIdx = state.board.taskLists[ListIdx].tasks.findIndex(task => task.id === taskObj.taskId);
            if (taskIdx !== -1 && ListIdx !== -1) state.board.taskLists[ListIdx].splice(taskIdx, 1);
        },
        setCurrTask(state, taskObj) {
            const ListIdx = state.board.taskLists.findIndex(list => list.id === taskObj.taskListId);
            const taskIdx = state.board.taskLists[ListIdx].tasks.findIndex(task => task.id === taskObj.taskId);
            const task = state.board.taskLists[ListIdx].tasks[taskIdx]
            state.currTask = task;

        }
    },
    getters: {
        currBoard(state) {
            return state.currBoard;
        },
        board(state) {
            return state.board;
        },
        currTask(state) {
            return JSON.parse(JSON.stringify(state.currTask));

        }
    },
    actions: {
        //* Board Actions
        //!work
        async getBoards(context, { userId }) {
            try {
                const boards = await boardService.query(userId);
                return boards;
            }
            catch{
                console.log('im in catch of getboards');

                // context.commit('setBoard', boardCopy);
            }
        },
        //!work
        async getBoard(context, { boardId }) {
            try {
                const board = await boardService.getById(boardId);
                context.commit('setBoard', board);
                return board;
            }
            catch{
                return null
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
        //!work
        async addList(context) {
            const boardCopy = JSON.parse(JSON.stringify(context.state.board));
            const newList = boardService.getEmptyList(context.state.board._id);
            try {
                context.commit('addList', newList);
                const res = await boardService.save(context.state.board);
                return res

            }
            catch{
                context.commit('setBoard', boardCopy);
            }
        },
        //!work
        async removeList(context, { listId }) {
            const boardCopy = JSON.parse(JSON.stringify(context.state.board));
            try {
                context.commit('removeList', listId);
                console.log(context.state.board);


                const res = await boardService.save(context.state.board);
                return res

            }
            catch{
                context.commit('setBoard', boardCopy);
            }
        },

        //*Task ACtions
        async getTask(context, { taskId, taskListId, boardId }) {
            // taskObj = taskId + 
            const boardCopy = JSON.parse(JSON.stringify(context.state.board));
            const taskObj = { taskId, taskListId, boardId }

            try {
                context.commit('setCurrTask', taskObj);
                const board = await boardService.getById(boardId);
                const ListIdx = board.taskLists.findIndex(
                    list => list.id === taskListId
                );
                const taskIdx = board.taskLists[ListIdx].tasks.findIndex(
                    task => task.id === taskId
                );
                return board.taskLists[ListIdx].tasks[taskIdx];


            }
            catch{
                context.commit('setBoard', boardCopy);
            }

        },

        async saveTask(context, { taskListId, boardId, taskToSave }) {
            const boardCopy = JSON.parse(JSON.stringify(context.state.board));
            const taskObj = { taskListId, boardId, taskToSave }

            try {
                context.commit('saveTask', taskObj);
                const board = await boardService.save(context.state.board);
                return board
            }
            catch{
                context.commit('setBoard', boardCopy);
            }
        },
        //!work
        async addTask(context, { taskListId, newTask }) {
            const boardCopy = JSON.parse(JSON.stringify(context.state.board));
            const task = boardService.getEmptyTask(taskListId);
            task.title = newTask.title
            const taskObj = { task, taskListId }

            try {
                context.commit('addTask', taskObj);
                const res = await boardService.save(context.state.board);
                return res
            }
            catch{
                context.commit('setBoard', boardCopy);
            }
        },
        async removeTask(context, { taskId, taskListId, boardId }) {
            // taskObj = taskListId + taskId
            const boardCopy = JSON.parse(JSON.stringify(context.state.board));
            const taskObj = { taskId, taskListId, boardId }
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
        async moveList(context,{oldIndex,newIndex}){
            const boardCopy = JSON.parse(JSON.stringify(context.state.board));
            const moveObj = {oldIndex,newIndex}
            try {

            }catch{
                
            }
        }
    }
}   