import React, { useState, useRef } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';

const API_BASE_URL = 'http://localhost:3002/api/v1'; // Replace with your actual API base URL

export const RoomBuilder = () => {
  const [roomName, setRoomName] = useState('');
  const [stations, setStations] = useState([]);
  const [newStationCapacity, setNewStationCapacity] = useState('');
  const [newStationId, setNewStationId] = useState('');
  const toast = useRef(null);

  const showToast = (severity, summary, detail) => {
    toast.current.show({ severity, summary, detail });
  };

  const addStation = () => {
    if (newStationId && newStationCapacity) {
      setStations([...stations, { id: stations.length + 1, capacity: newStationCapacity, userNextId: newStationId }]);
      setNewStationId('');
      setNewStationCapacity('');
    } else {
      showToast('warn', 'Warning', 'Station ID and Capacity are required');
    }
  };

  const createRoom = async () => {
    if (!roomName.trim()) {
      showToast('warn', 'Warning', 'Room name is required');
      return;
    }

    if (stations.length === 0) {
      showToast('warn', 'Warning', 'At least one station is required');
      return;
    }

    const roomData = {
      name: roomName,
      stations: stations.map(station => ({
        capacity: station.capacity,
        userNextId: station.userNextId
      }))
    };

    try {
      const response = await fetch(`${API_BASE_URL}/rooms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(roomData),
      });

      if (!response.ok) {
        throw new Error('Failed to create room');
      }

      const result = await response.json();
      console.log('Room created:', result);
      showToast('success', 'Success', 'Room created successfully');

      // Reset the form
      setRoomName('');
      setStations([]);
    } catch (error) {
      console.error('Error creating room:', error);
      showToast('error', 'Error', 'Failed to create room');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <Toast ref={toast} />
      <Card title="Room Builder" className="w-[600px] bg-gray-800 text-white">
        <div className="mb-4">
          <InputText
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            placeholder="Room Name"
            className="w-full"
          />
        </div>
        <DataTable value={stations} className="mb-4">
          <Column field="id" header="Station" body={(rowData) => `Station ${rowData.id}`} />
          <Column field="capacity" header="Station Capacity" />
          <Column field="userNextId" header="User Next Id" />
        </DataTable>
        <div className="flex justify-between items-center mb-4">
          <InputText
            value={newStationCapacity}
            onChange={(e) => setNewStationCapacity(e.target.value)}
            placeholder="Station Capacity"
            className="w-[180px]"
          />
          <InputText
            value={newStationId}
            onChange={(e) => setNewStationId(e.target.value)}
            placeholder="Station ID"
            className="w-[180px]"
          />
          <Button
            label="Add Station"
            icon="pi pi-plus"
            onClick={addStation}
            className="p-button-outlined"
          />
        </div>
        <Button
          label="Create Room"
          icon="pi pi-check"
          onClick={createRoom}
          className="p-button-outlined w-full"
        />
      </Card>
    </div>
  );
};