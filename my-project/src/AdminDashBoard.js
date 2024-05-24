import React from 'react';
import { Link } from 'react-router-dom';


const AdminDashBoard = () => {
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full p-8 rounded-lg shadow-lg bg-white md:max-w-2xl lg:max-w-4xl">
        <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-4">Admin Dashboard</h2>
        <p className="text-lg text-gray-600 text-center mb-8">Admin controls and settings</p>
        <div className="flex flex-col items-center gap-4">
          <Link
            to="/admin/manage-users"
            className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg text-center w-4/5"
          >
            Manage Users
          </Link>
          <Link
            to="/admin/add-user"
            className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg text-center w-4/5"
          >
            Add New User
          </Link>
          <Link
            to="/admin/view-notes"
            className="bg-blue-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg text-center w-4/5"
          >
            View Notes
          </Link>
          <Link
            to="/dashboard"
            className="bg-indigo-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg text-center w-4/5"
          >
            Back to dashboard
          </Link>


        </div>
      </div>
    </div>
  );
};

export default AdminDashBoard;
