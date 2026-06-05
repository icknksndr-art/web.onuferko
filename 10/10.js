import { useState } from 'react';

import NoteContext from './context/NoteContext';

import Header from './components/Header';
import NoteForm from './components/NoteForm';
import NoteSearch from './components/NoteSearch';
import NoteList from './components/NoteList';
import Footer from './components/Footer';

function App() {
  const [notes, setNotes] = useState([]);

  const [search, setSearch] = useState('');

  function addNote(title, text) {
    const newNote = {
      id: Date.now(),
      title,
      text
    };

    setNotes([...notes, newNote]);
  }

  function deleteNote(id) {
    setNotes(notes.filter(note => note.id !== id));
  }

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <NoteContext.Provider
      value={{
        notes,
        addNote,
        deleteNote,
        search,
        setSearch,
        filteredNotes
      }}
    >
      <Header />
      <NoteForm />
      <NoteSearch />
      <NoteList />
      <Footer />
    </NoteContext.Provider>
  );
}