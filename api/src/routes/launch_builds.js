const express = require('express');
const { getAllBuilds, getBuildById, getLaunchRooms, addLaunchRoom, getLaunchStations } = require('../services/launch_builds');

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

module.exports = router