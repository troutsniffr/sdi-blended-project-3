/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('launch_stations').del()
  await knex('launch_stations').insert([
    
    {launch_id: 1, room_id: 4, station_id: 26, person_id: 1 },
    {launch_id: 1, room_id: 4, station_id: 27, person_id: 2 },
    {launch_id: 1, room_id: 4, station_id: 55, person_id: 3 },
    {launch_id: 1, room_id: 4, station_id: 55, person_id: 4 },
  ]);
};
