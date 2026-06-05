import { useState, useContext, useRef, useEffect } from 'react';
import NoteContext from '../context/NoteContext';

function NoteForm() {
  const { addNote } = useContext(NoteContext);

  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const titleRef = useRef(null);

  useEffect(() => {
    titleRef.current.focus();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    if (!title || !text) return;

    addNote(title, text);

    setTitle('');
    setText('');

    titleRef.current.focus();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={titleRef}
        type="text"
        placeholder="Заголовок"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Текст нотатки"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button type="submit">Додати</button>
    </form>
  );
}