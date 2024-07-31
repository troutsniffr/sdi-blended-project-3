/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('launch_builds').del()
  await knex('launch_builds').insert([
    { name: 'FALCON 9 USSF-124', date: '2024-08-01' }, // id: 1
  ]);
};
