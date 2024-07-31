/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('launch_stations', table => {
      table.integer('launch_id').notNullable();
      table.integer('room_id').notNullable();
      table.integer('station_id').notNullable();
      table.integer('person_id').notNullable();

        table.foreign('launch_id').references('launch_builds.id').onDelete('CASCADE');
        table.foreign('room_id').references('rooms.id').onDelete('CASCADE');
        table.foreign('station_id').references('stations.id').onDelete('CASCADE'); 
        table.foreign('person_id').references('directory.id').onDelete('CASCADE'); 
    }
)};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.table('launch_stations', table => {
    table.dropForeign('launch_id');
    table.dropForeign('room_id');
    table.dropForeign('station_id');
    table.dropForeign('person_id');
  }).then(() => knex.schema.dropTableIfExists('launch_stations'))
};