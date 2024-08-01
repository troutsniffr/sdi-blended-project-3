const express = require('express');
const { getAllStations, getStationById } = require('../services/launch_station');

const router = express.Router();

router.get('/', async (req, res) => {
  const { extended = false } = req.query;
  const options = { extended };

  const orgs = await getAllStations(options);
  return res.status(200).json(orgs)
})

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const { extended = false } = req.query;
  const options = { extended };

  const station = await getStationById(id, options);
  return res.status(200).json(station)
})

module.exports = router