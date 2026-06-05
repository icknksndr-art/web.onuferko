function NoteItem({ note, onDelete }) {
  return (
    <div>
      <h3>{note.title}</h3>
      <p>{note.text}</p>

      <button onClick={() => onDelete(note.id)}>
        Видалити
      </button>
    </div>
  );
}