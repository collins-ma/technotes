import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const NOTES_URL = 'http://localhost:3500/Note';

const NotesData = () => {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(NOTES_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch notes');
        }
        const notesData = await response.json();
        setNotes(notesData);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchNotes();
  }, []);

  // Filter notes based on the search term
  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  console.log(filteredNotes)

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">Notes List</h2>
      {/* Search input field */}
      <div className="mt-4">
        <input
          type="text"
          placeholder="Search by title"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 w-full"
        />
      </div>
      {filteredNotes.length > 0 ? (
        <div className="overflow-x-auto mt-4">
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Username
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Content
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredNotes.map(note => (
                <tr key={note._id}>
                  <td className="px-6 py-4 whitespace-no-wrap">{note._id}</td>
                  <td className="px-6 py-4 whitespace-no-wrap">{note.title}</td>
                  <td className="px-6 py-4 whitespace-no-wrap">{note.username}</td>
                  <td className="px-6 py-4 whitespace-no-wrap">{note.content}</td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    <Link to={`/admin/edit-note/${note._id}`} >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-blue-500 cursor-pointer"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM12 6v.01M12 18v.01"
                        />
                      </svg>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-4">No notes available.</p>
      )}
    </div>
  );
};

export default NotesData