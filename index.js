const { initializeDatabase } = require("./db/db.connect");
const Post = require("./models/post.models");
const Users = require("./models/users.model");
initializeDatabase();

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
    console.log(error);
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
    const posts = new Post(postData);
    await posts.save();
    console.log("Post added");
  } catch (error) {
    console.log(error);
  }
});
// addPost();

const getPosts = async () => {
  try {
    const posts = await Post.find().populate("author");
    console.log(posts);
  } catch (error) {
    console.log(error);
  }
};
getPosts();
