/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('stations').del()
  await knex('stations').insert([
    { name: 'RNG01', capacity: 1, room_id: 1}, // id: 1; Range Room
    { name: 'RNG02', capacity: 1, room_id: 1}, // id: 2; Range Room
    { name: 'RNG03', capacity: 1, room_id: 1}, // id: 3; Range Room
    { name: 'RNG04', capacity: 1, room_id: 1}, // id: 4; Range Room
    { name: 'RNG05', capacity: 1, room_id: 1}, // id: 5; Range Room
    { name: 'RNG06', capacity: 1, room_id: 1}, // id: 6; Range Room
    { name: 'RNG07', capacity: 1, room_id: 1}, // id: 7; Range Room
    { name: 'RNG08', capacity: 1, room_id: 1}, // id: 8; Range Room
    { name: 'RNG09', capacity: 1, room_id: 1}, // id: 9; Range Room
    { name: 'RNG10', capacity: 1, room_id: 1}, // id: 10; Range Room
    { name: 'RNG11', capacity: 1, room_id: 1}, // id: 11; Range Room
    { name: 'RNG12', capacity: 1, room_id: 1}, // id: 12; Range Room
    { name: 'RNG13', capacity: 1, room_id: 1}, // id: 13; Range Room
    { name: 'RNG14', capacity: 1, room_id: 1}, // id: 14; Range Room
    { name: 'RNG15', capacity: 1, room_id: 1}, // id: 15; Range Room
    { name: 'CUST01', capacity: 1, room_id: 2}, // id: 16; Customer Room
    { name: 'CUST02', capacity: 1, room_id: 2}, // id: 17; Customer Room
    { name: 'CUST03', capacity: 1, room_id: 2}, // id: 18; Customer Room
    { name: 'CUST04', capacity: 1, room_id: 2}, // id: 19; Customer Room
    { name: 'CUST05', capacity: 1, room_id: 2}, // id: 20; Customer Room
    { name: 'CUST06', capacity: 1, room_id: 2}, // id: 21; Customer Room
    { name: 'CUST07', capacity: 1, room_id: 2}, // id: 22; Customer Room
    { name: 'CUST08', capacity: 1, room_id: 2}, // id: 23; Customer Room
    { name: 'CUST09', capacity: 1, room_id: 2}, // id: 24; Customer Room
    { name: 'CUST10', capacity: 1, room_id: 2}, // id: 25; Customer Room
    { name: 'A1', capacity: 2, room_id: 4 }, // id: 26; MVLSC Room 214
    { name: 'A2', capacity: 2, room_id: 4 }, // id: 27; MVLSC Room 214
    { name: 'A3', capacity: 2, room_id: 4 }, // id: 28; MVLSC Room 214
    { name: 'A4', capacity: 2, room_id: 4 }, // id: 29; MVLSC Room 214
    { name: 'A5', capacity: 2, room_id: 4 }, // id: 30; MVLSC Room 214
    { name: 'A6', capacity: 2, room_id: 4 }, // id: 31; MVLSC Room 214
    { name: 'B1', capacity: 2, room_id: 4 }, // id: 32; MVLSC Room 214
    { name: 'B2', capacity: 2, room_id: 4 }, // id: 33; MVLSC Room 214
    { name: 'B3', capacity: 2, room_id: 4 }, // id: 34; MVLSC Room 214
    { name: 'B4', capacity: 2, room_id: 4 }, // id: 35; MVLSC Room 214
    { name: 'B5', capacity: 2, room_id: 4 }, // id: 36; MVLSC Room 214
    { name: 'B6', capacity: 2, room_id: 4 }, // id: 37; MVLSC Room 214
    { name: 'C1A', capacity: 2, room_id: 4 }, // id: 38; MVLSC Room 214
    { name: 'C1', capacity: 2, room_id: 4 }, // id: 39; MVLSC Room 214
    { name: 'C2', capacity: 2, room_id: 4 }, // id: 40; MVLSC Room 214
    { name: 'AG3', capacity: 2, room_id: 4 }, // id: 41; MVLSC Room 214
    { name: 'C4', capacity: 2, room_id: 4 }, // id: 42; MVLSC Room 214
    { name: 'D1', capacity: 2, room_id: 4 }, // id: 43; MVLSC Room 214
    { name: 'D2', capacity: 2, room_id: 4 }, // id: 44; MVLSC Room 214
    { name: 'D3', capacity: 2, room_id: 4 }, // id: 45; MVLSC Room 214
    { name: 'D4', capacity: 2, room_id: 4 }, // id: 46; MVLSC Room 214
    { name: 'D5', capacity: 2, room_id: 4 }, // id: 47; MVLSC Room 214
    { name: 'D6', capacity: 2, room_id: 4 }, // id: 48; MVLSC Room 214
    { name: 'E1', capacity: 2, room_id: 4 }, // id: 49; MVLSC Room 214
    { name: 'E2', capacity: 2, room_id: 4 }, // id: 50; MVLSC Room 214
    { name: 'E3', capacity: 2, room_id: 4 }, // id: 51; MVLSC Room 214
    { name: 'E4', capacity: 2, room_id: 4 }, // id: 52; MVLSC Room 214
    { name: 'E5', capacity: 2, room_id: 4 }, // id: 53; MVLSC Room 214
    { name: 'E6', capacity: 2, room_id: 4 }, // id: 54; MVLSC Room 214
    { name: 'E7', capacity: 2, room_id: 4 }, // id: 55; MVLSC Room 214
  ]);
};
