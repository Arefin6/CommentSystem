const mongoose = require("mongoose");
const { Schema } = mongoose;

const VoteSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const CommentSchema = new Schema(
  {
    content: { type: String, required: true, trim: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    likes: [VoteSchema],
    dislikes: [VoteSchema],
    parent: { type: Schema.Types.ObjectId, ref: "Comment", default: null }, // for replies
  },
  { timestamps: true }
);

CommentSchema.virtual("likesCount").get(function () {
  return this.likes ? this.likes.length : 0;
});
CommentSchema.virtual("dislikesCount").get(function () {
  return this.dislikes ? this.dislikes.length : 0;
});

module.exports = mongoose.model("Comment", CommentSchema);
