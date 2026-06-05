import { useContext } from 'react';
import NoteContext from '../context/NoteContext';

function NoteSearch() {
  const { search, setSearch } = useContext(NoteContext);

  return (
    <input
      type="text"
      placeholder="Пошук нотаток..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}
