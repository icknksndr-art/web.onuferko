import { useContext } from 'react';
import NoteContext from '../context/NoteContext';
import NoteItem from './NoteItem';

function NoteList() {
  const { filteredNotes, deleteNote } = useContext(NoteContext);

  if (filteredNotes.length === 0) {
    return <p>Нотаток немає</p>;
  }

  return (
    <div>
      {filteredNotes.map((note) => (
        <NoteItem
          key={note.id}
          note={note}
          onDelete={deleteNote}
        />
      ))}
    </div>
  );
}