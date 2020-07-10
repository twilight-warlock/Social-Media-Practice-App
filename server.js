const express = require("express"),
  app = express(),
  PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

// Setting up the server
app.listen(PORT, () => console.log(`Server Started on Port ${PORT}`));
