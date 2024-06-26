const cloudinary = require("cloudinary").v2;
exports.handleCloudinaryCleanup = async (req) => {
  if (req.file) {
    try {
      await cloudinary.uploader.destroy(req.file.filename);
      console.log(`Deleted Cloudinary resource: ${req.file.filename}`);
    } catch (error) {
      console.error(
        `Error deleting Cloudinary resource: ${req.file.filename}`,
        error
      );
      // Handle error if needed
    }
  }
};
