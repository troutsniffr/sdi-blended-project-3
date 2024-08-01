const db = require('../db');

async function getAllStations() {
return await db.select('*').from('stations').where('is_deleted', false);
}

async function getStationById(id){
return await db('stations')
  .select('*')
  .where({id, is_deleted: false}).first();
} 

async function createStation() {
  const[id] = await db('stations').insert(stationData).returning('id');
  return getStationById(id);
}

async function updateStation() {
   await db('stations').where({ id }).update(stationData);
   return getStationById(id);
}

async function deleteStation() {
  return await db('stations').where({id}).update({is_deleted:true});
}


module.exports = { getAllStations, getStationById, createStation, updateStation, deleteStation }