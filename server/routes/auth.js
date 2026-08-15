import express from "express";
import multer from "multer";
import { signup, signin, google } from "../controllers/auth.js";
import { uploadAvatar } from "../controllers/user.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", google);
router.post('/upload-avatar', upload.single('avatar'), uploadAvatar);
export default router;