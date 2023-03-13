#!/usr/bin/env node
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

require("dotenv").config();
const port = process.env.Server_Port || 80;
const router = require(path.join(__dirname, "./src/routes/routes"));

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to API !!!" });
});

app.use("/", router);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

app.listen(port, async () => {
  console.log(`API listening at http://localhost:${port}`);
});
