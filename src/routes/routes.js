const express = require("express");
const axios = require("axios");
const router = express.Router();
const path = require("path");
const fs = require("fs");

/* GET A Single Block. */
router.get("/mevBlock", async function (req, res, next) {
  try {
    let limit = "";
    if (req.query.count)
      limit = `block_number=gte.${req.query.block_number}&block_number=lt.${
        parseInt(req.query.block_number) + parseInt(req.query.count)
      }`;
    else limit = `block_number=eq.${req.query.block_number}`;
    const response = await axios.get(
      `http://localhost:3000/v_zm_mev_transaction?` + limit
    );
    const responseData = response.data;
    res.json(responseData);
  } catch (err) {
    console.error(`Error while getting MevBlock `, err.message);
    next(err);
  }
});

module.exports = router;
