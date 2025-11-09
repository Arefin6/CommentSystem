const { z } = require("zod");

const createCommentSchema = z.object({
  content: z.string().min(1, "Content is required").max(1000, "Too long"),
  parent: z.string().optional().nullable(), // for reply feature
});

const updateCommentSchema = z.object({
  content: z.string().min(1, "Content is required").max(1000, "Too long"),
});

module.exports = { createCommentSchema, updateCommentSchema };
