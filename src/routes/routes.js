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
  if (
    (req.query.address_from == undefined || req.query.address_from == null) &&
    (req.query.address_to == undefined || req.query.address_to == null)
  ) {
    res.status(400).json({
      err: "Address must be provided. Either provide address_from, or address_to",
    });
    return;
  }
  try {
    let offset = "",
      addressFrom = "",
      addressTo = "";
    const limit = 1000;
    if (
      (req.query.page != undefined || req.query.page != null) &&
      req.query.page != "1"
    )
      offset = `&offset=${offsetCalculator(limit, parseInt(req.query.page))}`;
    else offset = `&offset=0`;
    if (req.query.address_from != undefined && req.query.address_from != null)
      addressFrom = `&address_from=eq.${req.query.address_from.toLowerCase()}`;

    if (req.query.address_to != undefined && req.query.address_to != null)
      addressTo = `&address_to=eq.${req.query.address_to.toLowerCase()}`;

    const response = await axios.get(
      `http://${ip}:${port}/v_zm_mev_transaction?order=block_number,tx_index&limit=${limit}` +
        offset +
        addressFrom +
        addressTo
    );
    const responseData = response.data;
    res.json(responseData);
  } catch (err) {
    console.error(`Error while getting MevTransactions `, err.message);
    next(err);
  }
});

/* GET Transaction Summary without Pagination. */
router.get("/mevTransactionsSummary", async function (req, res, next) {
  let addressFrom = "",
    addressTo = "";
  if (
    (req.query.address_from == undefined || req.query.address_from == null) &&
    (req.query.address_to == undefined || req.query.address_to == null)
  ) {
    res.status(400).json({
      err: "Address must be provided. Either provide address_from, or address_to",
    });
    return;
  }
  if (req.query.address_from != undefined && req.query.address_from != null)
    addressFrom = `&address_from=eq.${req.query.address_from.toLowerCase()}`;

  if (req.query.address_to != undefined && req.query.address_to != null)
    addressTo = `&address_to=eq.${req.query.address_to.toLowerCase()}`;

  try {
    const response = await axios.get(
      `http://${ip}:${port}/v_zm_mev_transaction_summary?select=mev_type,sum_user_loss_usd,sum_user_swap_volume_usd,sum_user_swap_count,sum_extractor_profit_usd,sum_extractor_swap_volume_usd,sum_extractor_swap_count` +
        addressFrom +
        addressTo
    );
    const responseData = response.data;
    res.json(responseData);
  } catch (err) {
    console.error(`Error while getting MevTransactionSummary `, err.message);
    next(err);
  }
});

module.exports = router;
