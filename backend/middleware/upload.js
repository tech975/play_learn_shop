const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const profileStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "user_profiles",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const uploadProfile = multer({ storage: profileStorage });

const venueStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "venues",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});
const uploadVenue = multer({ storage: venueStorage });

module.exports = { uploadProfile, uploadVenue };
