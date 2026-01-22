const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, "0.0.0.0", () => {
  console.log("Server running on 0.0.0.0:3000");
});
