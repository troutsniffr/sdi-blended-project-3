const express = require('express');
const { getAllBuilds, getBuildById, createBuild, getLaunchRooms, addLaunchRoom, deleteLaunchRoom, getLaunchStations, allocateStationSlot, deallocateStationSlot } = require('../services/launch_builds');

const router = express.Router();

router.get('/', async (req, res) => {
  const builds = await getAllBuilds();
  return res.status(200).json(builds)
})

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const launch = await getBuildById(id);
  if (launch) {
    return res.status(200).json(launch);
  }
  return res.status(200).json(null);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const build = await deleteBuildById(id)
  if (build) {
    return res.status(200).json({ message: 'Build deleted' });
  }

  return res.status(404).json({ error: 'Build not found' })
})

router.post('/', async (req, res) => {
  const build = await createBuild(req.body)
  if (build) {
    return res.status(200).json({ build })
  }

  return res.status(500).json({ error: 'Failed to create build' })
})

router.get('/:id/rooms', async (req, res) => {
  const { id } = req.params
  const { extended = false } = req.query
  const options = { extended }

  try {
    const rooms = await getLaunchRooms(id, options)
    return res.status(200).json(rooms)
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
})

router.post('/:id/rooms', async (req, res) => {
  try {
    const room = await addLaunchRoom(req.body)
    return res.status(201).json(room)
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
})

router.delete('/:id/rooms/:roomId', async (req, res) => {
  const { id, roomId } = req.params
  const room = await deleteLaunchRoom(id, roomId)
  if (room) {
    return res.status(200).json({ message: 'Room deleted' })
  }

  return res.status(404).json({ error: 'Room not found' })
})

router.get('/:id/rooms/:roomId/stations', async (req, res) => {
  const { id, roomId } = req.params
  const { extended = false } = req.query
  const options = { extended }
  
  try {
    const stations = await getLaunchStations(id, roomId, options)
    return res.status(200).json(stations)
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
})

// Post - add a person to the station
router.post('/:id/rooms/:roomId/stations/:stationId', async (req, res) => {
  const station = await allocateStationSlot(req.body)
  if (station) {
    return res.status(200).json({ station })
  }

  return res.status(500).json({ error: 'Failed to allocate station' })
})

// Delete - remove a person from the station
router.delete('/:id/rooms/:roomId/stations/:stationId/person/:personId', async (req, res) => {
  const { id, roomId, stationId, personId } = req.params
  const station = await deallocateStationSlot(id, roomId, stationId, personId)
  if (station) {
    return res.status(200).json({ message: 'Person removed from station' })
  }

  return res.status(404).json({ error: 'Person not found' })
})

module.exports = router