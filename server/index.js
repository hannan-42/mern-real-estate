import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import userRouter from "./routes/user.js";
import auth from "./routes/auth.js";

mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log("Database Connection Error:", err));

const app = express();
app.use(express.json());

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.use("/server/user", userRouter);
app.use("/server/auth", auth);
