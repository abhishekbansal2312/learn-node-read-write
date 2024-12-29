import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectToDatabase from "./database.js";

import fileSystemRoutes from "./routes/fileSystemRoutes.js";
import auth from "./routes/auth.js";
import authenticate from "./middleware/authentication.js";
import student from "./routes/studentRoutes.js";
dotenv.config();

const app = express();
connectToDatabase();

app.use(cookieParser());
app.use(express.json());

app.use("/auth", auth);
app.use("/students", authenticate, student);
app.use("/", authenticate, fileSystemRoutes);

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
