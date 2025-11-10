const Comment = require("../models/Comment");
const mongoose = require("mongoose");

// helper: ensure user not in both like & dislike lists
const removeFromArray = (arr, userId) =>
  arr.filter((v) => v.user.toString() !== userId.toString());

exports.createComment = async (req, res) => {
  const { content, parent } = req.body;
  try {
    const comment = new Comment({
      content,
      author: req.user._id,
      parent: parent || null,
    });
    await comment.save();

    // populate author for response
    await comment.populate("author", "name email");

    // broadcast real-time via req.io if available
    // if (req.io) req.io.emit('comment:created', comment);

    res.status(201).json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getComments = async (req, res) => {
  try {
    // pagination
    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(parseInt(req.query.limit) || 10, 50);
    const skip = (page - 1) * limit;

    // sorting: likes, dislikes, newest
    const sortBy = req.query.sortBy || "newest";
    let sort = { createdAt: -1 };
    if (sortBy === "mostLiked") sort = { "likes.length": 1, createdAt: 1 };
    if (sortBy === "mostDisliked")
      sort = { "dislikes.length": -1, createdAt: -1 };

    // optional parent filter to get replies
    const parent = req.query.parent || null;
    const filter = parent ? { parent } : { parent: null };

    // For counts and pagination use aggregation for likes/dislikes length
    const comments = await Comment.find(filter)
      .populate("author", "name email")
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean();

    // attach counts and whether current user liked/disliked
    const userId = req.user ? req.user._id.toString() : null;
    const result = comments.map((c) => {
      const likesCount = (c.likes || []).length;
      const dislikesCount = (c.dislikes || []).length;
      return {
        ...c,
        likesCount,
        dislikesCount,
        likedByMe: userId
          ? (c.likes || []).some((v) => v.user.toString() === userId)
          : false,
        dislikedByMe: userId
          ? (c.dislikes || []).some((v) => v.user.toString() === userId)
          : false,
      };
    });

    const total = await Comment.countDocuments(filter);
    res.json({
      data: result,
      meta: { page, limit, totalPages: Math.ceil(total / limit), total },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateComment = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  try {
    const comment = await Comment.findById(id);
    if (!comment) return res.status(404).json({ message: "Not found" });
    if (comment.author.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Forbidden" });

    comment.content = content;
    await comment.save();
    await comment.populate("author", "name email");
    //if (req.io) req.io.emit("comment:updated", comment);
    res.json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteComment = async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await Comment.findById(id);
    if (!comment) return res.status(404).json({ message: "Not found" });
    if (comment.author.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Forbidden" });

    // Optionally: cascade delete replies or mark as deleted. Here we remove.
    await comment.deleteOne();
    //if (req.io) req.io.emit("comment:deleted", { id });
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.toggleLike = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  try {
    const comment = await Comment.findById(id);
    if (!comment) return res.status(404).json({ message: "Not found" });

    // remove from dislikes if in there
    comment.dislikes = removeFromArray(comment.dislikes, userId);

    // if already liked -> remove (toggle)
    const alreadyLiked = (comment.likes || []).some(
      (v) => v.user.toString() === userId.toString()
    );
    if (alreadyLiked) {
      comment.likes = removeFromArray(comment.likes, userId);
    } else {
      comment.likes.push({ user: userId });
    }
    await comment.save();
    await comment.populate("author", "name email");

    // if (req.io)
    //   req.io.emit("comment:liked", {
    //     id: comment._id,
    //     likesCount: comment.likes.length,
    //     dislikesCount: comment.dislikes.length,
    //   });

    res.json({
      id: comment._id,
      likesCount: comment.likes.length,
      dislikesCount: comment.dislikes.length,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.toggleDislike = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  try {
    const comment = await Comment.findById(id);
    if (!comment) return res.status(404).json({ message: "Not found" });

    // remove from likes if in there
    comment.likes = removeFromArray(comment.likes, userId);

    const alreadyDisliked = (comment.dislikes || []).some(
      (v) => v.user.toString() === userId.toString()
    );
    if (alreadyDisliked) {
      comment.dislikes = removeFromArray(comment.dislikes, userId);
    } else {
      comment.dislikes.push({ user: userId });
    }
    await comment.save();
    await comment.populate("author", "name email");

    if (req.io)
      req.io.emit("comment:disliked", {
        id: comment._id,
        likesCount: comment.likes.length,
        dislikesCount: comment.dislikes.length,
      });

    res.json({
      id: comment._id,
      likesCount: comment.likes.length,
      dislikesCount: comment.dislikes.length,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
