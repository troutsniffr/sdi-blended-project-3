const db = require('../db');

// async function listAlldirectory(options) {
   
//     if (options.extended) {
//         return await db('directory as dir')
//             .select('dir.*', db.raw)
//     }

async function getdirectorybyid(id, options) {
    if (options.columns === 'directory') {
        return await db.select('directory.*', db.raw('to_json(directory.*) as "directory"'))
        .from('directory')
        .leftJoin('directory', 'directory.id',)
        .where('directory.id', id)
        .then((rows) => rows.reduce(reduceDirectories, []))
    }

    return await db.select('*').from('directory').where({ id }).first();
}

// async function addToDirectory(newPersondata) {
//     const newPerson = await db('directory')
//         .insert(newPersondata)
//         .returning('*')

//         return newDirectory;
// } catch (error) {
//     console.error('Error adding to the Directory')
    
//     if (error.code === '23503') {
//         throw new Error('Am unexpexted Error has occurred while adding to the directory');
//     }
// }

// async function editDirectory

// async function deldirectory

// async function minorEditdirectory


module.exports = { listAlldirectory, getdirectorybyid }