const express = require("express");
const axios = require("axios");
const router = express.Router();
const ip = process.env.IP || "localhost";
const port = process.env.Port || 3000;

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
    if (req.query.count) {
      if (parseInt(req.query.count) > 100) {
        res.status(400).json({ err: "Count cannot be greater than 100" });
        return;
      }
      limit = `block_number=gte.${req.query.block_number}&block_number=lt.${
        parseInt(req.query.block_number) + parseInt(req.query.count)
      }`;
    } else limit = `block_number=eq.${req.query.block_number}`;
    const response = await axios.get(
      `http://${ip}:${port}/v_zm_mev_transaction?` + limit
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
    const limit = 1000;
    if (
      (req.query.page != undefined || req.query.page != null) &&
      req.query.page != "1"
    )
      offset = `&offset=${offsetCalculator(limit, parseInt(req.query.page))}`;
    else offset = `&offset=0`;
    const response = await axios.get(
      `http://${ip}:${port}/v_zm_mev_transaction?order=block_number,tx_index&address_from=eq.${req.query.address_from}&limit=${limit}` +
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
