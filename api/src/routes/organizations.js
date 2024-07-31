const express = require('express');
const { listAllOrganizations, getOrganizationById } = require('../services/organizations');

const router = express.Router();

router.get('/', async (_req, res) => {
  const orgs = await listAllOrganizations(options);
  return res.status(200).json(orgs)
})

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const org = await getOrganizationById(id);
  return res.status(200).json(org)
})

module.exports = router