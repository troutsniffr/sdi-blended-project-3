import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export const LaunchBuilder = () => {
  const [rooms, setRooms] = useState(['room 1', 'room 2']);
  const [names, setNames] = useState([
    { name: 'Mr. Somebody', org: 'Boeing', dutyTitle: 'SPO' },
    { name: 'Mr. Somebodyelse', org: 'Boeing', dutyTitle: 'SPO' },
    { name: 'Mr. anotherperson', org: 'Boeing', dutyTitle: 'SPO' },
  ]);

  const addRoom = () => {
    setRooms([...rooms, `room ${rooms.length + 1}`]);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <Card className="w-full max-w-6xl bg-gray-800 border border-gray-700">
        <h1 className="text-2xl font-bold mb-4">Launch builder page - Admin</h1>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h2 className="text-xl mb-2">launch builder</h2>
            <Dropdown className="w-full mb-2" placeholder="select launch" />
            
            <h3 className="text-lg mb-2">Rooms</h3>
            {rooms.map((room, index) => (
              <Dropdown key={index} className="w-full mb-2" value={room} options={[room]} />
            ))}
            <Button label="Add/Create New Room +" onClick={addRoom} className="p-button-outlined w-full" />
            
            <h3 className="text-lg mt-4 mb-2">Station</h3>
            {['Station 1', 'Station 2', 'Station 3'].map((station, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <Button label={station} className={index === 0 ? "p-button-warning" : "p-button-outlined"} />
                {[1, 2, 3].map((_, i) => (
                  <InputText key={i} placeholder="Name/duty" className="flex-grow" />
                ))}
              </div>
            ))}
            
            <Button label="Create launch seating plan" className="p-button-success mt-4" />
          </div>
          
          <div>
            <h2 className="text-xl mb-2">Names</h2>
            <Dropdown className="w-full mb-2" placeholder="ORG" />
            <Dropdown className="w-full mb-2" placeholder="Duty Title" />
            
            <DataTable value={names} className="mt-2">
              <Column field="name" header="Name" />
              <Column field="org" header="Org" />
              <Column field="dutyTitle" header="Duty Title" />
            </DataTable>
            
            <Button label="assign attendee" className="p-button-info mt-4" />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LaunchBuilder;