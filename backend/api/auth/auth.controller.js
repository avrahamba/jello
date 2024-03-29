const authService = require('./auth.service')
const logger = require('../../services/logger.service')

const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await authService.login(email, password)
        req.session.user = user;
        res.json(user)
    } catch (err) {
        res.status(401).send({ error: err })
    }
}

const signup = async (req, res) => {
    try {
        const { email, password, username, image } = req.body
        logger.debug('new user:'+ email + ", " + username)
        const account = await authService.signup(email, password, username, image)
        const user = await authService.login(email, password)
        req.session.user = user
        res.json(user)
    } catch (err) {
        logger.error('[SIGNUP] ' + err)
        res.status(500).send({ error: 'could not signup, please try later' })
    }
}

const logout = async (req, res) => {
    try {
        req.session.destroy()
        res.send({ message: 'logged out successfully' })
    } catch (err) {
        res.status(500).send({ error: err })
    }
}

module.exports = {
    login,
    signup,
    logout
}