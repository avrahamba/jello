const bcrypt = require('bcrypt')
const userService = require('../user/user.service')
const logger = require('../../services/logger.service')

const saltRounds = 10

const login = async (email, password) => {
    logger.debug(`auth.service - login with email: ${email}`)
    if (!email || !password) return Promise.reject('email and password are required!')
    const user = await userService.getByEmail(email)
    if (!user) return Promise.reject('Invalid email or password')
    const match = await bcrypt.compare(password, user.hashPassword)
    if (!match) return Promise.reject('Invalid email or password')

    delete user.hashPassword;
    return user;
}

const signup = async (email, password, username, image) => {
    logger.debug(`auth.service - signup with email: ${email}, username: ${username}`)
    if (!email || !password || !username) return Promise.reject('email, username and password are required!')
    const hash = await bcrypt.hash(password, saltRounds)
    return userService.add({ email, password: hash, username, image })
}

module.exports = {
    signup,
    login,
}