import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Link } from 'react-router-dom';
import { FloatLabel } from 'primereact/floatlabel';

const API_BASE_URL = 'http://localhost:3002/api/v1';

export const HomePage = () => {
  const [stations, setStations] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [newOrgName, setNewOrgName] = useState('');
  const [editingOrg, setEditingOrg] = useState(null);
  const [maxAttendees, setMaxAttendees] = useState(2);
  const [launches, setLaunches] = useState([]);
  const [selectedLaunch, setSelectedLaunch] = useState(null);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetchLaunches();
    loadOrganizations();
  }, []);

  const fetchLaunches = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/builds/`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      console.log(data)
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
          console.log(selectedLaunch.label)
          const response = await fetch(`http://localhost:3002/api/v1/builds/${selectedLaunch.id}/rooms?extended=true`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setRooms(data.map(room => ({ id: room.id, name: room.name })));

        } catch (error) {
          console.error('Error fetching rooms:', error);
        }
      }
    };

    fetchRooms();
  }, [selectedLaunch]);

  useEffect(() => {
    const fetchStations = async () => {
      if (rooms.id) {
        try {
          console.log(rooms)
          console.log(rooms.id)
          const response = await fetch(`http://localhost:3002/api/v1/builds/${selectedLaunch.id}/rooms/${rooms.id}/stations`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setStations(data.map(station => ({ id: station.id, name: station.name })));

        } catch (error) {
          console.error('Error fetching rooms:', error);
        }
      }
    };

    fetchStations();
  }, [rooms.id]);

  const renderStations = () => (
    stations.map((station) => (
      <Card key={station} className="bg-gray-700 border-gray-600">
        <h2 className="font-bold mb-2">Station {station}</h2>
        <div className="flex flex-col gap-2">
          {[1, 2, 3].map((duty) => (
            <InputText key={duty} placeholder="Name/duty" className="bg-gray-600 border-gray-500" />
          ))}
        </div>
      </Card>
    ))
  );

  const renderOrganizationManager = () => (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center space-x-2">
        <Dropdown
          value={selectedOrg}
          options={organizations}
          onChange={(e) => setSelectedOrg(e.value)}
          placeholder="Select Organization"
          className="bg-gray-700 border-gray-600 flex-grow"
        />
        <Button icon="pi pi-pencil" onClick={() => startEditOrg(selectedOrg)} disabled={!selectedOrg} />
      </div>

      <div className="flex items-center space-x-2">
        <InputText
          value={newOrgName}
          onChange={(e) => setNewOrgName(e.target.value)}
          placeholder={editingOrg ? "Edit organization name" : "New organization name"}
          className="flex-grow"
        />
        {editingOrg ? (
          <>
            <Button label="Save" icon="pi pi-check" onClick={saveEditOrg} />
            <Button label="Cancel" icon="pi pi-times" onClick={cancelEdit} className="p-button-secondary" />
          </>
        ) : (
          <Button label="Add" icon="pi pi-plus" onClick={addNewOrg} />
        )}
      </div>
      <FloatLabel>
        <InputText
          id="maxAttendees"
          value={maxAttendees}
          onChange={(e) => {
            const value = parseInt(e.target.value, 10);
            if (!isNaN(value) && value >= 0) {
              setMaxAttendees(value);
            }
          }}
          type="number"
          min="1"
        />
        <label htmlFor="maxAttendees">Max Attendees</label>
      </FloatLabel>

      <Link
        to={`/OrgManager/${selectedOrg}/${maxAttendees}`}
        className={`p-button p-button-info ${(!selectedOrg || maxAttendees <= 0) ? 'p-disabled' : ''}`}
      >
        Create Org Manager Invite Link
      </Link>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <Card className="w-full max-w-4xl bg-gray-800 border border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Homepage</h1>
          <div className="flex gap-2">
            <Dropdown
              className="w-full mb-2"
              placeholder="select launch"
              options={launches}
              value={selectedLaunch}
              onChange={(e) => setSelectedLaunch(e.value)}
              optionLabel="label"
            />
            <Button label="Edit" className="p-button-outlined" />
            <Link to='/launchbuilder'><Button label="New" className="p-button-outlined" /></Link>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          {renderLaunchInfo()}
          <h1>Rooms</h1>
          {rooms.map((room) => (
              <Button key={room.id} label={`Room ${room.name}`}className="p-button-outlined w-full" value={rooms} onClick={renderStations}/>/*filter stations to selected room onClick*/
            ))}

        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          {renderStations()}
        </div>

        {renderOrganizationManager()}
      </Card>
    </div>
  );
};