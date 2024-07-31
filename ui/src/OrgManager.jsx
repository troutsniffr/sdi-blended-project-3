import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Panel } from 'primereact/panel';

export const OrgManager = () => {
  const [attendees, setAttendees] = useState([
    { name: 'Mr. anotherperson', org: 'Boeing', dutyTitle: 'SPO', phone: 'XXX-XXX-XXXX', email: '' },
    { name: 'Mr. anotherperson', org: 'Boeing', dutyTitle: 'SPO', phone: 'XXX-XXX-XXXX', email: '' },
  ]);

  const [roster, setRoster] = useState([
    { name: 'Mr. Somebody', org: 'Boeing', dutyTitle: 'SPO' },
    { name: 'Mr. Somebody', org: 'Boeing', dutyTitle: 'SPO' },
    { name: 'Mr. Somebodyelse', org: 'Boeing', dutyTitle: 'SPO' },
    { name: 'Mr. anotherperson', org: 'Boeing', dutyTitle: 'SPO' },
    { name: 'Mr. Somebody', org: 'Boeing', dutyTitle: 'SPO' },
    { name: 'Mr. Somebodyelse', org: 'Boeing', dutyTitle: 'SPO' },
    { name: 'Mr. anotherperson', org: 'Boeing', dutyTitle: 'SPO', phone: 'XXX-XXX-XXXX', email: '' },
  ]);

  const addAttendee = () => {
    if (attendees.length < 2) {
      setAttendees([...attendees, { name: '', org: '', dutyTitle: '', phone: '', email: '' }]);
    }
  };

  const renderAttendeePanel = (attendee, index) => (
    <Panel key={index} className="mb-2">
      <div className="p-fluid">
        <div className="p-field">
          <InputText placeholder="Name" value={attendee.name} onChange={(e) => updateAttendee(index, 'name', e.target.value)} />
        </div>
        <div className="p-field">
          <InputText placeholder="Org" value={attendee.org} onChange={(e) => updateAttendee(index, 'org', e.target.value)} />
        </div>
        <div className="p-field">
          <InputText placeholder="Duty title" value={attendee.dutyTitle} onChange={(e) => updateAttendee(index, 'dutyTitle', e.target.value)} />
        </div>
        <div className="p-field">
          <InputText placeholder="Phone" value={attendee.phone} onChange={(e) => updateAttendee(index, 'phone', e.target.value)} />
        </div>
        <div className="p-field">
          <InputText placeholder="Email" value={attendee.email} onChange={(e) => updateAttendee(index, 'email', e.target.value)} />
        </div>
      </div>
    </Panel>
  );

  const updateAttendee = (index, field, value) => {
    const updatedAttendees = [...attendees];
    updatedAttendees[index][field] = value;
    setAttendees(updatedAttendees);
  };

  return (
    <div className="p-grid">
      <div className="p-col-12">
        <Card title="Org manager page - user">
          <div className="p-grid">
            <div className="p-col-6">
              <Card title="Launch management" className="h-full">
                <h3>Launch Selection</h3>
                {attendees.map(renderAttendeePanel)}
                <Button label="Add Another Attendee +" onClick={addAttendee} disabled={attendees.length >= 2} className="p-button-text" />
                <div className="text-orange-500 mt-4">Max Attendee: 2</div>
              </Card>
            </div>
            <div className="p-col-6">
              <Card title="Roster" className="h-full">
                <DataTable value={roster} scrollable scrollHeight="400px">
                  <Column field="name" header="Name" />
                  <Column field="org" header="Org" />
                  <Column field="dutyTitle" header="Duty title" />
                  <Column body={() => <Button label="Edit" className="p-button-sm" />} />
                </DataTable>
              </Card>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

