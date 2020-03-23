const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { getBoard,changeData, getBoards, addBoard, saveBoard, deleteBoard } = require('./board.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/id/:id', getBoard)
router.get('/:userId?', getBoards)
router.post('/', addBoard)
router.put('/id/:id', saveBoard)
router.put('/data/:id', changeData)
router.delete('/:id', requireAuth, deleteBoard)

module.exports = router