import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const POSTS_URL = "http://localhost:3500/User";

const AddNewUser = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [roles, setRoles] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [displaySuccess, setDisplaySuccess] = useState(false); // New state to control display of success message

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleChangeRoles = (e) => {
    const value = e.target.value;
    if (value.startsWith('[') && value.endsWith(']') && value.includes(',')) {
      setRoles(JSON.parse(value));
    } else {
      setRoles(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!roles || (Array.isArray(roles) && roles.length === 0)) {
      setErrorMessage('At least one role is required.');
      return;
    }

    try {
      const response = await axios.post(POSTS_URL, {
        username: username,
        password: password,
        roles: Array.isArray(roles) ? roles : [roles]
      });

      console.log('User added:', response.data);
      setUsername('');
      setPassword('');
      setRoles('');
      setErrorMessage('');
      setSuccessMessage('User added successfully!');
      setDisplaySuccess(true); // Display the success message
    } catch (error) {
      if(error.response.status===409){
        setErrorMessage('Duplicate username')
       
      }
      
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleOkClick = () => {
    setSuccessMessage(''); // Clear the success message
    setDisplaySuccess(false); // Hide the success message
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center">Add New User</h2>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {displaySuccess && (
          <div className="flex justify-between items-center bg-green-100 border-l-4 border-green-500 py-2 px-3 rounded-md">
            <p className="text-green-500">{successMessage}</p>
            <button onClick={handleOkClick} className="text-green-500 focus:outline-none">OK</button>
          </div>
        )}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <div className="relative">
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                value={username}
                onChange={handleChangeUsername}
                className="mt-1 block w-full h-12 border-gray-300 rounded-md shadow-sm pl-10 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter username"
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                value={password}
                onChange={handleChangePassword}
                className="mt-1 block w-full h-12 border-gray-300 rounded-md shadow-sm pl-10 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter password"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  className="h-5 w-5 text-gray-400 cursor-pointer"
                  onClick={togglePasswordVisibility}
                />
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="roles" className="block text-sm font-medium text-gray-700">Roles</label>
            <input
              id="roles"
              name="roles"
              type="text"
              autoComplete="roles"
              value={Array.isArray(roles) ? JSON.stringify(roles) : roles}
              onChange={handleChangeRoles}
              className="mt-1 block w-full h-12 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter roles"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add User
            </button>
          </div>
        </form>
        <div className="text-center">
          <Link to="/admin-dashboard" className="mt-4 block text-sm font-medium text-indigo-600 hover:text-indigo-500">
            Back to Admin Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AddNewUser;
