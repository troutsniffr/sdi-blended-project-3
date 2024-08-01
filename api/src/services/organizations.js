const db = require('../db');

async function listAllOrganizations(options) {

  if (options.extended) {
    return await db('organizations as o')
      .select('o.*', db.raw(`COALESCE(
          json_agg(
            jsonb_build_object(
              'id', d.id, 
              'full_name', d.full_name, 
              'duty_title', d.duty_title, 
              'phone_number', d.phone_number, 
              'email', d.email
            )
          ) FILTER (WHERE d.id IS NOT NULL AND d.is_deleted = false), '[]') as "directory"`))
      .leftJoin('directory as d', 'o.id', 'd.org_id')
      .groupBy('o.id')
  }

  return await db.select('*').from('organizations').orderBy('id')
}

async function getOrganizationById(id, options) {
  if (options.extended) {
    return await db('organizations as o')
      .select('o.*', db.raw(`COALESCE(json_agg(jsonb_build_object('id', d.id, 'full_name', d.full_name, 'duty_title', d.duty_title, 'phone_number', d.phone_number, 'email', d.email)) FILTER (WHERE d.id IS NOT NULL AND d.is_deleted = false), '[]') as "directory"`))
      .leftJoin('directory as d', 'o.id', 'd.org_id')
      .where('o.id', id)
      .groupBy('o.id')
  }

  return await db.select('*').from('organizations').where({ id }).first();
}


module.exports = { listAllOrganizations, getOrganizationById }