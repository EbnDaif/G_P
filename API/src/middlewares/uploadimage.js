const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinaryConfig");
const { v4: uuidv4 } = require("uuid");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    let folder = "uploads";
    switch (req.baseUrl) {
      case "/GP/users":
        folder = "uploads/users";
        break;
      case "/GP/articles":
        folder = "uploads/articles";
        break;
      default:
        folder = "uploads";
    }

    const originalName = file.originalname.replace(" ", "_");
    const publicId = `${Date.now()}--${uuidv4()}--${originalName}`;

    return {
      folder: folder,
      public_id: publicId,
      format: "png", // you can also set this dynamically if needed
    };
  },
});

const checkFileType = (file, callback) => {
  const fileTypes = /jpeg|jpg|png|gif|svg/;
  const extName = fileTypes.test(
    file.originalname.split(".").pop().toLowerCase()
  );
  const mimeType = fileTypes.test(file.mimetype);
  if (mimeType && extName) {
    return callback(null, true);
  } else {
    callback("Error: You can only upload images!");
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 },
  fileFilter: (req, file, callback) => {
    checkFileType(file, callback);
  },
});

module.exports = { upload };
