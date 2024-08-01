import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';

export const NavBar = () => {
  return (
    <div>
      <h1>Launch Seating Chart</h1>
      <Link to='/'><Button className="p-button-outlined">HOME</Button></Link>
      <Link to='/roombuilder'><Button className="p-button-outlined">Create New Room</Button></Link>
      <Link to='/launchbuilder'><Button className="p-button-outlined">Create New Launch</Button></Link>
    </div>
  )
}