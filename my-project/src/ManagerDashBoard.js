import React from 'react';
import { Link } from 'react-router-dom';

const ManagerDashBoard = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full p-8 rounded-lg shadow-lg bg-white md:max-w-2xl lg:max-w-4xl">
        <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-4">Manager Dashboard</h2>
        <p className="text-lg text-gray-600 text-center mb-8">Manager controls and settings</p>
        <div className="flex flex-col items-center gap-4">
          <Link
            to="/manager/manage-users"
            className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg text-center w-4/5"
          >
            Manage Users
          </Link>
         
         
          <Link
            to="/manager/view-notes"
            className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-6 rounded-lg text-center w-4/5"
          >
            View Notes
          </Link>
          <Link
            to="/dashboard"
            className="bg-indigo-500 hover:bg-indigo-600 text-white py-3 px-6 rounded-lg text-center w-4/5"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashBoard;
