const express = require('express');
const { listAllOrganizations, getOrganizationById } = require('../services/organizations');

const router = express.Router();

router.get('/', async (req, res) => {
  const { extended = false } = req.query;
  const options = { extended };

  const orgs = await listAllOrganizations(options);
  return res.status(200).json(orgs)
})

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const { extended = false } = req.query;
  const options = { extended };

  const org = await getOrganizationById(id, options);
  return res.status(200).json(org)
})

module.exports = router