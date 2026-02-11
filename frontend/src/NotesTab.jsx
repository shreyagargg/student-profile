import React, { useState, useEffect } from 'react';
import API from './api';
import './App.css'

const NotesTab = () => {
  const [notes, setNotes] = useState([]);
  const [formData, setFormData] = useState({ title: '', description: '' });

  // 1. Fetch Notes (Read)
  const fetchNotes = async () => {
    try {
      const { data } = await API.get('/notes');
      setNotes(data);
    } catch (err) {
      console.error("Error fetching notes", err);
    }
  };

  useEffect(() => { fetchNotes(); }, []);

  // 2. Add Note (Create)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/notes', formData);
      setFormData({ title: '', description: '' }); // Clear form
      fetchNotes(); // Refresh list
    } catch (err) {
      alert(err);
    }
  };

  // 3. Delete Note (Delete)
  const deleteNote = async (id) => {
    await API.delete(`/notes/${id}`);
    fetchNotes();
  };

  return (
    <div>
      <h2 className="notes-header">Your Notes</h2>
      <form className="note-form" onSubmit={handleSubmit}>
        <input 
          className="note-input"
          placeholder="Heading" 
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          required
        />
        <textarea 
          className="note-textarea"
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          required
        />
        <button type="submit" className="add-note-btn">Add Note</button>
      </form>

      <div className="notes-grid">
        {notes.map(note => (
          <div key={note._id} className="note-card">
            <h3>{note.title}</h3>
            <p>{note.description}</p>
            <button onClick={() => deleteNote(note._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotesTab;