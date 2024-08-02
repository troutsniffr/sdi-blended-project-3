const express = require('express');
const { listAlldirectory, getdirectorybyid, addToDirectory, editDirectory, deldirectory, minorEditdirectory } = require('../services/directory');

const router = express.Router();

router.get('/', async (req, res) => {
  const { extended } = req.query
  const options = { extended }

  const dir = await listAlldirectory(options);
  return res.status(200).json(dir)
})

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const options = { extended: req.query }

  const dir = await getdirectorybyid(id, options);
  return res.status(200).json(dir)
})

router.post('/', async (req, res) => {
  const newPerson = await addToDirectory(req.body)

  return res.status(200).json(newPerson)
})

router.put('/:id', async (req, res) =>{
  const editPerson = await editDirectory(req.body)
  
  return res.status(200).json(editPerson)
})

router.delete('/:id', async (req, res) => {
  const delPerson = await deldirectory(req.body)

  return res.status(200).json(delPerson)
})

router.patch('/:id', async (req, res) => {
  const minorEdit = await minorEditdirectory(req.body)

  return res.status(200).json(minorEdit)
})


module.exports = router