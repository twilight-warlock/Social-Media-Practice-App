const express = require("express"),
  app = express(),
  PORT = process.env.PORT || 5000,
  connectDB = require("./config/db");

// Connecting to the database
connectDB();

app.get("/", (req, res) => {
  res.send("Hello World");
});

// Setting up the server
app.listen(PORT, () => console.log(`Server Started on Port ${PORT}`));
