const logger = require('../../services/logger.service')
const boardService = require('./board.service')
 
// TODO: needs error handling! try, catch

async function getBoards(req, res) {
    try {
        const boards = await boardService.query(req.query)
        res.json(boards)
    } catch (err) {
        logger.error('Cannot get boards', err);
        res.status(500).send({ error: 'cannot get boards' })
        
    }
}

async function getBoard(req, res) {
    try {
        const boards = await boardService.getById(req.params.id)
        res.json(boards)
    } catch (err) {
        logger.error('Cannot get boards', err);
        res.status(500).send({ error: 'cannot get boards' })
        
    }
}



async function deleteBoard(req, res) {
    await boardService.remove(req.params.id)
    res.end()
}

async function addBoard(req, res) {
    var board = req.body;
    board.byUserId = req.session.user._id;
    board = await boardService.add(board)
    board.byUser = req.session.user;
    // TODO - need to find aboutUser
    board.aboutUser = {} 
    res.send(board)
}

module.exports = {
    getBoard,
    getBoards,
    deleteBoard,
    addBoard
}