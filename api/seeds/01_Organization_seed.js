/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('organizations').del()
  await knex('organizations').insert([
    {name: 'SpaceX'}, // id: 1
    {name: 'FAA'}, // id: 2
    {name: 'OSM'}, // id: 3
    {name: 'Boeing'}, // id: 4
    {name: 'Lockheed Martin'}, // id: 5
    {name: 'Blue Origin'}, // id: 6
    {name: 'Northrop Grumman'}, // id: 7
    {name: 'Raytheon Technologies'}, // id: 8
    {name: 'General Dynamics'}, // id: 9
    {name: 'L3Harris Technologies'}, // id: 10
    {name: 'Huntington Ingalls Industries'}, // id: 11
    {name: 'Leidos'}, // id: 12
    {name: 'Honeywell Aerospace'}, // id: 13
    {name: 'Sierra Nevada Corporation'}, // id: 14
    {name: 'Textron'}, // id: 15
    {name: 'BAE Systems'}, // id: 16
    {name: 'United Launch Alliance'}, // id: 17
    {name: 'Virgin Galactic'}, // id: 18
    {name: 'Aerojet Rocketdyne'}, // id: 19
    {name: 'NASA'}, // id: 20
    {name: 'DARPA'}, // id: 21
    {name: 'Orbital ATK'}, // id: 22
    {name: 'Collins Aerospace'}, // id: 23
    {name: 'Airbus U.S.'}, // id: 24
    {name: 'Rocket Lab USA'}, // id: 25
    {name: 'Dynetics'}, // id: 26
    {name: 'Aerospace Corporation'}, // id: 27
    {name: 'SAIC'}, // id: 28
    {name: 'Ball Aerospace'}, // id: 29
    {name: 'Maxar Technologies'}, // id: 30
    {name: 'Jacobs Engineering'}, // id: 31
    {name: 'CACI International'}, // id: 32
    {name: 'Parsons Corporation'}, // id: 33
    {name: 'Booz Allen Hamilton'}, // id: 34
    {name: 'Kratos Defense & Security Solutions'}, // id: 35
    {name: 'Cubic Corporation'}, // id: 36
    {name: 'ManTech International'}, // id: 37
    {name: 'Vectrus'}, // id: 38
    {name: 'Teledyne Technologies'}, // id: 39
    {name: 'CIA'} // id: 40
]);
};
