import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Panel } from 'primereact/panel';
import { PickList } from 'primereact/picklist';

export const OrgManager = () => {
  const [source, setSource] = useState([
    { name: 'Mr. Somebody', org: 'Boeing', dutyTitle: 'SPO' },
    { name: 'Mr. Somebodyelse', org: 'Boeing', dutyTitle: 'SPO' },
    { name: 'Mr. anotherperson', org: 'Boeing', dutyTitle: 'SPO' },
  ]);

  const [newAttendee, setNewAttendee] = useState({
    name: '',
    org: '',
    dutyTitle: '',
    phone: '',
    email: ''
  });

  const [target, setTarget] = useState([
    { name: 'Mr. anotherperson', org: 'Boeing', dutyTitle: 'SPO', phone: 'XXX-XXX-XXXX', email: '' },
    { name: 'Mr. Somebody', org: 'Boeing', dutyTitle: 'SPO', phone: 'XXX-XXX-XXXX', email: '' },
  ]);

  const onChange = (event) => {
    setSource(event.source);
    setTarget(event.target);
  };

  const itemTemplate = (item) => {
    return (
      <div className="flex flex-col p-2">
        <span className="font-bold mb-2">{item.name}</span>
        <span>{item.org} - {item.dutyTitle}</span>
      </div>
    );
  };
  const renderCreateAttendeePanel = () => (
    <Panel className="mb-2">
      <div className="p-fluid">
        <div className="p-field">
          <InputText placeholder="Name" value={newAttendee.name} onChange={(e) => createAttendee('name', e.target.value)} />
        </div>
        <div className="p-field">
          <InputText placeholder="Org" value={newAttendee.org} onChange={(e) => createAttendee('org', e.target.value)} />
        </div>
        <div className="p-field">
          <InputText placeholder="Duty title" value={newAttendee.dutyTitle} onChange={(e) => createAttendee('dutyTitle', e.target.value)} />
        </div>
        <div className="p-field">
          <InputText placeholder="Phone" value={newAttendee.phone} onChange={(e) => createAttendee('phone', e.target.value)} />
        </div>
        <div className="p-field">
          <InputText placeholder="Email" value={newAttendee.email} onChange={(e) => createAttendee('email', e.target.value)} />
        </div>
      </div>
      <Button label="Add Attendee" onClick={addNewAttendee} className="mt-2" />
    </Panel>
  );

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

  const createAttendee = (field, value) => {
    setNewAttendee(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addNewAttendee = () => {
    if (newAttendee.name && newAttendee.org && newAttendee.dutyTitle) {
      setSource(prev => [...prev, newAttendee]);
      setNewAttendee({
        name: '',
        org: '',
        dutyTitle: '',
        phone: '',
        email: ''
      });
    }
  }

  const updateAttendee = (index, field, value) => {
    const updatedTarget = [...target];
    updatedTarget[index][field] = value;
    setTarget(updatedTarget);
  };

  return (
    <div>
      <Card title="Org manager page - user">
        <div className="grid">
          <div className="col-12 md:col-6">
            <Card title="Launch management" className="h-full">
              <h3>Attendee Selection</h3>
              <PickList
                source={source}
                target={target}
                onChange={onChange}
                itemTemplate={itemTemplate}
                filter
                filterBy="name"
                breakpoint="1280px"
                sourceHeader="Available"
                targetHeader="Selected"
                sourceStyle={{ height: '24rem' }}
                targetStyle={{ height: '24rem' }}
                sourceFilterPlaceholder="Search by name"
                targetFilterPlaceholder="Search by name"
              />
              <div className="text-orange-500 mt-4">Max Attendees: 2</div>
            </Card>
          </div>
          <div className="col-12 md:col-6">
            <Card title="Selected Attendees" className="h-full">
              {target.map(renderAttendeePanel)}
            </Card>
            <Card>
              <h3>Create New Attendee</h3>
              {renderCreateAttendeePanel()}
            </Card>
          </div>
        </div>
      </Card>
    </div>
  );
};