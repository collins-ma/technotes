import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons


const apiUrl=process.env.REACT_APP_API_URL;
const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({ id: id, username: '', password: '', roles: [], active: false });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); // State to track success message
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  useEffect(() => {
    let isMounted=true
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${apiUrl}/${id}`);
        const { username, roles, active } = response.data;
        setUser({ id, username, password: '', roles, active });
      } catch (error) {
        console.error('Error fetching user:', error);
        setError('Error fetching user. Please try again.');
      }
    };

    fetchUser();
    return ()=>isMounted=false
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      id: user.id,
      username: user.username,
      roles: user.roles,
      active: user.active,
    };
    if (user.password) {
      userData.password = user.password;
    }
    try {
      await axios.patch(`${apiUrl}`, userData);
      setSuccess('User updated successfully'); // Set success message
      setError('');
      navigate('/admin/manage-users'); // Optionally navigate to manage users
    } catch (error) {
      console.error('Error updating user:', error.stack);
      setError('Error updating user. Please try again.');
      setSuccess('');
    }
  };

  const handleUsernameChange = (e) => {
    setUser({ ...user, username: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setUser({ ...user, password: e.target.value });
  };

  const handleRolesChange = (e) => {
    setUser({ ...user, roles: e.target.value.split(',').map(role => role.trim()) });
  };

  const handleActiveChange = (e) => {
    setUser({ ...user, active: e.target.checked });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-sky-700 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center">Edit User</h2>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* ID Input */}
          <div>
            <label htmlFor="id" className="block text-sm font-medium text-gray-700">User ID</label>
            <input
              id="id"
              name="id"
              type="text"
              value={user.id}
              readOnly
              className="mt-1 block w-full h-10 px-4 border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
            />
          </div>
          {/* Username Input */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              value={user.username}
              onChange={handleUsernameChange}
              className="mt-1 block w-full h-10 px-4 border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
            />
          </div>
          {/* Password Input */}
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={user.password}
              onChange={handlePasswordChange}
              className="mt-1 block w-full h-10 px-4 border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
            />
            <span
              onClick={toggleShowPassword}
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {/* Roles Input */}
          <div>
            <label htmlFor="roles" className="block text-sm font-medium text-gray-700">Roles (comma-separated)</label>
            <input
              id="roles"
              name="roles"
              type="text"
              value={user.roles.join(', ')}
              onChange={handleRolesChange}
              className="mt-1 block w-full h-10 px-4 border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
            />
          </div>
          {/* Active Status Checkbox */}
          <div className="flex items-center">
            <input
              id="active"
              name="active"
              type="checkbox"
              checked={user.active}
              onChange={handleActiveChange}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label htmlFor="active" className="ml-2 block text-sm font-medium text-gray-700">Active</label>
          </div>
          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save Changes
            </button>
          </div>
          {/* Display success message */}
          {success && <p className="text-green-500 text-center">{success}</p>}
          {/* Display error message */}
          {error && <p className="text-red-500 text-center">{error}</p>}
          {/* Link back to the manage users page */}
          <div className="text-center">
            <Link to="/admin/manage-users" className="block text-sm font-medium text-indigo-600 hover:text-indigo-500">
              Back to Manage Users
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
