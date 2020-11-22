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

exports.fileUploader = multer({ storage });

const pictureStorage = new CloudStorage({
  cloudinary,
  params: (req, file) => {
    return {
      folder: "iMueble",
      allowed_formats: ["jpg", "png"],
      public_id: `app-${file.originalname}`,
      transformation: [
        {
          width: 400,
          height: 400,
          gravity: "face",
          radius: "max",
          crop: "crop",
        },
        { width: 200, crop: "scale" },
      ],
    };
  },
});

exports.profilePicture = multer({ storage: pictureStorage });
