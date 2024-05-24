import React from 'react';
import { Link } from 'react-router-dom';

const Admin = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center">Admin Panel</h2>
        <div className="mt-8 flex flex-col space-y-4">
          <Link
            to="/admin-dashboard"
            className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg text-center block w-full"
          >
          
          </Link>
          {/* Add more links/options for managing users, etc. */}
        </div>
      </div>
    </div>
  );
};

export default Admin;