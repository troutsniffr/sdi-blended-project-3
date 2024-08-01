const db = require('../db')

async function getAllRooms() {
  return await db('rooms as r').select('r.*').where({ is_deleted: false })
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

async function updateRoom(id, roomData) {
  await db('rooms').where({ id }).update(roomData)
  return getRoomById(id)
}

async function deleteRoom(id) {
  return await db('rooms').where({ id }).update({ is_deleted: true })
}

module.exports = {
  getAllRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom,
}
