"use strict";
const express = require("express");
const app = express();
const { PORT } = require("./config");

app.get("/", (req, res) => {
  res.send("Hello from Backend!");
});
app.listen(PORT, function () {
  console.log(`Started on http://localhost:${PORT}`);
});
