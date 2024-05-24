import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useLogout from './useLogout';

const Dashboard = () => {
  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl relative p-8 rounded-lg shadow-lg bg-white">
        <button
          onClick={signOut}
          className="absolute top-4 left-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg text-sm"
        >
          Logout
        </button>
        <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-4">Dashboard</h2>
        <p className="text-lg text-gray-600 text-center mb-8">Welcome to your dashboard!</p>
        <div className="flex flex-col items-center gap-4">
          <Link
            to="/admin-dashboard"
            className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg text-center w-4/5"
          >
            Admin Page
          </Link>
          <Link
            to="/manager-dashboard"
            className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg text-center w-4/5"
          >
            Manager Page
          </Link>
          <Link
            to="/employee-dashboard"
            className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-6 rounded-lg text-center w-4/5"
          >
            Employee Page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;