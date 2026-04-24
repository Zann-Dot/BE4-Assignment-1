const { initializeDatabase } = require("./db/db.connect");
const Post = require("./models/post.models");
const Users = require("./models/users.model");
initializeDatabase();

const userData = {
  name: "John",
  email: "john@gamska.com",
};
const addUser = async () => {
  try {
    const user = new Users(userData);
    await user.save();
    console.log("User added", user);
  } catch (error) {
    console.log(error);
  }
};

const postData = {
  title: "Greetings",
  content: "Have a good day",
  author: "69eb2055f3df0ac0c4f12701",
};
const addPost = async () => {
  try {
    const posts = new Post(postData);
    await posts.save();
    console.log("Post added");
  } catch (error) {
    console.log(error);
  }
};
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
