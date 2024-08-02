import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Link, useNavigate } from 'react-router-dom';
import { FloatLabel } from 'primereact/floatlabel';
import { ListBox } from 'primereact/listbox';

const API_BASE_URL = 'http://localhost:3002/api/v1';

export const HomePage = () => {
  const [slotDetails, setSlotDetails] = useState({});
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [stations, setStations] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [newOrgName, setNewOrgName] = useState('');
  const [editingOrg, setEditingOrg] = useState(null);
  const [maxAttendees, setMaxAttendees] = useState(2);
  const [launches, setLaunches] = useState([]);
  const [selectedLaunch, setSelectedLaunch] = useState(null);
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();


  const handleRoomSelection = (room) => {
    setSelectedRoom(room);
    setStations([]);
    setSlotDetails({});
  };

  const handleLaunchSelection = (selectedLaunch) => {
    setSelectedLaunch(selectedLaunch);
    setSelectedRoom(null);
    setStations([]);
    setSlotDetails({});
  };

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await fetch('/api/v1/orgs');
        const data = await response.json();
        setOrganizations(data.map(org => ({ label: org.name, value: org.id })));
      } catch (error) {
        console.error('Error fetching organizations:', error);
      }
    };

    fetchOrganizations();
  }, []);

  const handleCreateInvite = () => {
    console.log(selectedOrg)
    if (selectedOrg && maxAttendees > 0) {
      navigate(`/OrgManager/${selectedOrg}/${maxAttendees}`);
    }
  };

  useEffect(() => {
    fetchLaunches();
    loadOrganizations();
  }, []);

  const fetchLaunches = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/builds/`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setLaunches(data.map(launch => ({
        label: launch.name,
        value: { date: launch.date, id: launch.id, label: launch.name }
      })));
    } catch (error) {
      console.error('Error fetching launches:', error);
    }
  };

  const loadOrganizations = async () => {
    try {
      const orgs = await fetchOrganizations();
      setOrganizations(orgs.map(org => ({ label: org.name, value: org.id })));
    } catch (error) {
      console.error('Failed to fetch organizations:', error);
    }
  };

  const fetchOrganizations = async () => {
    const response = await fetch(`${API_BASE_URL}/orgs`);
    if (!response.ok) throw new Error('Failed to fetch organizations');
    return response.json();
  };

  const createOrganization = async (orgName) => {
    const response = await fetch(`${API_BASE_URL}/orgs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: orgName }),
    });
    if (!response.ok) throw new Error('Failed to create organization');
    return response.json();
  };

  const updateOrganization = async (orgId, orgName) => {
    const response = await fetch(`${API_BASE_URL}/orgs/${orgId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: orgName }),
    });
    if (!response.ok) throw new Error('Failed to update organization');
    return response.json();
  };

  const addNewOrg = async () => {
    if (newOrgName.trim()) {
      try {
        const newOrg = await createOrganization(newOrgName);
        setOrganizations([...organizations, { label: newOrg.name, value: newOrg.id }]);
        setNewOrgName('');
      } catch (error) {
        console.error('Failed to create organization:', error);
      }
    }
  };

  const startEditOrg = (org) => {
    setEditingOrg(org);
    setNewOrgName(org.label);
  };

  const saveEditOrg = async () => {
    if (newOrgName.trim() && editingOrg) {
      try {
        const updatedOrg = await updateOrganization(editingOrg.value, newOrgName);
        const updatedOrgs = organizations.map(org =>
          org.value === editingOrg.value ? { label: updatedOrg.name, value: updatedOrg.id } : org
        );
        setOrganizations(updatedOrgs);
        setEditingOrg(null);
        setNewOrgName('');
      } catch (error) {
        console.error('Failed to update organization:', error);
      }
    }
  };

  const cancelEdit = () => {
    setEditingOrg(null);
    setNewOrgName('');
  };

  const renderLaunchInfo = () => (
    selectedLaunch && (
      <Card className="col-span-1 bg-gray-700 border-gray-600">
        <h2 className="font-bold mb-2">Description</h2>
        <p>{selectedLaunch.label}</p>
        <p>{selectedLaunch.date}</p>
      </Card>
    )
  );

  useEffect(() => {
    const fetchRooms = async () => {
      if (selectedLaunch) {
        try {
          console.log('Fetching rooms for launch:', selectedLaunch.label);
          const response = await fetch(`${API_BASE_URL}/builds/${selectedLaunch.id}/rooms?extended=true`);
          if (!response.ok) throw new Error('Network response was not ok');
          const data = await response.json();
          console.log('Rooms for each launch:', data);
          setRooms(data.map(room => ({
            otherId: room.room_id,
            id: room.id,
            name: room.name,
            buildId: room.build.id
          })));
        } catch (error) {
          console.error('Error fetching rooms:', error);
        }
      }
    };

    fetchRooms();
  }, [selectedLaunch]);
  useEffect(() => {
    console.log(rooms)
  }, [rooms]);
  useEffect(() => {
    const fetchStations = async () => {
      if (selectedLaunch && selectedRoom) {
        try {
          console.log('Fetching stations for room:', selectedRoom.id);
          if(selectedRoom.id == 1 && selectedLaunch.id == 1){setSelectedRoom({id:4})}
          const response = await fetch(`${API_BASE_URL}/builds/${selectedLaunch.id}/rooms/${selectedRoom.id}/stations?extended=true`);
          if (!response.ok) throw new Error('Network response was not ok');
          const data = await response.json();
          console.log('Fetched station data:', data);
          setStations(data.stations.map(station => ({
            id: station.id,
            name: station.name,
            capacity: station.capacity,
            slots: station.slots
          })));
        } catch (error) {
          console.error('Error fetching stations:', error);
        }
      }
    };

    fetchStations();
  }, [selectedLaunch, selectedRoom]);

  const renderDetails = () => {
    if (Object.keys(slotDetails).length === 0) return null;

    const details = [
      { label: 'Full Name:', value: slotDetails.full_name },
      { label: 'Duty Title:', value: slotDetails.duty_title },
      { label: 'Organization:', value: slotDetails.organization.name },
      { label: 'Email:', value: slotDetails.email },
      { label: 'Phone Number:', value: slotDetails.phone_number },
    ];

    return (
      <Card className="bg-gray-700 border-gray-600">
        <h2 className="font-bold mb-2">Slot Details</h2>
        <ListBox value={details} options={details} itemTemplate={(item) => (
          <div className="flex flex-column">
            <div className="font-bold">{item.label}</div>
            <div>{item.value}</div>
          </div>
        )} />
      </Card>
    );
  };

  const renderStations = () => (
    stations.map((station) => (
      <Card key={station.id} className="bg-gray-700 border-gray-600">
        <h2 className="font-bold mb-2">Station {station.name}</h2>
        <div className="flex flex-col gap-2">
          {station.slots.map((slot) => (
            <Button
              key={slot.id}
              label={`${slot.full_name} - ${slot.duty_title}`}
              className="bg-gray-600 border-gray-500"
              onClick={() => setSlotDetails(slot)}
            />
          ))}
        </div>
      </Card>
    ))
  );



  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <Card className="w-full max-w-4xl bg-gray-800 border border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Homepage</h1>
          <div className="flex gap-2">
            <Dropdown
              className="w-full mb-2"
              placeholder="Select Launch"
              options={launches}
              value={selectedLaunch}
              onChange={(e) => handleLaunchSelection(e.value)}
              optionLabel="label"
            />
            <Button label="Edit" className="p-button-outlined" />
            <Link to='/launchbuilder'><Button label="New" className="p-button-outlined" /></Link>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          {renderLaunchInfo()}
          <h1>Launch Invite</h1>
          {rooms.map((room) => (
            <Button
              key={room.id}
              label={`Room ${room.name}`}
              onClick={() => handleRoomSelection(room)}
              className={`p-button-outlined w-full ${selectedRoom && selectedRoom.id === room.id ? 'p-button-primary' : ''}`}
            />
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          {renderStations()}
          {renderDetails()}
        </div>



    <div className="flex flex-col space-y-4">
      <Dropdown
        value={selectedOrg}
        options={organizations}
        onChange={(e) => setSelectedOrg(e.value)}
        placeholder="Select Organization"
        className="w-full"
      />
      <InputText
        type="number"
        value={maxAttendees}
        onChange={(e) => setMaxAttendees(e.target.value)}
        placeholder="Max Attendees"
        className="w-full"
      />
      <Button
        label="Create Org Manager Invite Link"
        onClick={handleCreateInvite}
        disabled={!selectedOrg || maxAttendees <= 0}
        className="w-full"
      />
    </div>
      </Card>
    </div>
  );
};