const express = require("express");
const axios = require("axios");
const router = express.Router();
const path = require("path");
const fs = require("fs");

/* GET CDR. */
router.get("/mevBlock", async function (req, res, next) {
  try {
    const response = await axios.get(
      `http://localhost:3000/zm_mev_transaction?block_number=eq.${req.query.block_number}`
    );
    const responseData = response.data;
    res.json(responseData);
  } catch (err) {
    console.error(`Error while getting MevBlock `, err.message);
    next(err);
  }
});

module.exports = router;
