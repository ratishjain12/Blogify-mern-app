const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const { CommentSchema } = require("./Comment");
const PostSchema = new Schema(
  {
    title: String,
    summary: String,
    content: String,
    file: String,
    author: {
      id: String,
      name: String,
    },
    comments: [CommentSchema],
    commentsCount: { type: Number, default: 0 },
    likesCount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const PostModel = model("posts", PostSchema);
module.exports = PostModel;
