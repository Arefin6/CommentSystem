const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const auth = require("../middlewares/auth");
const validateRequest = require("../middlewares/validate");
const {
  createCommentSchema,
  updateCommentSchema,
} = require("../schemas/commentSchema");

router.get("/", auth, commentController.getComments); // optional auth but we use auth to know likedByMe
router.post(
  "/create",
  auth,
  validateRequest(createCommentSchema),
  commentController.createComment
);
router.put(
  "/update/:id",
  auth,
  validateRequest(updateCommentSchema),
  commentController.updateComment
);
router.delete("/delete/:id", auth, commentController.deleteComment);
router.post("/like/:id/", auth, commentController.toggleLike);
router.post("/dislike/:id/", auth, commentController.toggleDislike);

module.exports = router;
