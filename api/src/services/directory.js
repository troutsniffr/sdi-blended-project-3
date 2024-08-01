const db = require('../db');

async function listAlldirectory(options) {
   
    if (options.extended) {
        return await db('directory as dir')
            .select('dir.*', db.raw(`COALESCE(
                json_agg(
                    jsonb_build_object(
                        'id', d.id,
                        'full_name', d.fullname,
                        'duty_title', d.duty_title,
                        'phone_number', d.phone_number,
                        'email', d.email
                        )
                    ) filter (WHERE d.id IS NOT NULL AND d.is_deleted = false, '[]') as "directory"`))
            .groupby('dir.id')
    }

    return await db.select('*').from('directory').orderBy('id')
}

async function getdirectorybyid(id, options) {
    if (options.extended) {
        return await db('directory as dir')
        .select('dir.*', db.raw(`COALESCE(
            json_agg(
                jsonb_build_object(
                'id', dir.id, 
                'full_name', 
                dir.full_name, 
                'duty_title', dir.duty_title, 
                'phone_number', dir.phone_number, 
                'email', d.email
                )
            ) FILTER (WHERE d.id IS NOT NULL AND d.is_deleted = false), '[]') as "directory"`))
        .leftJoin('dir', 'dir.id')
        .where('dir.id', id)
        .groupBy('dir.id')
        
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
            .del();
    
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