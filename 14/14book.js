function BookItem({ book, deleteBook }) {
  return (
    <div>
      <h3>{book.title}</h3>
      <p>{book.author}</p>
      <p>{book.year}</p>

      <button onClick={() => deleteBook(book.id)}>
        Видалити
      </button>
    </div>
  );
}

