import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// const NOTES_URL = "http://localhost:3500/Note";
const API_URL = process.env.REACT_APP_API_URL;

const EmployeeViewNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(API_URL);
        setNotes(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching notes. Please try again.');
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-4">Notes</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Content</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>

                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {notes.map((note) => (
                <tr key={note._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{note._id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{note.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{note.content}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{note.username}</td>
         
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link to={`/employee/edit-note/${note._id}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-500 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM12 14v5m0 0V14m0 0H9m3 0h3" />
                      </svg>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-8 flex justify-center">
          <Link
            to="/employee-dashboard"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
          >
            Back to Employee Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmployeeViewNotes;
