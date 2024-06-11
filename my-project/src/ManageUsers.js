import React, { useState, useEffect } from 'react';
import axios from 'axios'
import useAxiosPrivate from './hooks/useAxiosPrivate.js';
import { Link , useLocation, useNavigate} from 'react-router-dom';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';
import Modal from 'react-modal';
const apiUrl = process.env.REACT_APP_API_URL

// Set the app element for accessibility
Modal.setAppElement('#root');

const ManageUsers = () => {
  const location=useLocation()
  const navigate=useNavigate()
  const axiosPrivate=useAxiosPrivate()
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    axiosPrivate.get(`${apiUrl}/User`)
      .then(response => {
        setUsers(response.data); // Users are already sorted by createdAt in backend
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
        setLoading(false);
        navigate('/login',{state:{from:location}, replace:true})
      });
  }, []);

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openModal = (userId) => {
    setSelectedUserId(userId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUserId(null);
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${apiUrl}/User`, {
        data: { id: selectedUserId }
      });
      if (response.status === 200) {
        setUsers(users.filter(user => user._id !== selectedUserId));
        setMessage('User deleted successfully');
        setTimeout(() => setMessage(''), 3000);
        closeModal();
      } else {
        setMessage('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      setMessage('Error deleting user');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center">Manage Users</h2>
        {message && <p className="text-center text-green-500">{message}</p>}
        <div className="mt-4">
          <input
            type="text"
            placeholder="Search by username"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 w-full"
          />
        </div>
        <div className="mt-4">
          {loading ? (
            <p>Loading...</p>
          ) : filteredUsers.length === 0 ? (
            <p className="text-center text-red-500">User not found</p>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roles</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map(user => (
                  <tr key={user._id}>
                    <td className="px-6 py-4 whitespace-nowrap">{user._id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.roles.join(', ')}</td> {/* Join roles with comma */}
                    <td className="px-6 py-4 whitespace-nowrap flex items-center space-x-4">
                      <Link to={`/admin/edit-user/${user._id}`} className="text-indigo-600 hover:text-indigo-900">
                        <BsPencilSquare size={20} />
                      </Link>
                      <button
                        onClick={() => openModal(user._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <BsTrash size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <div className="text-center">
            <Link to="/admin-dashboard" className="mt-4 block text-sm font-medium text-indigo-600 hover:text-indigo-500">
              Back to Admin Dashboard
            </Link>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Confirm Delete"
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white rounded-lg p-6 space-y-4">
          <h2 className="text-xl font-bold">Confirm Delete</h2>
          <p>Are you sure you want to delete this user?</p>
          <div className="flex justify-end space-x-4">
            <button
              onClick={closeModal}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ManageUsers;
