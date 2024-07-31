/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('launch_builds', table => {
        table.increments('id');
        table.string('name').notNullable(); 
        table.string('description'); 
        table.date('date').notNullable;
        table.boolean('is_deleted');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('launch_builds');
};

