const express = require('express')
const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')
const {addBoard, getBoard, getBoards, deleteBoard} = require('./board.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/id/:id', getBoard)
router.get('/:userId?', getBoards)
router.post('/',  requireAuth, addBoard)
router.delete('/:id',  requireAuth, deleteBoard)

module.exports = router