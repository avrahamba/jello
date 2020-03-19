import { taskService } from '../services/task.service';

export const taskStore = {
    state: {
        tasks: [],
        currTask: null,
        filterBy: taskService.getEmptyCreterea(),
        isSorted: false
    },
    mutations: {
        setTasks(state, tasks) {
            state.tasks = tasks;
        },
        setCurrTask(state, task) {
            state.currTask = task;
        },
        setFilter(state, { creterea }) {
            state.filterBy = creterea;
        },
        sortList(state, { sortBy }) {
            state.filterBy._sort = sortBy;
            state.filterBy._order = (state.isSorted) ? 'desc' : 'asc';
            state.isSorted = !state.isSorted;
        },
        addTask(state, { task }) {
            state.tasks.unshift(task);
        },
        editTask(state, { task }) {
            const idx = state.tasks.findIndex(currTask => currTask._id === task._id);
            state.tasks.splice(idx, 1, task);
        },
        removeTask(state, taskId) {
            const idx = state.tasks.findIndex(task => task._id === taskId);
            if (idx !== -1) state.tasks.splice(idx, 1);
        }
    },
    getters: {
        tasks(state) {
            return state.tasks;
        },
        currTask(state) {
            return state.currTask;
        },
        filterBy(state) {
            return state.filterBy;
        }
    },
    actions: {
        async loadTasks(context) { 
            const tasks = await taskService.query(context.state.filterBy);
            context.commit('setTasks', tasks);
        },
        async getTask(context, { taskId }) {
            const task = await taskService.getById(taskId);
            context.commit('setCurrTask', task);
            return task;
        },
        async saveTask(context, { task }) {
            const isEdit = !!task._id; 
            const savedTask = await taskService.save(task);
            context.commit({
                type: (isEdit) ? 'editTask' : 'addTask',
                task: savedTask
            });
        },
        async removeTask(context, { taskId }) {
            const res = await taskService.remove(taskId);
            if (!res.failed) context.commit('removeTask', taskId);
        }
    }
}   