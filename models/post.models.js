const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
