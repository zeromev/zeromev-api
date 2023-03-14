#!/usr/bin/env node
"use strict";
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const fs = require("fs");

require("dotenv").config();
const port = process.env.Server_Port || 80;
const router = require(path.join(__dirname, "./src/routes/routes"));

const swaggerUi = require("swagger-ui-express"),
  swaggerDocument = require("./swagger.json");

const swaggerOptions = {
  customCss:
    ".topbar-wrapper img {content:url('https://data.zeromev.org/logo');}",
};

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

app.get("/logo", async function (req, res, next) {
  try {
    fs.access(`./zmblack.png`, fs.F_OK, (err) => {
      if (err) {
        res.json({ stderr: "File Not Found" });
        return;
      }
      res.download(`./zmblack.png`, `zmblack.png`);
    });
  } catch (err) {
    console.error(`Error while downloading File `, err.message);
    next(err);
  }
});

app.use("/v1", router);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, swaggerOptions)
);

// app.listen(port, async () => {
//   console.log(`API listening at http://localhost:${port}`);
// });
module.exports = app;
