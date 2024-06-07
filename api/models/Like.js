const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const LikeSchema = new Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    userId: { type: String, required: true },
    userName: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const LikeModel = model("Like", LikeSchema);
module.exports = LikeModel;
