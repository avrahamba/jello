
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
    // const criteria = _buildCriteria(filterBy)
    // console.log('im query, criteria:' , criteria)
    // const collection = await dbService.getCollection('user')
    // try {
    //     const users = await collection.find(criteria).toArray();
    //     console.log('users:',users)
    //     users.forEach(user => delete user.password);
    //     return users
    // } catch (err) {
    //     console.log('ERROR: cannot find users')
    //     throw err;
    // }
}
//!DONE
async function getById(userId) {
    const user = await User.findById(userId);
    delete user.password
    return user
}


async function getByEmail(email) {

    const user = await User.findOne({ email })
    return user
}

async function remove(userId) {

    await collection.deleteOne({ "_id": ObjectId(userId) })

}

async function update(user) {
    // const collection = await dbService.getCollection('user')
    // user._id = ObjectId(user._id);

    // try {
    //     await collection.replaceOne({ "_id": user._id }, { $set: user })
    //     return user
    // } catch (err) {
    //     console.log(`ERROR: cannot update user ${user._id}`)
    //     throw err;
    // }
}

async function add(user) {
    // var newUser = {
    //     "email": user.email,
    //     "name": user.username,
    //     "img": "/cloudinary/",
    //     "hashPassword": user.password,
    //     "boards": [
    //         {
    //             "_id": "5e7377611c9d4400009f5d97",
    //             "name": "proj1",
    //             "background": "#545454"
    //         }
    //     ],
    //     "alerts": [
    //         {
    //             "alertForUser": "the color change",
    //             "isReade": false,
    //             "task": {
    //                 "_id": "",
    //                 "name": ""
    //             },
    //             "taskList": {
    //                 "_id": "",
    //                 "name": ""
    //             },
    //             "board": {
    //                 "_id": false,
    //                 "name": "",
    //                 "background": ""
    //             },
    //             "user": {
    //                 "_id": "",
    //                 "name": "",
    //                 "img": "/cloudinary/"
    //             }
    //         }
    //     ],
    //     "comments": [
    //         {
    //             "txt": "txt",
    //             "isReade": false,
    //             "task": {
    //                 "_id": "",
    //                 "name": ""
    //             },
    //             "taskList": {
    //                 "_id": "",
    //                 "name": ""
    //             },
    //             "board": {
    //                 "_id": false,
    //                 "name": "",
    //                 "background": ""
    //             },
    //             "user": {
    //                 "_id": "",
    //                 "name": "",
    //                 "img": "/cloudinary/"
    //             }
    //         }
    //     ]
    // }
    // console.log(newUser)
    // const collection = await dbService.getCollection('user')
    // try {
    //     await collection.insertOne(newUser);
    //     return user;
    // } catch (err) {
    //     console.log(`ERROR: cannot insert user`)
    //     throw err;
    // }
}

function _buildCriteria(filterBy) {
    // const criteria = {};
    // if (filterBy.name) {
    //     criteria.name =  new RegExp(filterBy.name, 'i')
    // }
    // return criteria;
}


