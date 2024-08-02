const db = require('../db');

async function getAllBuilds() {
  return await db.select('*').from('launch_builds').orderBy('name');
}

async function getBuildById(id){
  return await db('launch_builds')
    .select('*')
    .where({id, is_deleted: false}).first();
  }

  async function deleteBuildById(id) {
    return await db('launch_builds')
      .where({ id })
      .update({ is_deleted: true })
  }

async function getLaunchRooms(id, { extended }) {
  if (extended) {
    return await db('launch_rooms as lr')
      .select(
        'lr.id', 'r.name',
        db.raw(`jsonb_build_object('id', lb.id, 'name', lb.name, 'description', lb.description, 'date', lb.date) as "build"`)
      )
      .innerJoin('launch_builds as lb', 'lr.launch_id', 'lb.id')
      .innerJoin('rooms as r', 'lr.room_id', 'r.id')
      .where('lr.launch_id', id)
      .groupBy('lr.id', 'lb.id', 'r.name')
  }

  return await db('launch_rooms as lr')
    .select('*')
    .where('launch_id', id)
    .orderBy('id');
}

async function addLaunchRoom({ launch_id, room_id }) {
  return await db.insert({ launch_id, room_id }).into('launch_rooms').returning('*');
}

async function deleteLaunchRoom(id) {
  return await db('launch_rooms').where({ id }).update({ is_deleted: true })
}

async function getLaunchStations(launch_id, room_id, { extended }) {
  let stations;

  if (!extended) {
    stations = await db('launch_stations as ls')
      .select('*')
      .orderBy('station_id')
  } else  { 
    stations = await db('launch_stations as ls')
    .select(
      's.id', 's.name', 's.capacity',
      db.raw(`jsonb_agg(jsonb_build_object('id', d.id, 'full_name', d.full_name, 'email', d.email, 'duty_title', d.duty_title, 'phone_number', d.phone_number, 'organization', jsonb_build_object('id', o.id, 'name', o.name))) as "slots"`)
    )
    .innerJoin('stations as s', 'ls.station_id', 's.id')
    .leftJoin('directory as d', 'ls.person_id', 'd.id')
    .leftJoin('organizations as o', 'd.org_id', 'o.id')
    .where({ launch_id, 'ls.room_id': room_id })
    .orderBy('s.id')
    .groupBy('s.id');
  }

  return { stations }
}

async function createBuild({ name, description, date }) {

  const [makeBuild] = await db('launch_builds')
  .insert({ name, description, date })
  .returning('*')
  
  return makeBuild;
}

async function allocateStationSlot({launch_id, room_id, station_id, person_id}) {
  return await db.insert({ launch_id, room_id, station_id,person_id }).into('launch_rooms');
}

async function deallocateStationSlot(launch_id, room_id, station_id, person_id) {
  return await db('launch_stations').where({ launch_id, room_id, station_id, person_id }).del();
}


module.exports = { getAllBuilds, getBuildById, createBuild, deleteBuildById, deleteLaunchRoom, getLaunchRooms, addLaunchRoom, getLaunchStations, allocateStationSlot, deallocateStationSlot }