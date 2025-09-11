const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const profileStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "user_profiles",
    allowed_formats: ["jpg", "png", "jpeg"],
    invalidate: true,
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

const coachStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "coaches",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const uploadCoach = multer({ storage: coachStorage });

const achievementStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "achievements",
    allowed_formats: ["jpg", "png", "jpeg"]
  }
})

const uploadAchievement = multer({ storage: achievementStorage })

module.exports = { uploadProfile, uploadVenue, uploadCoach, uploadAchievement };
