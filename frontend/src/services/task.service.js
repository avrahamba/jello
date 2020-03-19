import httpService from './HttpService';

export const taskService = {
    query,
    getById,
    remove,
    save,
    getEmptyCreterea,
    getEmptyTask
}

function query(creterea) {   
    const params = new URLSearchParams(creterea);
    return httpService.get(`task?${params}`);
}
function getById(id) {
    return httpService.get(`task/${id}`);
}
function remove(id) {
    return httpService.delete(`task/${id}`);
}
function getEmptyCreterea() {
    return {
        name: '',
        inStock: '',
        type: '',
        _sort: '',
        _order: 'asc'
    }
}
function getEmptyTask() {
    return {
        name: '',
        price: 0,
        type: '',
        img: '',
        inStock: false
    }
}
 
 async function save(task) {
     let prm; 
     if (task._id) prm = httpService.put(`task/${task._id}`, task);
     else {
        task.createdAt = new Date();
        prm = httpService.post('task', task);
     }
     return await prm;
 }