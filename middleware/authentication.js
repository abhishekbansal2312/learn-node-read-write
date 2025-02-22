const authenticate = (req, res, next) => {
  const token = req.cookies.authtoken;
  console.log(token);

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  next();
};

export default authenticate;
