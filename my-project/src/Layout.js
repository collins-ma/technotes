import React from 'react';
import { Outlet } from 'react-router-dom'; // Import Outlet

function Layout() {
  return (
    <div>
    
      <main>
        <Outlet /> {/* Render child routes here */}
      </main>
    </div>
  );
}

export default Layout;
