/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function(knex) {
    return knex.schema.createTable('organizations', table=> {
      table.increments('id');
      table.string('name').notNullable(); 
    })
  };
  
  
  
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
      return knex.schema.dropTableIfExists('organizations');
  };
