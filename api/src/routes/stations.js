const express = require('express');
const { getAllStations, getStationById, createStation, updateStation, deleteStation } = require('../services/stations-v1');

const router = express.Router();

router.get('/', async (req, res) => {
  const stations = await getAllStations();
  return res.status(200).json({ stations });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const station = await getStationById(id);
  if (station) {
    return res.status(200).json({station});
  };
});

router.post('/', async (req, res) => {
  const station = await createStation(req.body);
  return res.status(200).json({ station });
});

router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const station = await updateStation(id, req.body);
  return res.status(200).json({ station })
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await deleteStation(id);
  return res.status(200).json({ message: 'Station deleted' });
})



module.exports = router;

