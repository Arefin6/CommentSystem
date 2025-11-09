const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const validateRequest = require("../middlewares/validate");
const { registerSchema, loginSchema } = require("../schemas/authSchemas");

router.post(
  "/register",
  validateRequest(registerSchema),
  authController.register
);

router.post("/login", validateRequest(loginSchema), authController.login);

module.exports = router;
