const cloudinary = require("cloudinary").v2;
const CloudStorage = require("multer-storage-cloudinary").CloudinaryStorage;
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudStorage({
  cloudinary,
  params: (req, file) => {
    return {
      folder: "iMueble",
      allowed_formats: ["jpg", "png"],
      public_id: `app-${file.originalname}`,
    };
  },
});

module.exports = multer({ storage });
