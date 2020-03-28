import { boardService } from '../services/board.service';
import { userService } from '../services/UserService';

export const boardStore = {
    state: {
        board: null,
        currTask: null,
        currList: null
    },
    mutations: {
        //* Board Mutations
        setBoard(state, board) {
            state.board = board;
        },
        //* List Mutations
        addList(state, list) {
            list.isNew = true
            state.board.taskLists.push(list);
        },
        //* List Mutations
        endAddList(state, list) {
            delete list.isNew
            state.board.taskLists.splice(-1, list);
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
        saveTask(state, objSave) {
            const { taskId, type } = objSave
            let taskIdx;
            const taskListIdx = state.board.taskLists.findIndex(tl => {
                const findTask = tl.tasks.findIndex(task => task.id === taskId)
                if (findTask === -1) return false
                taskIdx = findTask
                return true
            })
            const task = state.board.taskLists[taskListIdx].tasks[taskIdx]
            switch (type) {
                case 'setTitle':
                    task.title = objSave.title
                    break;
                case 'setDueDate':
                    task.dueDate = objSave.dueDate
                    break;
                case 'setLabel':
                    task.labels = objSave.labels
                    break;
                case 'attachments':
                    task.attachments = objSave.attachments
                    break;
                case 'editDesc':
                    task.desc = objSave.desc
                    break;
                case 'setChecklists':
                    task.checklists = objSave.checklists
                    break;
                case 'setMsgs':
                    task.msgs = objSave.msgs
                    break;
                case 'addMember':
                    task.members = objSave.users
                    break;
            }
            if (state.currTask.id === task.id) state.currTask = task
            state.board.taskLists[taskListIdx].tasks.splice(taskIdx, 1, task)
        },
        removeTask(state, taskId) {
            let taskIdx;
            const taskListIdx = state.board.taskLists.findIndex(tl => {
                const findTask = tl.tasks.findIndex(task => task.id === taskId)
                if (findTask === -1) return false
                taskIdx = findTask
                return true
            })

            state.board.taskLists[taskListIdx].tasks.splice(taskIdx, 1);
        },
        setCurrTask(state, { taskId }) {
            let task;
            state.currList = state.board.taskLists.find(tl => {
                const findTask = tl.tasks.find(task => task.id === taskId)
                if (findTask) {
                    task = findTask;
                    return true
                }
            })
            state.currTask = task;
        },
        moveList(state, { newIndex, oldIndex }) {
            const list = state.board.taskLists.splice(oldIndex, 1)[0]
            state.board.taskLists.splice(newIndex, 0, list)
        },
        removeChangeMoveList(state, { oldIndex, newIndex }) {
            const list1 = state.board.taskLists[oldIndex]
            const list2 = state.board.taskLists[newIndex]
            state.board.taskLists.splice(oldIndex, 1, list2)
            state.board.taskLists.splice(newIndex, 1, list1)
        },
        removeChangeMoveTask(state, { idMoveFrom, idMoveTo, oldIndex, newIndex }) {
            const listFrom = state.board.taskLists.find(tl => tl.id === idMoveFrom)
            const listTo = state.board.taskLists.find(tl => tl.id === idMoveTo)
            const taskMove = listTo.tasks[newIndex]
            listFrom.tasks.splice(oldIndex, 0, taskMove)
            listTo.tasks.splice(newIndex, 1)
        },
        moveTask(state, { idMoveFrom, idMoveTo, oldIndex, newIndex }) {


            const oldListIdx = state.board.taskLists.findIndex(list => list.id === idMoveFrom);
            const newListIdx = state.board.taskLists.findIndex(list => list.id === idMoveTo);
            const task = state.board.taskLists[oldListIdx].tasks.splice(oldIndex, 1)[0]
            state.board.taskLists[newListIdx].tasks.splice(newIndex, 0, task)
        },
        setListTitle(state, { taskListId, title }) {
            const list = state.board.taskLists.find(tl => tl.id === taskListId)
            list.title = title
        },
        changeTask(state, newTask) {
            let taskIdx;
            const currList = state.board.taskLists.find(tl => {
                const findTaskIdx = tl.tasks.findIndex(task => task.id === newTask.id)
                if (findTaskIdx !== -1) {
                    taskIdx = findTaskIdx;
                    return true
                }
            })
            currList.tasks.splice(taskIdx, 1, newTask)
        },
        changeTitleBoard(state, title) {
            state.board.title = title
        },
        saveUsersBoard(state, { users }) {
            state.board.users = users
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
            return state.currTask;
        },
        currList(state) {
            return JSON.parse(JSON.stringify(state.currList));
        },
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
        async addBoard(context, { user, prefs }) {
            try {
                const board = await boardService.addBoard(user, prefs);
                context.commit('setBoard', board);
                return board;
            }
            catch{
                return null
            }
        },
        //* Board Actions
        async saveBoard(context, { updatedBoard }) {
            const boardCopy = JSON.parse(JSON.stringify(context.state.board));
            try {
                context.commit('setBoard', updatedBoard);
                const res = await boardService.save(context.state.board);
                return res
            }
            catch{
                context.commit('setBoard', boardCopy);
            }
        },
        //* List Actions
        async saveList(context, { list }) {
            const boardCopy = JSON.parse(JSON.stringify(context.state.board));
            try {
                context.commit('setBoard', updatedBoard);
                const res = await boardService.save(context.state.board);
                return res
            }
            catch{
                context.commit('setBoard', boardCopy);
            }
        },
        //!work with put data
        async addList(context) {
            const boardCopy = JSON.parse(JSON.stringify(context.state.board));
            const newList = boardService.getEmptyList(context.state.board._id);
            try {

                context.commit('addList', newList);
                const res = await boardService.putData(context.state.board._id, { type: 'addList', newList })
                return res

            }
            catch{
                context.commit('setBoard', boardCopy);
            }
        },
        //!work with put data
        async removeList(context, { taskListId }) {
            const boardCopy = JSON.parse(JSON.stringify(context.state.board));
            try {
                context.commit('removeList', taskListId);
                const res = await boardService.putData(context.state.board._id, { type: 'removeTaskList', taskListId })
                return res
            }
            catch{
                context.commit('setBoard', boardCopy);
            }
        },

        //*Task ACtions
        async getTask(context, { taskId, boardId }) {
            const boardCopy = JSON.parse(JSON.stringify(context.state.board));
            const taskObj = { taskId, boardId }

            try {
                const board = await boardService.getById(boardId);
                context.commit('setBoard', board)
                context.commit('setCurrTask', taskObj);
                return context.getters.currTask;
            }
            catch{
                context.commit('setBoard', boardCopy);
            }

        },
        //-------------------------------------------------------------------
        async saveTask(context, { objSave }) {
            const boardCopy = JSON.parse(JSON.stringify(context.state.board));

            try {
                context.commit('saveTask', objSave);
                const res = await boardService.putData(context.state.board._id, { type: 'saveTask', objSave })
                return res
            }
            catch{
                context.commit('setBoard', boardCopy);
            }
        },
        //!work with put data
        async addTask(context, { taskListId, newTask }) {
            const boardCopy = JSON.parse(JSON.stringify(context.state.board));

            const task = boardService.getEmptyTask(context.state.board._id);
            task.title = newTask.title
            const taskObj = { task, taskListId }

            try {
                context.commit('addTask', taskObj);
                const res = await boardService.putData(context.state.board._id, { type: 'addTask', task, taskListId })
                return res
            }
            catch{
                context.commit('setBoard', boardCopy);
            }
        },
        //!work with put data
        async removeTask(context, { taskId }) {
            const boardCopy = JSON.parse(JSON.stringify(context.state.board));
            try {
                //remove the task from the local board(not copy) 
                context.commit('removeTask', taskId);
                const res = await boardService.putData(context.state.board._id, { type: 'removeTask', taskId })
                return res
            }
            catch{
                context.commit('setBoard', boardCopy);
            }
        },
        //!work with put data
        async moveList(context, { oldIndex, newIndex }) {
            const moveObj = { oldIndex, newIndex }
            try {
                const res = await boardService.putData(context.state.board._id, { type: 'moveList', oldIndex, newIndex })
                return res
            } catch{
                context.commit('moveListAgain', moveObj);
            }
        },
        //!work with put data
        async moveTask(context, { idMoveFrom, idMoveTo, oldIndex, newIndex }) {
            const moveObj = { idMoveFrom, idMoveTo, oldIndex, newIndex }
            try {
                const res = await boardService.putData(context.state.board._id, { type: 'moveTask', idMoveFrom, idMoveTo, oldIndex, newIndex })
                return res
            } catch{
                context.commit('removeChangeMoveTask', moveObj);
            }
        },
        //!work with put data
        async setListTitle(context, { taskListId, title }) {
            const boardCopy = JSON.parse(JSON.stringify(context.state.board));
            try {
                context.commit('setListTitle', { taskListId, title });
                const res = await boardService.putData(context.state.board._id, { type: 'setListTitle', taskListId, title })
                return res
            } catch{
                context.commit('setBoard', boardCopy);
            }
        },
        //!work with put data
        async changeTitleBoard(context, { title }) {
            const boardCopy = JSON.parse(JSON.stringify(context.state.board));
            try {
                context.commit('changeTitleBoard', title);
                const res = await boardService.putData(context.state.board._id, { type: 'changeTitleBoard', title })
                return res
            } catch{
                context.commit('setBoard', boardCopy);
            }
        },
        async changeTask(context, { task }) {
            context.commit('changeTask', task)
        },
        async saveUsersBoard(context, { users }) {
            const boardCopy = JSON.parse(JSON.stringify(context.state.board));
            try {
                context.commit('saveUsersBoard', users);
                const res = await boardService.putData(context.state.board._id, { type: 'saveUsersBoard', users })
                return res
            } catch{
                context.commit('setBoard', boardCopy);
            }
        },
        async dataFromSocket(context, { data }) {
            switch (data.type) {
                case 'saveUsersBoard':
                    context.commit('saveUsersBoard', data.users);
                    break;
                case 'changeTitleBoard':
                    context.commit('changeTitleBoard', data.title);
                    break;
                case 'removeTaskList':
                    context.commit('removeList', data.taskListId);
                    break;
                case 'moveList':
                    context.commit('moveList', data);
                    break;
                case 'moveTask':
                    context.commit('moveTask', data);
                    break
                case 'addTask':
                    context.commit('addTask', data);
                    break
                case 'addList':
                    context.commit('addList', data.newList);
                    break
                case 'setListTitle':
                    context.commit('setListTitle', data);
                    break
                case 'removeTask':
                    context.commit('removeTask', data.taskId);
                    break
                case 'saveTask':
                    context.commit('saveTask', data.objSave);
                    break
            }
        }
    }
}   