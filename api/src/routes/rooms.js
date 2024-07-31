const express = require('express');
const { listAllOrganizations } = require('../services/rooms');

const router = express.Router();

router.get('/', async (req, res) => {
  const orgs = await listAllOrganizations(options);
  return res.status(200).json(orgs)
})

module.exports = router