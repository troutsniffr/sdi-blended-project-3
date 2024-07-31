const db = require('../db');

async function listAlldirectory(options) {
  return await db.select('*').from('directory').orderBy('name');
}

async function listAlldirectory() {
  return await db.select('*').from('directory').orderBy('name');
}


module.exports = {listAlldirectory}