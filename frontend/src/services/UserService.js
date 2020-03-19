import HttpService from './HttpService'

export default {
    login,
    logout,
    signup,
    getUsers,
    getById,
    remove,
    update
}

var gUsers = [
    {
        "_id": "123",
        "email": "ron@ron",
        "name": "ron",
        "img": "/cloudinary/",
        "hashPassword": "123",
        "boards": [
            {
                "_id": "",
                "name": "",
                "background": "#545454"
            }
        ],
        "alerts": [
            {
                "alertForUser": "the color change",
                "isReade": false,
                "task": {
                    "_id": "",
                    "name": ""
                },
                "taskList": {
                    "_id": "",
                    "name": ""
                },
                "board": {
                    "_id": f,
                    "name": "",
                    "background": ""
                },
                "user": {
                    "_id": "",
                    "name": "",
                    "img": "/cloudinary/"
                }
            }
        ],
        "msgs": [
            {
                "txt": "txt",
                "isReade": false,
                "task": {
                    "_id": "",
                    "name": ""
                },
                "taskList": {
                    "_id": "",
                    "name": ""
                },
                "board": {
                    "_id": f,
                    "name": "",
                    "background": ""
                },
                "user": {
                    "_id": "",
                    "name": "",
                    "img": "/cloudinary/"
                }
            }
        ]
    }
]

function getById(userId) {
    return HttpService.get(`user/${userId}`)
}
function remove(userId) {
    return HttpService.delete(`user/${userId}`)
}

function update(user) {
    return HttpService.put(`user/${user._id}`, user)
}

async function login(userCred) {
    const user = await HttpService.post('auth/login', userCred);
    return _handleLogin(user)
}
async function signup(userCred) {
    const user = await HttpService.post('auth/signup', userCred);
    return _handleLogin(user)
}
async function logout() {
    await HttpService.post('auth/logout');
    sessionStorage.clear();
}
function getUsers() {
    return HttpService.get('user')
}

function _handleLogin(user) {
    if (user) sessionStorage.setItem('user', JSON.stringify(user))
    return user;
}