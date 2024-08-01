const express = require('express');
const { getAllStations, getStationById, createStation, editStation, minorEditStation, deleteStation } = require('../services/stations-v1');

const router = express.Router();

router.get('/', async (req, res) => {
  const stations = await getAllStations();
  return res.status(200).json(stations);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const station = await getStationById(id);
  if (station) {
    return res.status(200).json(station);
  };
});

router.post('/', async (req, res) =>{
  const newStation = await createStation(req.body);
  return res.status(200).json(newStation);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const reviseStation = await editStation(req.body);
  return res.status(200).json(reviseStation);
})

router.patch('/id', async (req, res) => {
  const { id } = req.params;
  const minorEditStation = await minorEditedStation(req.body);
  return res.status(200).json(minorEditStation)
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await deleteStation(id);
  return res.status(200).json(deleteStation);
})



module.exports = router; 

