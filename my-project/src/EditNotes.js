import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const EditNote = () => {
  const [note, setNote] = useState({
    id: '',
    title: '',
    content: '',
    user: '',
    noteticket: '' // Add noteticket to the state
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axios.get(`http://localhost:3500/Note/${id}`);
        const noteData = response.data;
        setNote({
          id: noteData._id,
          title: noteData.title,
          content: noteData.content,
          user: noteData.user,
          noteticket: noteData.noteticket // Set noteticket from fetched data
        });
      } catch (error) {
        if (error.response) {
          switch (error.response.status) {
            case 400:
              setErrorMessage('Bad Request. Please check the note ID.');
              break;
            case 401:
              setErrorMessage('Unauthorized. Please log in.');
              break;
            case 403:
              setErrorMessage('Forbidden. You do not have permission to view this note.');
              break;
            case 404:
              setErrorMessage('Note not found.');
              break;
            case 500:
              setErrorMessage('Internal Server Error. Please try again later.');
              break;
            default:
              setErrorMessage('An unexpected error occurred.');
          }
        } else {
          setErrorMessage('Network error. Please check your connection.');
        }
        console.error('Error fetching note:', error);
      }
    };

    fetchNote();
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setNote(prevNote => ({
      ...prevNote,
      [name]: value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.patch('http://localhost:3500/Note', {
        ...note
      });
      if (response.status !== 200) {
        throw new Error('Failed to update note');
      }
      setSuccessMessage('Note updated successfully!');
      setTimeout(() => setSuccessMessage(''), 2000);
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 400:
            setErrorMessage('Bad Request. Please check the note data.');
            break;
          case 401:
            setErrorMessage('Unauthorized. Please log in.');
            break;
          case 403:
            setErrorMessage('Forbidden. You do not have permission to edit this note.');
            break;
          case 404:
            setErrorMessage('Note not found.');
            break;
          case 500:
            setErrorMessage('Internal Server Error. Please try again later.');
            break;
          default:
            setErrorMessage('An unexpected error occurred.');
        }
      } else {
        setErrorMessage('Network error. Please check your connection.');
      }
      console.error('Error updating note:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Edit Note</h2>
      {errorMessage && <p className="mb-4 text-red-500">{errorMessage}</p>}
      {successMessage && <p className="mb-4 text-green-500">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="id" className="block text-gray-700 font-bold mb-2">ID</label>
          <input
            type="text"
            id="id"
            name="id"
            value={note.id}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
            readOnly
          />
        </div>
        <div className="mb-4">
          <label htmlFor="noteticket" className="block text-gray-700 font-bold mb-2">Ticket Number</label>
          <input
            type="text"
            id="noteticket"
            name="noteticket"
            value={note.noteticket}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
            readOnly
          />
        </div>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={note.title}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-gray-700 font-bold mb-2">Content</label>
          <textarea
            id="content"
            name="content"
            value={note.content}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full h-32"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="user" className="block text-gray-700 font-bold mb-2">User</label>
          <input
            type="text"
            id="user"
            name="user"
            value={note.user}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Update Note</button>
      </form>
      <Link to="/admin/view-notes" className="mt-4 inline-block bg-gray-500 text-white px-4 py-2 rounded-md">
        Back to Admin View Notes
      </Link>
    </div>
  );
};

export default EditNote;
