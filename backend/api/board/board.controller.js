const logger = require('../../services/logger.service')
const boardService = require('./board.service')

// TODO: needs error handling! try, catch

const getBoards = async (req, res) => {
    try {

        const boards = await boardService.query(req.params.userId)
        res.json(boards)
    } catch (err) {
        logger.error('Cannot get boards', err);
        res.status(500).send({ error: 'cannot get boards' })

    }
}

const getBoard = async (req, res) => {
    try {
        const boards = await boardService.getById(req.params.id)
        res.json(boards)
    } catch (err) {
        logger.error('Cannot get boards', err);
        res.status(500).send({ error: 'cannot get boards' })

    }
}



const deleteBoard = async (req, res) => {
    await boardService.remove(req.params.id)
    res.end()
}

const addBoard = async (req, res) => {
    let wrapper = req.body;
    board = await boardService.add(wrapper)
    res.send(board)
}

const saveBoard = async (req, res) => {
    let board = req.body;
    board = await boardService.save(board)
    res.send(board)
}

const changeData = async (req, res) => {
    let board = await boardService.changeData(req.params.id, req.body)
    res.send(board)
}

module.exports = {
    getBoard,
    getBoards,
    deleteBoard,
    addBoard,
    saveBoard,
    changeData
}