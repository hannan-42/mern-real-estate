import User from "../models/user.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username.trim() === "" ||
    email.trim() === "" ||
    password.trim() === ""
  ) {
    return next(errorHandler(400, "All fields are required"));
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(errorHandler(400, "User already exists"));
    }
    const newUser = new User({
      username,
      email,
      password,
    });

    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email.trim() === "" || password.trim() === "") {
    return next(errorHandler(400, "All fields are required"));
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "Invalid credentials"));

    const isPasswordValid = await bcryptjs.compare(
      password,
      validUser.password,
    );
    if (!isPasswordValid) return next(errorHandler(401, "Invalid credentials"));

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    const { password: pass, ...restOfUserData } = validUser._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json(restOfUserData);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      if (req.body.photo && existingUser.avatar !== req.body.photo) {
        existingUser.avatar = req.body.photo;
        await existingUser.save();
      }
      const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      const { password: hashedPassword, ...restOfUserData } = existingUser._doc;

      return res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        .status(200)
        .json(restOfUserData);
    }

    const generatedPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcryptjs.hash(generatedPassword, 10);

    const newUser = new User({
      username:
        req.body.name.split(" ").join("").toLowerCase() +
        Math.random().toString(36).slice(-4),
      email: req.body.email,
      password: hashedPassword,
      avatar: req.body.photo,
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    const { password: pass, ...restOfUserData } = newUser._doc;

    return res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json(restOfUserData);
  } catch (error) {
    next(error);
  }
};
