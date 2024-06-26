const ApiError = require("../utils/apiError");

const validationMiddleware = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const errorDetails = error.details.map((err) => ({
        message: err.message,
        path: err.path,
      }));
      // Example: Check for specific validation error and throw ApiError
      if (error.details.some((err) => err.message === "dublicated article")) {
        return next(new ApiError("Duplicate article found", 400));
      }
      // Default case: Return validation error details
      return res.status(400).json({ success: false, error: errorDetails });
    }
    next();
  };
};

module.exports = { validationMiddleware };
