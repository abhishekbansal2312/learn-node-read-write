const express = require("express");

const routes = express.Router();

routes.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    const token = "helloIamUser";
    res.cookie("authtoken", token);
    res.json({
      message: "Logged in",
    });
  } else {
    res.status(401).json({
      message: "Invalid credentials",
    });
  }
});

routes.post("/logout", (req, res) => {
  res.clearCookie("authtoken");
  res.json({
    message: "Logged out",
  });
});

module.exports = routes;
