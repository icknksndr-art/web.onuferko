import BookItem from "./BookItem";

function BookList({ books, deleteBook }) {
  return (
    <div>
      {books.map((book) => (
        <BookItem
          key={book.id}
          book={book}
          deleteBook={deleteBook}
        />
      ))}
    </div>
  );
}

