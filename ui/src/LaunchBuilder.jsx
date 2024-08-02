import React, { useState, useEffect } from 'react'
import { Card } from 'primereact/card'
import { Dropdown } from 'primereact/dropdown'
import { Button } from 'primereact/button'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'

export const LaunchBuilder = () => {
  const [launches, setLaunches] = useState([])
  const [selectedLaunch, setSelectedLaunch] = useState(null)

  const [rooms, setRooms] = useState([])
  const [selectedRoom, setSelectedRoom] = useState(null)

  const [stations, setStations] = useState([])
  const [selectedStation, setSelectedStation] = useState(null)

  const [orgs, setOrgs] = useState([])
  const [selectedOrg, setSelectedOrg] = useState(null)

  const [names, setNames] = useState([
    { id: 1, name: 'Mr. Somebody', org: 'Boeing', dutyTitle: 'SPO' },
    { id: 2, name: 'Mr. Somebodyelse', org: 'Boeing', dutyTitle: 'SPO' },
    { id: 3, name: 'Mr. anotherperson', org: 'Boeing', dutyTitle: 'SPO' },
  ])

  useEffect(() => {
    const fetchLaunches = async () => {
      try {
        const response = await fetch('http://localhost:3002/api/v1/builds/')
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const launches = await response.json()
        setLaunches(launches)
      } catch (error) {
        console.error('Error fetching launches:', error)
      }
    }

    fetchLaunches()
  }, [])

  const addRoom = async () => {
    if (selectedLaunch) {
      try {
        const response = await fetch(
          `http://localhost:3002/api/v1/builds/${selectedLaunch}/rooms`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: `Room ${rooms.length + 1}` }),
          },
        )
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const newRoom = await response.json()
        setRooms([
          ...rooms,
          {
            id: newRoom.id,
            launch_id: selectedLaunch,
            room_id: newRoom.room_id,
          },
        ])
      } catch (error) {
        console.error('Error adding room:', error)
      }
    }
  }

  useEffect(() => {
    const fetchRooms = async () => {
      if (selectedLaunch) {
        try {
          const response = await fetch(
            `http://localhost:3002/api/v1/builds/${selectedLaunch}/rooms?extended=true`,
          )
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }
          const rooms = await response.json()
          setRooms(rooms)
        } catch (error) {
          console.error('Error fetching rooms:', error)
        }
      }
    }

    fetchRooms()
  }, [selectedLaunch])

  useEffect(() => {
    const fetchRoomSeats = async () => {
      if (selectedRoom) {
        try {
          const response = await fetch(
            `http://localhost:3002/api/v1/rooms/${selectedRoom}/stations`,
          )
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }
          const { stations } = await response.json()
          setStations(stations)
        } catch (error) {
          console.error('Error fetching seats:', error)
        }
      }
    }

    fetchRoomSeats()
  }, [selectedRoom])

  useEffect(() => {
    const fetchOrgs = async () => {
      try {
        const response = await fetch('http://localhost:3002/api/v1/orgs/')
        if (!response.ok) {
          throw new Error('Network reponse was not ok')
        }
        const orgs = await response.json()
        console.log(orgs)
        setOrgs(orgs)
      } catch (error) {
        console.error('Error fetching launches:', error)
      }
    }

    fetchOrgs()
  }, [])

  return (
    <div>
      <Card>
        <h1 className='text-2xl font-bold mb-4'>Launch builder page - Admin</h1>

        <div className='grid grid-cols-2 gap-4'>
          <div>
            <h2 className='text-xl mb-2'>launch builder</h2>
            <Dropdown
              className='w-full mb-2'
              placeholder='select launch'
              options={launches}
              optionLabel='name'
              optionValue='id'
              value={selectedLaunch}
              onChange={(e) => setSelectedLaunch(e.value)}
            />

            {selectedLaunch && (
              <>
                <h3>Rooms</h3>
                <Dropdown
                  placeholder='select room'
                  options={rooms}
                  optionLabel='name'
                  optionValue='id'
                  value={selectedRoom}
                  onChange={(e) => setSelectedRoom(e.value)}
                />

                <Button
                  label='Add Room'
                  onClick={addRoom}
                  className='p-button-outlined w-full'
                />
              </>
            )}

            {selectedRoom && (
              <>
                <h3>Stations</h3>
                <Dropdown
                  placeholder='select station'
                  options={stations}
                  optionLabel='name'
                  optionValue='id'
                  value={selectedStation}
                  onChange={(e) => setSelectedStation(e.value)}
                />
              </>
            )}

            {/* <Button label="Create launch seating plan" className="p-button-outlined mt-4" /> */}
          </div>

          <div>
            <h2 className='text-xl mb-2'>Names</h2>
            <Dropdown
              placeholder='select org'
              options={orgs}
              optionLabel='name'
              optionValue='id'
              value={selectedOrg}
              onChange={(e) => setSelectedOrg(e.value)}
            />

            <Dropdown filter className='w-full mb-2' placeholder='Duty Title' />

            <DataTable value={names} className='mt-2' datakey='id'>
              <Column field='name' header='Name' />
              <Column field='org' header='Org' />
              <Column field='dutyTitle' header='Duty Title' />
            </DataTable>

            <Button
              label='assign attendee'
              className='p-button-outlined mt-4'
            />
          </div>
        </div>
      </Card>
    </div>
  )
}

export default LaunchBuilder
