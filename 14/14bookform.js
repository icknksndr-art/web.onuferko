import { useState } from "react";

function BookForm({ addBook }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !author || !year) return;

    addBook({ title, author, year });

    setTitle("");
    setAuthor("");
    setYear("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Назва" />
      <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Автор" />
      <input value={year} onChange={(e) => setYear(e.target.value)} placeholder="Рік" />
      <button>Додати</button>
    </form>
  );
}

