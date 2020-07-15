const express = require("express"),
  router = express.Router(),
  { check, validationResult } = require("express-validator"),
  User = require("../../models/User"),
  gravatar = require("gravatar"),
  bcrpyt = require("bcryptjs");

// @route   POST api/users
// @desc    Test route
// @access  Public
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check(
      "password",
      "PLease enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // To check if user already exists in db
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      //   Create a gravitar for the user
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      // Creating a new user
      user = new User({
        name,
        email,
        password,
        avatar,
      });

      // Using bcrypt library to hash the password
      const salt = await bcrpyt.genSalt(10);

      user.password = await bcrpyt.hash(password, salt);

      // Adding user to db
      await user.save();

      res.send("gotcha");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
