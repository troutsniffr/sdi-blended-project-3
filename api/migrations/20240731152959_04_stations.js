/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('stations', table =>{
      table.increments('id')
      table.text('name');
      table.integer('capacity');
      table.boolean('is_deleted').defaultTo(false);
      table.integer('room_id');

      table.foreign('room_id').references('rooms.id').onDelete('CASCADE');
    })
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.table('stations', (table) => {
      table.dropForeign('room_id');
    }).then(() => knex.schema.dropTableIfExists('stations'));
  };
