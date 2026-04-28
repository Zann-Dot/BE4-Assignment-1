const express = require("express");
const { initializeDatabase } = require("./db/db.connect");
const Book = require("./models/books.models");
initializeDatabase();
const app = express();
const cors = require("cors");

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

const PORT = 3000;

app.use(cors(corsOptions));
app.use(express.json());

//Ex1
app.post("/books", async (req, res) => {
  try {
    const book = await Book.findOne({ title: req.body.title }).collation({
      locale: "en",
      strength: 2,
    });

    if (book) {
      return res.status(400).json({ error: "Book exists already" });
    }

    const newBook = await Book.create(req.body);
    res.status(201).json({ message: "Book added successfully", book: newBook });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Ex3
app.get("/books", async (req, res) => {
  try {
    const books = await Book.find();
    if (books.length === 0) {
      return res.status(404).json({ error: "No books found" });
    }
    res.status(200).send(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
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
      book,
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
      book,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Ex10
app.delete("/books/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      return res.status(404).json({ error: "Book does not exist" });
    }
    return res.status(200).json({
      message: "Book deleted successfully",
      book,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
