const express = require("express"),
  app = express(),
  PORT = process.env.PORT || 5000,
  connectDB = require("./config/db");

// Connecting to the database
connectDB();

// Initializing Middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

// Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/post", require("./routes/api/post"));

// Setting up the server
app.listen(PORT, () => console.log(`Server Started on Port ${PORT}`));
