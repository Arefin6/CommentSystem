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
    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(parseInt(req.query.limit) || 10, 50);
    const skip = (page - 1) * limit;

    const sortBy = req.query.sortBy || "newest";
    const parent = req.query.parent || null;
    const filter = parent ? { parent } : { parent: null };

    let sort = {};
    if (sortBy === "newest") sort = { createdAt: -1 };
    else if (sortBy === "mostLiked") sort = { likesCount: -1, createdAt: -1 };
    else if (sortBy === "mostDisliked")
      sort = { dislikesCount: -1, createdAt: -1 };

    // Aggregation to calculate likes/dislikes count
    const pipeline = [
      { $match: filter },
      {
        $addFields: {
          likesCount: { $size: { $ifNull: ["$likes", []] } },
          dislikesCount: { $size: { $ifNull: ["$dislikes", []] } },
        },
      },
      { $sort: sort },
      { $skip: skip },
      { $limit: limit },
      {
        $lookup: {
          from: "users",
          localField: "author",
          foreignField: "_id",
          as: "author",
        },
      },
      {
        $unwind: "$author",
      },
      {
        $project: {
          content: 1,
          author: { name: 1, email: 1, _id: 1 },
          createdAt: 1,
          likesCount: 1,
          dislikesCount: 1,
          likes: 1,
          dislikes: 1,
        },
      },
    ];

    const comments = await Comment.aggregate(pipeline);

    const total = await Comment.countDocuments(filter);
    const userId = req.user ? req.user._id.toString() : null;

    // Add liked/disliked flags for frontend
    const result = comments.map((c) => ({
      ...c,
      likedByMe: userId
        ? (c.likes || []).some((v) => v.user.toString() === userId)
        : false,
      dislikedByMe: userId
        ? (c.dislikes || []).some((v) => v.user.toString() === userId)
        : false,
    }));

    res.json({
      data: result,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error("getComments error:", err);
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
