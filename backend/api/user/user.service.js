
const mongoose = require("mongoose");
const User = mongoose.model("User");


module.exports = {
    query,
    getById,
    getByEmail,
    remove,
    update,
    add
}

async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy)
    const users = await User.find(criteria);
    users.forEach(user => delete user.password);
    return users
    // return Board.findById(boardId);
}
//!DONE
async function getById(userId) {
    const user = await User.findById(userId);
    console.log("users: ", users)
    delete user.password
    return user
}


async function getByEmail(userEmail) {
    var x = await (await User.findOne({ email: userEmail })).populate()
    return x

}

async function remove(userId) {
    await User.fineOneAndDelete(userId)
}

async function update(user) {
    await User.findByIdAndUpdate(user._id, user)
    return user
}

async function add(user) {
    var newUser = {
        "email": user.email,
        "name": user.username,
        "img": "/cloudinary/",
        "hashPassword": user.password,
        "boards": [
            {
                "_id": "5e7377611c9d4400009f5d97",
                "name": "proj1",
                "background": "#545454"
            }
        ],
        "alerts": [
            {
                "alertForUser": "the color change",
                "isReade": false,
                "task": {
                    "id": "",
                    "name": ""
                },
                "taskList": {
                    "id": "",
                    "name": ""
                },
                "board": {
                    "_id": false,
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
        "comments": [
            {
                "txt": "txt",
                "isReade": false,
                "task": {
                    "id": "",
                    "name": ""
                },
                "taskList": {
                    "id": "",
                    "name": ""
                },
                "board": {
                    "_id": false,
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
    return await User.insertMany([newUser]);
}

function _buildCriteria(filterBy) {
    const criteria = {};
    if (filterBy.name) {
        criteria.name = new RegExp(filterBy.name, 'i')
    }
    return criteria;
}


