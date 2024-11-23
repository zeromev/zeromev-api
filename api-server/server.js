#!/usr/bin/env node
"use strict";

const app = require("./my-app.js");
const port = process.env.API_Port || 80;

app.listen(port, async () => {
  console.log(`API listening at http://localhost:${port}`);
});
