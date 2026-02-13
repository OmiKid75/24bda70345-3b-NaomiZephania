"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


type Book = {
  id: number;
  title: string;
  author: string;
};

export default function Home() {
  const [query, setQuery] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editAuthor, setEditAuthor] = useState("");

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(query.toLowerCase()) ||
      book.author.toLowerCase().includes(query.toLowerCase())
  );

  const handleAdd = () => {
    if (!title.trim() || !author.trim()) return;

    const newBook: Book = {
      id: Date.now(),
      title,
      author,
    };

    setBooks([newBook, ...books]);
    setTitle("");
    setAuthor("");
  };

  const handleRemove = (id: number) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  const handleEdit = (book: Book) => {
    setEditingId(book.id);
    setEditTitle(book.title);
    setEditAuthor(book.author);
  };

  const handleSaveEdit = (id: number) => {
    if (!editTitle.trim() || !editAuthor.trim()) return;

    setBooks(
      books.map((book) =>
        book.id === id
          ? { ...book, title: editTitle, author: editAuthor }
          : book
      )
    );

    setEditingId(null);
    setEditTitle("");
    setEditAuthor("");
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditAuthor("");
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center">
          📚 Library Management System
        </h1>

        {/* Search */}
        <Input
          placeholder="Search by title or author..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {/* Add Book Form */}
        <Card className="p-4 space-y-4">
          <h2 className="text-lg font-semibold">Add New Book</h2>

          <Input
            placeholder="Book Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Input
            placeholder="Author Name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />

          <Button onClick={handleAdd}>
             Add Book
             </Button>

        </Card>

        {/* Book List */}
        <div className="space-y-4">
          {filteredBooks.length === 0 ? (
            <p className="text-center text-gray-500">
              No books found.
            </p>
          ) : (
            filteredBooks.map((book) => (
              <Card key={book.id} className="p-4 space-y-3">
                {editingId === book.id ? (
                  <>
                    <Input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                    />
                    <Input
                      value={editAuthor}
                      onChange={(e) => setEditAuthor(e.target.value)}
                    />

                    <div className="flex gap-2">
                      <Button onClick={() => handleSaveEdit(book.id)}>
  Save
</Button>


                      <Button
                         variant="destructive"
                              onClick={() => handleRemove(book.id)}
                               >
                                 Remove
                                     </Button>

                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <h3 className="text-lg font-semibold">
                        {book.title}
                      </h3>
                      <p className="text-gray-600">
                        {book.author}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="secondary"
                           onClick={() => handleEdit(book)}
                           >
                               Edit
                            </Button>


                      <Button variant="destructive" onClick={() => handleRemove(book.id)}>
                             Remove
                                 </Button>

                    </div>
                  </>
                )}
              </Card>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
