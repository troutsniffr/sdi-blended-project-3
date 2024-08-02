const db = require('../db');

async function listAlldirectory(options) {
   
    if (options.extended) {
        
        return await db('directory as d')
            .select('d.id', 'd.full_name', 'd.duty_title', 'd.phone_number', 'd.email', db.raw(`jsonb_build_object(
                        'id', o.id,
                        'name', o.name
                        ) as "org"`))
            .leftJoin('organizations as o', 'o.id', 'd.org_id')
    }

    return await db.select('*').from('directory').orderBy('id')
}

async function getdirectorybyid(id, options) {
    if (options.extended) {
        return await db('directory as d')
            .select('d.id', 'd.full_name', 'd.duty_title', 'd.phone_number', 'd.email', db.raw(`jsonb_build_object(
                        'id', o.id,
                        'name', o.name
                        ) as "org"`))
            .leftJoin('organizations as o', 'o.id', 'd.org_id')
            .where('d.id', id)
    }

    return await db.select('*').from('directory').where({ id }).first();
}

async function addToDirectory(newPersondata) {

    const [newPerson] = await db('directory')
        .insert(newPersondata)
        .returning('*')

        return newPerson;
}
async function editDirectory(id, editPerson) {
        
        const [updateddirectory] = await db('directory')
            .where({ id })
            .update(editPerson)
            .returning('*');

        return updateddirectory;
}

async function deldirectory(id) {

        const [deletedPerson] = await db('directory')
            .where({id})
            .del()
            .returning('*')
    
        return deletedPerson;
}
        

async function minorEditdirectory(id, minorEdit) {
    const [updatedPerson] = await db('directory')
        .where({ id })
        .update(minorEdit)
        .returning('*')
        
    return updatedPerson;
}
 
module.exports = { listAlldirectory, getdirectorybyid, addToDirectory, minorEditdirectory, deldirectory, editDirectory }