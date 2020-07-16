const jwt = require("jsonwebtoken"),
  config = require("config");

module.exports = function (req, res, next) {
  // Get token from the header
  const token = req.header("x-auth-token");

  // Check for token
  if (!token) {
    return res
      .status(401)
      .json({ msg: "No token present, authorization denied" });
  }

  // if token is present, Verify the token
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    req.user = decoded.user;

    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid token" });
  }
};
