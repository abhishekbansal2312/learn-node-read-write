const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(express.json());

const fileSystemRoutes = require("./routes/fileSystemRoutes.js");
const auth = require("./routes/auth.js");

const authenticate = require("./middleware/authentication.js");

app.use("/auth", auth);
app.use("/", authenticate, fileSystemRoutes);

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
