const express = require("express");
const axios = require("axios");
const router = express.Router();
const path = require("path");
const fs = require("fs");

const offsetCalculator = (limit, offset) => {
  return limit * (offset - 1);
};
/* GET A Single Block. */
router.get("/mevBlock", async function (req, res, next) {
  try {
    if (req.query.block_number == undefined || req.query.block_number == null) {
      res.status(400).json({ err: "Block Number must be provided" });
      return;
    }

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

/* GET A Single Transaction. */
router.get("/mevTransactions", async function (req, res, next) {
  if (req.query.address_from == undefined || req.query.address_from == null) {
    res.status(400).json({ err: "Block Number must be provided" });
    return;
  }
  try {
    let offset = "";
    if (
      (req.query.page != undefined || req.query.page != null) &&
      req.query.page != "1"
    )
      offset = `&offset=${offsetCalculator(10, parseInt(req.query.page))}`;
    else offset = `&offset=0`;
    const response = await axios.get(
      `http://localhost:3000/v_zm_mev_transaction?select=block_number,tx_index,address_from&order=block_number,tx_index&address_from=eq.'${req.query.address_from}'&limit=10` +
        offset
    );
    const responseData = response.data;
    res.json(responseData);
  } catch (err) {
    console.error(`Error while getting MevTransactions `, err.message);
    next(err);
  }
});
module.exports = router;
