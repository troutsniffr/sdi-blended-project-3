import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export const LaunchBuilder = () => {
  const [launches, setLaunches] = useState([]);
  const [selectedLaunch, setSelectedLaunch] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [names, setNames] = useState([
    { id: 1, name: 'Mr. Somebody', org: 'Boeing', dutyTitle: 'SPO' },
    { id: 2, name: 'Mr. Somebodyelse', org: 'Boeing', dutyTitle: 'SPO' },
    { id: 3, name: 'Mr. anotherperson', org: 'Boeing', dutyTitle: 'SPO' },
  ]);

  useEffect(() => {
    const fetchLaunches = async () => {
      try {
        const response = await fetch('http://localhost:3002/api/v1/builds/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setLaunches(data.map(launch => ({ label: launch.name, value: launch.id })));
      } catch (error) {
        console.error('Error fetching launches:', error);
      }
    };

    fetchLaunches();
  }, []);



  const addRoom = async () => {
    if (selectedLaunch) {
      try {
        const response = await fetch(`http://localhost:3002/api/v1/builds/${selectedLaunch}/rooms`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: `Room ${rooms.length + 1}` }),
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const newRoom = await response.json();
        setRooms([...rooms, { id: newRoom.id, launch_id: selectedLaunch, room_id: newRoom.room_id }]);
      } catch (error) {
        console.error('Error adding room:', error);
      }
    }
  };
  useEffect(() => {
    const fetchRooms = async () => {
      if (selectedLaunch) {
        try {
          const response = await fetch(`http://localhost:3002/api/v1/builds/${selectedLaunch}/rooms?extended=true`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          console.log(data)
          setRooms(data.map(room => ({ id: room.id, name: room.name })));

        } catch (error) {
          console.error('Error fetching rooms:', error);
        }
      }
    };

    fetchRooms();
  }, [selectedLaunch]);


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <Card className="w-full max-w-6xl bg-gray-800 border border-gray-700">
        <h1 className="text-2xl font-bold mb-4">Launch builder page - Admin</h1>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h2 className="text-xl mb-2">launch builder</h2>
            <Dropdown
              className="w-full mb-2"
              placeholder="select launch"
              options={launches}
              value={selectedLaunch}
              onChange={(e) => setSelectedLaunch(e.value)}
              optionLabel="label"
              optionValue="value"
            />

            <h3 className="text-lg mb-2">Rooms</h3>
            {rooms.map((room) => (
              <Button key={room.id} label={`Room ${room.name}`}className="p-button-outlined w-full" value={rooms} onClick=''/>/*filter stations to selected room onClick*/
            ))}
            <Button label="Add/Create New Room +" onClick={addRoom} className="p-button-outlined w-full" />

            <h3 className="text-lg mt-4 mb-2">Station</h3>
            {rooms.map((room) => (
                <Dropdown
                  key={room.id}
                  className="w-full mb-2"
                  value={room.name}
                  options={[{ label: `Room ${room.name}`, value: room.id }]}
                  optionLabel="label"
                />
              ))}

            <Button label="Create launch seating plan" className="p-button-outlined mt-4" />
          </div>

          <div>
            <h2 className="text-xl mb-2">Names</h2>
            <Dropdown filter className="w-full mb-2" placeholder="ORG" />
            <Dropdown filter className="w-full mb-2" placeholder="Duty Title" />

            <DataTable value={names} className="mt-2" datakey='id'>
              <Column field="name" header="Name" />
              <Column field="org" header="Org" />
              <Column field="dutyTitle" header="Duty Title" />
            </DataTable>

            <Button label="assign attendee" className="p-button-outlined mt-4" />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LaunchBuilder;