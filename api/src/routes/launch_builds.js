const express = require('express');
const { listAllOrganizations } = require('../services/launch_builds');

const router = express.Router();

router.get('/', async (req, res) => {
  const orgs = await listAllOrganizations(options);
  return res.status(200).json(orgs)
})

module.exports = router