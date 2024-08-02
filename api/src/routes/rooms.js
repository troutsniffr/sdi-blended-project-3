const express = require('express')
const { getAllRooms, getRoomById, createRoom, updateRoom, deleteRoom} = require('../services/rooms')
const { getAllStations, getStationById, createStation, deleteStation, updateStation } = require('../services/stations-v1')

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

router.patch('/:id', async (req, res) => {
  const { id } = req.params
  const room = await updateRoom(id, req.body)

  if (!room) {
    return res.status(400).json({ message: 'Error updating room' })
  }

  return res.status(200).json({ room })
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  const room = await deleteRoom(id)

  if (!room.is_deleted) {
    return res.status(400).json({ message: 'Error deleting room' })
  }

  return res.status(200).json({ message: 'Room deleted' })
})

router.get('/:id/stations', async (req, res) => {
  const { id: roomId } = req.params

  const stations = await getAllStations(roomId)
  return res.status(200).json({ stations })
})

router.get('/:id/stations/:stationId', async (req, res) => {
  const { id: roomId, stationId } = req.params

  const station = await getStationById(roomId, stationId)
  if (station) {
    return res.status(200).json({ station })
  }

  return res.status(404).json({ message: 'Station not found' })
})

router.post('/:id/stations', async (req, res) => {
  const station = await createStation(req.body)
  if (!station) {
    return res.status(400).json({ message: 'Error creating station' })
  }

  return res.status(200).json({ station })
})

router.delete('/:id/stations/:stationId', async (req, res) => {
  const { id: roomId, stationId } = req.params
  const station = await deleteStation(roomId, stationId)

  if (!station.is_deleted) {
    return res.status(400).json({ message: 'Error deleting station' })
  }

  return res.status(200).json({ message: 'Station deleted' })
})

router.patch('/:id/stations/:stationId', async (req, res) => {
  const { id: roomId, stationId } = req.params
  const station = await updateStation(roomId, stationId, req.body)

  if (!station) {
    return res.status(400).json({ message: 'Error updating station' })
  }

  return res.status(200).json({ station })
})

module.exports = router
    