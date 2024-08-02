/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('launch_rooms').del()
  await knex('launch_rooms').insert([
    { launch_id: 1, room_id: 4 },
    { launch_id: 2, room_id: 3 },
    { launch_id: 1, room_id: 3 },
    { launch_id: 2, room_id: 4 }// Launch: Falcon Heavy Block 5 | Starlink 4; Room: MVLSC Room 2
  ]);
};
