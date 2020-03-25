
const mongoose = require("mongoose");
const User = mongoose.model("User");

const _buildCriteria = (filterBy) => {
    const criteria = {};
    if (filterBy.name) {
        criteria.name = new RegExp(filterBy.name, 'i')
    }
    return criteria;
}


const query = async (filterBy = {}) => {
    const criteria = _buildCriteria(filterBy)
    const users = await User.find(criteria);
    users.forEach(user => delete user.password);
    return users
    // return Board.findById(boardId);
}
//!DONE
const getById = async (userId) => {
    const user = await User.findById(userId);
    console.log("users: ", users)
    delete user.password
    return user
}


const getByEmail = async (userEmail) => {
    var x = await (await User.findOne({ email: userEmail })).populate()
    return x

}

const remove = async (userId) => {
    await User.fineOneAndDelete(userId)
}

const update = async (user) => {
    await User.findByIdAndUpdate(user._id, user)
    return user
}

const add = async (user) => {
    const newUser = {
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



module.exports = {
    query,
    getById,
    getByEmail,
    remove,
    update,
    add
}
