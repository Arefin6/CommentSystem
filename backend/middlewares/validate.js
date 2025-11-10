const { ZodError } = require("zod");

const validateWithZod = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body); // throws on error
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      //   console.log("zod Error", err);
      const errorMessages = err.issues?.map((issue) => ({
        message: `${issue.path.join(".")} is ${issue.message}`,
      }));
      res.status(400).json({
        error: errorMessages,
      });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
    next(err);
  }
};

module.exports = validateWithZod;
