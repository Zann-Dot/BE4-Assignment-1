const mongoose = require("mongoose");
const capitalizeTitle = (str) => {
  if (!str) return str;
  return str
    .toLowerCase()
    .split(" ")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");
};

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      set: capitalizeTitle,
    },
    author: {
      type: String,
      required: true,
      set: capitalizeTitle,
    },
    publishedYear: {
      type: Number,
      required: true,
    },
    genre: [
      {
        type: String,
      },
    ],
    language: {
      type: String,
      required: true,
      set: capitalizeTitle,
    },
    country: {
      type: String,
      default: "United States",
      set: capitalizeTitle,
    },
    rating: {
      type: Number,
      min: 0,
      max: 10,
      default: 0,
    },
    summary: {
      type: String,
      set: capitalizeTitle,
    },
    coverImageUrl: String,
  },
  { timestamps: true },
);
const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
