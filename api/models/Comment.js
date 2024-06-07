const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const CommentSchema = new Schema(
  {
    content: { type: String, required: true },
    author: {
      id: { type: String, required: true },
      name: { type: String, required: true },
    },
  },
  {
    timestamps: true,
  }
);

const CommentModel = model("Comment", CommentSchema);
module.exports = { CommentModel, CommentSchema };
