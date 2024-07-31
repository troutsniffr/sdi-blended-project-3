/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('launch_rooms', table =>{
      table.increments();
      table.integer('launch_id');
      table.integer('room_id');
      
      table.foreign('launch_id').references('launch_builds.id').onDelete('CASCADE');
      table.foreign('room_id').references('rooms.id').onDelete('CASCADE')
    })
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.table('launch_rooms', (table) => {
      table.dropForeign('launch_id');
      table.dropForeign('room_id');
    }).then(() => knex.schema.dropTableIfExists('launch_rooms'))
  };
