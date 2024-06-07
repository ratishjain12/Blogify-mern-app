const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const Post = require("./models/Post");
const fs = require("fs");
const app = express();
const upload = require("./multer/multerMiddleware");
const LikeModel = require("./models/Like");
const {
  uploadToCloudinary,
  DeleteFromCloudinary,
} = require("./cloudinary/cloudinary");

app.use(
  cors({
    credentials: true,
    origin: ["https://blogify-mern-app.vercel.app", "http://localhost:5173"],
  })
);
app.use(express.json());
app.use(cookieParser());

mongoose.connect(
  "mongodb+srv://ratishjain6:1234@cluster0.rd5kouh.mongodb.net/?retryWrites=true&w=majority"
);

app.post("/create", upload.single("file"), async (req, res) => {
  const { originalname, path } = req.file;
  const { title, summary, content, userId, name } = req.body;
  if (!userId || !summary || !content || !name)
    return res.json({ status: 500, message: "Please Enter all the details!!" });
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);
  const url = await uploadToCloudinary(newPath);
  if (url) {
    fs.unlinkSync(newPath);
  } else {
    return;
  }
  const PostDoc = await Post.create({
    title,
    summary,
    content,
    file: url,
    author: {
      id: userId,
      name: name,
    },
  });

  res.json(PostDoc);
});

app.get("/", (req, res) => {
  res.json("test ok");
});

app.get("/fetchPosts", async (req, res) => {
  try {
    const userId = req.query.userId;
    const posts = await Post.find().sort({ createdAt: -1 }).lean();
    const likes = await LikeModel.find({ userId });

    const likedPostIds = new Set(likes.map((like) => like.postId.toString()));

    const postsWithLikeStatus = posts.map((post) => ({
      ...post,
      likedByCurrentUser: likedPostIds.has(post._id.toString()),
    }));

    res.status(200).json(postsWithLikeStatus);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/post/:id", async (req, res) => {
  const id = req.params.id;
  const post = await Post.find({ _id: id });
  res.json(post);
});

app.put("/edit/:id", upload.single("file"), async (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  const content = req.body.content;
  const summary = req.body.summary;

  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    const blog = await Post.find({ _id: id });
    const deletedFile = await DeleteFromCloudinary(blog[0].file);
    if (deletedFile) {
      const url = await uploadToCloudinary(newPath);
      if (url) {
        fs.unlinkSync(newPath);
      } else {
        return;
      }

      await Post.updateOne({ _id: id }, { title, content, summary, file: url });
      return res.json("Updated");
    }
    return res.status.json("Internal server error");
  } else {
    await Post.updateOne({ _id: id }, { title, content, summary });
    res.json("Updated");
  }
});

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Post.deleteOne({ _id: id });
    res.status(200).json("Deleted!!");
  } catch (err) {
    res.status(500).json("Internal server error");
  }
});

//likes add and removal
app.post("/posts/:postId/likes", async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId, userName } = req.body;

    const like = await LikeModel.findOne({ postId, userId });

    if (like) {
      // User has already liked the post, so remove the like (unlike)
      await LikeModel.deleteOne({ _id: like._id });
      await Post.findByIdAndUpdate(postId, { $inc: { likesCount: -1 } });
    } else {
      // User has not liked the post, so add the like
      await LikeModel.create({ postId, userId, userName });
      await Post.findByIdAndUpdate(postId, { $inc: { likesCount: 1 } });
    }

    const updatedPost = await Post.findById(postId).lean();
    const likedByCurrentUser = !like;

    res.status(200).json({ ...updatedPost, likedByCurrentUser });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

//comment
// Endpoint to add a comment to a post

app.post("/posts/:postId/comments", async (req, res) => {
  try {
    const { postId } = req.params;
    const commentData = req.body;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    post.comments.push(commentData);
    post.commentsCount += 1;
    await post.save();

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: `Internal server error: ${error.message}` });
  }
});

// Endpoint to remove a comment from a post
app.delete("/posts/:postId/comments/:commentId", async (req, res) => {
  try {
    const { postId, commentId } = req.params;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const comment = post.comments.id(commentId);

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    await Post.updateOne(
      { _id: postId },
      {
        $pull: {
          comments: {
            _id: commentId,
          },
        },
      }
    );

    await Post.updateOne(
      { _id: postId },
      {
        $inc: { commentsCount: -1 },
      }
    );
    res.status(200).json("comment deleted!!!");
  } catch (error) {
    res.status(500).json({ error: `Internal server error: ${error.message}` });
  }
});

app.listen(5000, () => {
  console.log("server running on port 5000");
});
