import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Link } from 'react-router-dom';

export const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <Card className="w-full max-w-4xl bg-gray-800 border border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Homepage</h1>
          <div className="flex gap-2">
            <Dropdown placeholder="Launches" className="bg-gray-700 border-gray-600" />
            <Button label="Edit" className="p-button-outlined" />
            <Link to='/launchbuilder'><Button label="New" className="p-button-outlined" /></Link>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <Card className="col-span-1 bg-gray-700 border-gray-600">
            <h2 className="font-bold mb-2">Description</h2>
            <p>launch name</p>
            <p>org</p>
            <p>information</p>
          </Card>
          <Card className="col-span-2 bg-gray-700 border-gray-600">
            <h2 className="font-bold mb-2">Rooms</h2>
            <div className="flex gap-2">
              <Button label="Room 1" className="p-button-warning" />
              <Button label="Room 2" className="p-button-outlined" />
              <Button label="Room 3" className="p-button-outlined" />
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          {[1, 2, 3].map((station) => (
            <Card key={station} className="bg-gray-700 border-gray-600">
              <h2 className="font-bold mb-2">Station {station}</h2>
              <div className="flex flex-col gap-2">
                {[1, 2, 3].map((duty) => (
                  <InputText key={duty} placeholder="Name/duty" className="bg-gray-600 border-gray-500" />
                ))}
              </div>
            </Card>
          ))}
        </div>

        <div className="flex justify-between">
          <Dropdown placeholder="org selection" className="bg-gray-700 border-gray-600" />
          <Link to='/OrgManager'><Button label="Create Org Manager Invite link" className="p-button-info" /></Link>
        </div>
      </Card>
    </div>
  );
};

