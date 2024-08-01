const db = require('../db');

async function getAllStations() {
return await db.select('*').from('stations').where('is_deleted', false);
}

async function getStationById(id){
return await db('stations')
  .select('*')
  .where({id, is_deleted: false}).first();
} 

module.exports = { getAllStations, getStationById }