import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectToDatabase from "./database.js";

import fileSystemRoutes from "./routes/fileSystemRoutes.js";
import auth from "./routes/auth.js";
import authenticate from "./middleware/authentication.js";
import student from "./routes/studentRoutes.js";
import libraryRoutes from "./routes/libraryRoutes.js";
dotenv.config();

const app = express();
connectToDatabase();

app.use(cookieParser());
app.use(express.json());

app.use("/auth", auth);
app.use("/students", authenticate, student);
app.use("/library", authenticate, libraryRoutes);
app.use("/", authenticate, fileSystemRoutes);
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
