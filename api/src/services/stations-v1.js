const db = require('../db');

async function getAllStations() {
  return await db.select('*').from('stations').where({ is_deleted: false });
}

async function getStationById(id) {
  return await db('stations')
    .select('*')
    .where({ id, is_deleted: false }).first();
}

async function createStation({ name, capacity, room_id }) {
  const [station] = await db('stations').insert({ name, capacity, room_id }).returning('*');
  return station;
}

async function updateStation(id, { name, capacity }) {
  const prevStation  = await db.select('*').from('stations').where({ id }).first();
  const stationData = {
    name: name || prevStation.name,
    capacity: capacity || prevStation.capacity
  }
  const [station] = await db('stations').where({ id }).update(stationData).returning('*');
  return station;
}

async function deleteStation() {
  return await db('stations').where({ id }).update({ is_deleted: true });
}


module.exports = { getAllStations, getStationById, createStation, updateStation, deleteStation }