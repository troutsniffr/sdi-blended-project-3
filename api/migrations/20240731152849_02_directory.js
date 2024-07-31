/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function(knex) {
    return knex.schema.createTable('directory', table => {
        table.increments('id'),
        table.string('full_name').notNullable(); 
        table.string('duty_title').notNullable();
        table.string('phone_number');
        table.string('email').notNullable();
        table.boolean('is_deleted').defaultTo(false);
        table.integer('org_id');
        table.foreign('org_id').references('organizations.id').onDelete('CASCADE');
    }
)};


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.table('directory', (table) => {
    table.dropForeign('org_id');
  }).then(() => knex.schema.dropTableIfExists('directory'))
};
