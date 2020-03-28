import HttpService from './HttpService'


const _handleLogin = (user) => {
    if (user) sessionStorage.setItem('user', JSON.stringify(user))
    return user;
}

const getById = (userId) => {
    return HttpService.get(`user/${userId}`)
}

const remove = (userId) => {
    return HttpService.delete(`user/${userId}`)
}

const update = (user) => {
    return HttpService.put(`user/${user._id}`, user)
}

const login = async (userCred) => {
    const user = await HttpService.post('auth/login', userCred);
    return _handleLogin(user)
}
const signup = async (userCred) => {
    console.log('userCred :', userCred);
    const user = await HttpService.post('auth/signup', userCred);
    return _handleLogin(user)
}
const logout = async () => {
    await HttpService.post('auth/logout');
    sessionStorage.clear();
}
const getUsers = (filterBy) => {
    var queryParams = new URLSearchParams()
    queryParams.set('name', filterBy.txt)
    return HttpService.get(`user?${queryParams}`)
}

export default {
    login,
    logout,
    signup,
    getUsers,
    getById,
    remove,
    update
}