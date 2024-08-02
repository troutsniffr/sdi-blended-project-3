import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Card } from 'primereact/card'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Panel } from 'primereact/panel'
import { PickList } from 'primereact/picklist'
import { Link } from 'react-router-dom'

export const OrgManager = () => {
  const [organization, setOrganization] = useState(null)
  const { id: orgId, maxAttendees } = useParams()
  const [source, setSource] = useState([
    { name: 'Mr. Somebody', org: '5 SLS', dutyTitle: 'FML' },
    { name: 'Mr. Somebodyelse', org: 'SPO', dutyTitle: 'Prop' },
    { name: 'Mr. anotherperson', org: 'SSC', dutyTitle: 'Eng' },
  ])
  const [roster, setRoster] = useState([])

  const [newAttendee, setNewAttendee] = useState({
    name: '',
    org: '',
    dutyTitle: '',
    phone: '',
    email: '',
  })

  const [target, setTarget] = useState([
    {
      name: 'Mr. anotherperson',
      org: 'Boeing',
      dutyTitle: 'SPO',
      phone: 'XXX-XXX-XXXX',
      email: '',
    },
    {
      name: 'Mr. Somebody',
      org: 'Boeing',
      dutyTitle: 'SPO',
      phone: 'XXX-XXX-XXXX',
      email: '',
    },
  ])

  useEffect(() => {
    // Fetch organization data
    const fetchOrganization = async () => {
      try {
        const response = await fetch(
          `http://localhost:3002/api/v1/orgs/${orgId}`,
        )
        const data = await response.json()
        setOrganization(data)
      } catch (error) {
        console.error('Error fetching organization:', error)
      }
    }

    // Fetch attendees data from directory
    const fetchAttendees = async () => {
      try {
        const response = await fetch('http://localhost:3002/api/v1/directory')
        const data = await response.json()

        // Filter attendees by orgId and set the source
        const filteredAttendees = data
          .filter((attendee) => attendee.org_id === orgId)
          .map((attendee) => ({
            name: attendee.name,
            org: attendee.org,
            dutyTitle: attendee.dutyTitle,
            phone: attendee.phone || '',
            email: attendee.email || '',
          }))
      } catch (error) {
        console.error('Error fetching attendees:', error)
      }
    }

    fetchOrganization()
    fetchAttendees()
  }, [orgId])

  const onChange = (event) => {
    setSource(event.source)
    setTarget(event.target)
  }

  const itemTemplate = (item) => {
    return (
      <div className='flex flex-col p-2'>
        <span className='font-bold mb-2'>{item.name}</span>
        <span>
          {item.org} - {item.dutyTitle}
        </span>
      </div>
    )
  }
  const renderCreateAttendeePanel = () => (
    <Panel className='mb-2'>
      <div className='p-fluid'>
        <div className='p-field'>
          <InputText
            placeholder='Name'
            value={newAttendee.name}
            onChange={(e) => createAttendee('name', e.target.value)}
          />
        </div>
        <div className='p-field'>
          <InputText
            placeholder='Org'
            value={newAttendee.org}
            onChange={(e) => createAttendee('org', e.target.value)}
          />
        </div>
        <div className='p-field'>
          <InputText
            placeholder='Duty title'
            value={newAttendee.dutyTitle}
            onChange={(e) => createAttendee('dutyTitle', e.target.value)}
          />
        </div>
        <div className='p-field'>
          <InputText
            placeholder='Phone'
            value={newAttendee.phone}
            onChange={(e) => createAttendee('phone', e.target.value)}
          />
        </div>
        <div className='p-field'>
          <InputText
            placeholder='Email'
            value={newAttendee.email}
            onChange={(e) => createAttendee('email', e.target.value)}
          />
        </div>
      </div>
      <Button label='Add Attendee' onClick={addNewAttendee} className='mt-2' />
    </Panel>
  )

  const renderAttendeePanel = (attendee, index) => (
    <Panel key={index} className='mb-2'>
      <div className='p-fluid'>
        <div className='p-field'>
          <InputText
            placeholder='Name'
            value={attendee.name}
            onChange={(e) => updateAttendee(index, 'name', e.target.value)}
          />
        </div>
        <div className='p-field'>
          <InputText
            placeholder='Org'
            value={attendee.org}
            onChange={(e) => updateAttendee(index, 'org', e.target.value)}
          />
        </div>
        <div className='p-field'>
          <InputText
            placeholder='Duty title'
            value={attendee.dutyTitle}
            onChange={(e) => updateAttendee(index, 'dutyTitle', e.target.value)}
          />
        </div>
        <div className='p-field'>
          <InputText
            placeholder='Phone'
            value={attendee.phone}
            onChange={(e) => updateAttendee(index, 'phone', e.target.value)}
          />
        </div>
        <div className='p-field'>
          <InputText
            placeholder='Email'
            value={attendee.email}
            onChange={(e) => updateAttendee(index, 'email', e.target.value)}
          />
        </div>
      </div>
    </Panel>
  )

  const createAttendee = (field, value) => {
    setNewAttendee((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const addNewAttendee = async () => {
    if (newAttendee.name && newAttendee.org && newAttendee.dutyTitle) {
      try {
        const response = await fetch('/api/v1/directory', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newAttendee),
        })
        const addedAttendee = await response.json()
        setSource((prev) => [...prev, addedAttendee])
        setNewAttendee({
          name: '',
          org: '',
          dutyTitle: '',
          phone: '',
          email: '',
        })
      } catch (error) {
        console.error('Error adding new attendee:', error)
      }
    }
  }

  const updateAttendee = async (index, field, value) => {
    const updatedAttendee = { ...target[index], [field]: value }
    try {
      const response = await fetch(`/api/v1/directory/${updatedAttendee.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedAttendee),
      })
      const updatedAttendeeFromServer = await response.json()
      const updatedTarget = [...target]
      updatedTarget[index] = updatedAttendeeFromServer
      setTarget(updatedTarget)
    } catch (error) {
      console.error('Error updating attendee:', error)
    }
  }

  return (
    <div>
      <Link to='/'>
        <Button>HOME</Button>
      </Link>
      <Card
        title={`Org manager page - ${
          organization ? organization.name : 'Loading...'
        }`}
      >
        <div className='grid'>
          <div className='col-12 md:col-6'>
            <Card title='Attendee Selection' className='h-full'>
              <PickList
                source={source}
                target={target}
                onChange={onChange}
                itemTemplate={itemTemplate}
                filter
                filterBy='full_name,duty_title'
                breakpoint='1280px'
                sourceHeader='Available'
                targetHeader='Selected'
                sourceStyle={{ height: '24rem' }}
                targetStyle={{ height: '24rem' }}
                sourceFilterPlaceholder='Search by name or duty title'
                targetFilterPlaceholder='Search by name or duty title'
              />
              <div className='text-orange-500 mt-4'>
                Max Attendees: {maxAttendees}
              </div>
            </Card>
          </div>
          <div className='col-12 md:col-6'>
            <Card title='Selected Attendees' className='h-full'>
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
  )
}
