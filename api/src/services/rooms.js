const db = require('../db')

async function getAllRooms() {
  return await db('rooms as r').select('r.*').where({ is_deleted: false })
}

async function getRoomById(id) {
  return await db('rooms').select('*').where({ id, is_deleted: false }).first()
}

async function createRoom(roomData) {
  const [id] = await db('rooms').insert(roomData).returning('id')
  return getRoomById
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
