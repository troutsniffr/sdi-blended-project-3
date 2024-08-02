const db = require('../db')

async function getAllRooms() {
  return await db('rooms').select('*').where({ is_deleted: false })
}

async function getRoomById(id) {
  return await db('rooms as r')
    .select('r.*')
    .where({ id, is_deleted: false })
    .first()
}

async function createRoom({ name }) {
  const [room] = await db.insert({ name }).into('rooms').returning('*')
  return room
}

async function updateRoom(id, { name }) {
  const [room] = await db
    .update({ name })
    .into('rooms')
    .where({ id })
    .returning('*')
  return room
}

async function deleteRoom(id) {
  const [room] = await db('rooms')
    .where({ id })
    .update({ is_deleted: true })
    .returning('*')
  return room
}

module.exports = { getAllRooms, getRoomById, createRoom, updateRoom, deleteRoom }
