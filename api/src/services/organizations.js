const db = require('../db');

async function listAllOrganizations(options) {
  return await db.select('*').from('organizations').orderBy('name');
}

async function listOrganizations() {
  return await db.select('*').from('organizations').orderBy('name');
}

async function getOrganizationById(id) {
  return await db.select('*').from('organizations').where({ id }).first();
}


module.exports = { listAllOrganizations, getOrganizationById}