/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('rooms').del()
  await knex('rooms').insert([
    { name: 'Range Room' }, // id: 1
    { name: 'Customer Room' }, // id: 2
    { name: 'MVLSC Room 213' }, // id: 3
    { name: 'MVLSC Room 214' }, // id: 4
    { name: 'Technical Support Room' }, // id: 5
  ]);
};
