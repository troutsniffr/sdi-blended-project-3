import React, { useState, useEffect} from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export const RoomBuilder = () => {
  const [stations, setStations] = useState([]);
  const [newStationId, setNewStationId] = useState('');
  const [newStationCapacity, setNewStationCapacity] = useState('');
  const [roomName, setRoomName] = useState('');


  useEffect(()=>{
    if (stations.length > 0 && typeof stations[0] === 'string' && stations[0].startsWith('Room Name:')) {
      //push "stations" useState to DB
      console.log(stations)
    }
  }, [stations]);

  const addRoomName = () =>{
    setStations([`Room Name:${roomName}`, ...stations])
    setRoomName('')
  }
  const addStation = () => {
    if (newStationId) {
      setStations([...stations, { id: stations.length + 1, capacity: newStationCapacity, userNextId: newStationId }]);
      setNewStationId('');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <Card title="Room Builder" className="w-[600px] bg-gray-800 text-white">
        <DataTable value={stations} className="mb-4">
          <Column field="id" header="Station" body={(rowData) => `Station ${rowData.id}`} />
          <Column field="capacity" header="Station Capacity" editor={(options) => <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />} />
          <Column field="userNextId" header="User Next Id" editor={(options) => <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />} />
        </DataTable>
        <div className="flex justify-between items-center">
          <InputText value={newStationCapacity} onChange={(e) => setNewStationCapacity(e.target.value)} placeholder="Station Capacity" className="w-[200px]" />
          <InputText value={newStationId} onChange={(e) => setNewStationId(e.target.value)} placeholder="Station ID" className="w-[200px]" />
          <Button label="Add a new Station" icon="pi pi-plus" onClick={addStation} className="p-button-outlined" />
        </div>
        <br></br>
        <div>
        <InputText value={roomName}  onChange={(e) => setRoomName(e.target.value)} placeholder="Room Name" className="w-[200px]" />
        <Button label="Create Room" icon="pi pi-plus" onClick={addRoomName} className="p-button-outlined" />
        </div>
      </Card>
    </div>
  );
};

