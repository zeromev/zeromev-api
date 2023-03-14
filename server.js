#!/usr/bin/env node
"use strict";

const app = require("./my-app.js");

require("greenlock-express")
  .init({
    packageRoot: __dirname,
    configDir: "./greenlock.d",

    maintainerEmail: "contact@szeeshan.me",

    cluster: false,
  })

  // Serves on 80 and 443
  // Get's SSL certificates magically!
  .serve(app);
