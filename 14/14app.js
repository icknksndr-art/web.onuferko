import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BookForm from "./components/BookForm";
import BookList from "./components/BookList";

const API = "http://localhost:3001/books";

function App() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBooks();
  }, []);

  // GET
  const fetchBooks = async () => {
    try {
      setLoading(true);
      const res = await fetch(API);
      const data = await res.json();
      setBooks(data);
    } catch {
      setError("Помилка завантаження");
    } finally {
      setLoading(false);
    }
  };

  // POST
  const addBook = async (book) => {
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    });

    const newBook = await res.json();
    setBooks([...books, newBook]);
  };

  // DELETE
  const deleteBook = async (id) => {
    await fetch(`${API}/${id}`, {
      method: "DELETE",
    });

    setBooks(books.filter((b) => b.id !== id));
  };

  const filteredBooks = books.filter((b) =>
    b.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Header />

      <input
        placeholder="Пошук..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <BookForm addBook={addBook} />

      {loading && <p>Завантаження...</p>}
      {error && <p>{error}</p>}

      <BookList books={filteredBooks} deleteBook={deleteBook} />

      <Footer />
    </div>
  );
}

;