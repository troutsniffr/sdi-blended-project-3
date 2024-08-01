const express = require('express')
const {
  getAllRooms,
  getRoomById,
  createRoom,
  editRoom,
  minorEditedRoom,
  deleteRoom,
} = require('../services/rooms')

const router = express.Router()

router.get('/', async (_req, res) => {
  const rooms = await getAllRooms()
  return res.status(200).json({ rooms })
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const room = await getRoomById(id)

  if (room) {
    return res.status(200).json(room)
  }

  return res.status(404).json({ message: 'Room not found' })
})

router.post('/', async (req, res) => {
  const room = await createRoom(req.body)
  if (!room) {
    return res.status(400).json({ message: 'Error creating room' })
  }

  return res.status(200).json({ room })
})

router.patch('/id', async (req, res) => {
  const { id } = req.params
  const minorEditRoom = await minorEditedRoom(req.body)
  return res.status(200).json(minorEditRoom)
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  await deleteRoom(id)
  return res.status(200).json(deleteRoom)
})

module.exports = router
