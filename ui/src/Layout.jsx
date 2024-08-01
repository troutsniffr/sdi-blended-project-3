import React from 'react';
import Navbar from './Navbar'; // Create this component separately

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default Layout;