const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const Post = require("./models/Post");
const fs = require("fs");
const app = express();

const uploadMiddleware = multer({ dest: "uploads/" });
const salt = bcrypt.genSaltSync(10);
const secret = "zfsfgasfnjrjgwrhoghasckasnfspkovrwvk0vkoaihnas";

app.use(
  cors({
    credentials: true,
    origin: "https://blogify-mern-app.vercel.app",
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/uploads", express.static(__dirname + "/uploads")); // local image directory

mongoose.connect(
  "mongodb+srv://ratishjain6:1234@cluster0.rd5kouh.mongodb.net/?retryWrites=true&w=majority"
);

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const UserDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(UserDoc);
  } catch (err) {
    res.status(400).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const UserDoc = await User.findOne({ username });
  if (bcrypt.compareSync(password, UserDoc.password)) {
    jwt.sign({ username, id: UserDoc._id }, secret, {}, (err, token) => {
      if (err) throw err;
      res.cookie("token", token).json({
        id: UserDoc._id,
        username,
      });
    });
  } else {
    res.status(400).json("wrong credentials");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, secret, {}, (err, info) => {
      if (err) throw err;
      res.json(info);
    });
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

app.post("/create", uploadMiddleware.single("file"), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, path + "." + ext);

  const { token } = req.cookies;

  jwt.verify(token, secret, {}, async (err, info) => {
    const { title, summary, content } = req.body;
    if (err) throw err;
    const PostDoc = await Post.create({
      title,
      summary,
      content,
      file: newPath,
      author: info.id,
    });

    res.json(PostDoc);
  });
});

app.get("/", (req, res) => {
  res.json("test ok");
});

app.get("/fetchPosts", async (req, res) => {
  const posts = await Post.find()
    .populate("author", ["username"])
    .sort({ createdAt: -1 })
    .limit(20);
  res.json(posts);
});

app.get("/post/:id", async (req, res) => {
  const id = req.params.id;
  const post = await Post.find({ _id: id }).populate("author", ["username"]);
  res.json(post);
});

app.put("/edit/:id", uploadMiddleware.single("file"), async (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  const content = req.body.content;
  const summary = req.body.summary;

  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, path + "." + ext);
    await Post.updateOne(
      { _id: id },
      { title, content, summary, file: newPath }
    );
    res.json("Updated");
  } else {
    await Post.updateOne({ _id: id }, { title, content, summary });
    res.json("Updated");
  }
});

app.listen(5000, () => {
  console.log("server running on port 5000");
});
