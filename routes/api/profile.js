const express = require("express"),
  router = express.Router();

// @route   GET api/profile
// @desc    Test route
// @access  Public
router.get("/", (req, res) => res.send("profile Route"));

module.exports = router;
