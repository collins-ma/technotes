import React, { useState } from 'react';
import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL

const DeleteUser = () => {
  const [userId, setUserId] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setUserId(e.target.value);
  };

  const handleDelete = async () => {
    if (!userId) {
      setMessage('User ID is required');
      return;
    }

    try {
      const response = await axios.delete(`${API_URL}/User${userId}`);
      if (response.status === 200) {
        setMessage('User deleted successfully!');
      } else {
        setMessage('Failed to delete user.');
      }
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 400:
            setMessage('Bad Request. Please check the user ID.');
            break;
          case 401:
            setMessage('Unauthorized. Please log in.');
            break;
          case 403:
            setMessage('Forbidden. You do not have permission to delete this user.');
            break;
          case 404:
            setMessage('User not found.');
            break;
          case 500:
            setMessage('Internal Server Error. Please try again later.');
            break;
          default:
            setMessage('An unexpected error occurred.');
        }
      } else {
        setMessage('Network error. Please check your connection.');
      }
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Delete User</h2>
      {message && <p className="mb-4 text-red-500">{message}</p>}
      <div className="mb-4">
        <label htmlFor="userId" className="block text-gray-700 font-bold mb-2">User ID</label>
        <input
          type="text"
          id="userId"
          name="userId"
          value={userId}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
          required
        />
      </div>
      <button
        onClick={handleDelete}
        className="bg-red-500 text-white px-4 py-2 rounded-md"
      >
        Delete User
      </button>
    </div>
  );
};

export default DeleteUser;
