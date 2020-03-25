const userService = require('./user.service')

const getUser = async (req, res) => {
    const user = await userService.getById(req.params.id)
    res.send(user)
}

const getUsers = async (req, res) => {
    // console.log(req.query);
    const users = await userService.query(req.query)
    res.send(users)
}

const deleteUser = async (req, res) => {
    await userService.remove(req.params.id)
    res.end()
}

const updateUser = async (req, res) => {
    const user = req.body;
    await userService.update(user)
    res.send(user)
}

module.exports = {
    getUser,
    getUsers,
    deleteUser,
    updateUser
}