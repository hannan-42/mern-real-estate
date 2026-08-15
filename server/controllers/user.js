import { uploadToCloudinary } from "../cloudinary/script.js";

export const test = (req, res) => {
  res.json({
    message: "Server route is working ",
  });
};

export const uploadAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    // Cloudinary upload
    const imageUrl = await uploadToCloudinary(req.file.buffer);

    res.status(200).json({ success: true, url: imageUrl });
  } catch (error) {
    next(error);
  }
};