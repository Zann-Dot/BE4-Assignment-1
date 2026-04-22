const express = require("express");
const { initializeDatabase } = require("./db/db.connect");
const Book = require("./models/books.models");
initializeDatabase();
const app = express();
const PORT = 3000;

app.use(express.json());

//Ex1
app.post("/books", async (req, res) => {
  try {
    const book = req.body;

    if (!book) {
      return res.status(400).json({ error: "Book data is required" });
    }

    const newBook = await Book.create(book);
    res.status(201).json({ message: "Book added successfully", book: newBook });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//Ex3
app.get("/books", async (req, res) => {
  const books = await Book.find();
  if (!books) {
    return res.status(404).json({ error: "No books found" });
  }
  res.status(200).send(books);
});

//Ex4
app.get("/books/title/:title", async (req, res) => {
  try {
    const book = await Book.findOne({ title: req.params.title });

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.status(200).send(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Ex5
app.get("/books/author/:author", async (req, res) => {
  try {
    const book = await Book.find({ author: req.params.author });

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.status(200).send(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Ex6
app.get("/books/genre/:genre", async (req, res) => {
  try {
    const book = await Book.find({ genre: req.params.genre });

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.status(200).send(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Ex7
app.get("/books/publishedYear/:year", async (req, res) => {
  try {
    const book = await Book.find({ publishedYear: req.params.year });

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.status(200).send(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Ex8
app.post("/books/:bookId", async (req, res) => {
  try {
    const rating = req.body;
    const bookId = req.params.bookId;
    let book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ error: "Book does not exist" });
    }

    if (!rating) {
      return res.status(404).json({ error: "Rating is required" });
    }

    book = await Book.findByIdAndUpdate(bookId, rating, { new: true });
    return res.status(200).json({
      message: "Rating updated successfully",
      book: book,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Ex9
app.post("/books/update/:title", async (req, res) => {
  try {
    const title = req.params.title;
    const { publishedYear, rating } = req.body;
    let book = await Book.findOne({ title });

    if (!book) {
      return res.status(404).json({ error: "Book does not exist" });
    }

    if (!rating) {
      return res.status(404).json({ error: "Rating is required" });
    }

    book = await Book.findOneAndUpdate({ title }, { rating }, { new: true });
    return res.status(200).json({
      message: "Rating updated successfully",
      book: book,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Ex10
app.delete("/books/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ error: "Book does not exist" });
    }
    await Book.findByIdAndDelete(id);
    return res.status(200).json({
      message: "Book deleted successfully",
      book,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
