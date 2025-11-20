const express = require("express");
const axios = require("axios");
const router = express.Router();

const PriceSnapshot = require("../models/PriceSnapshot");

const COINS = ["bitcoin", "ethereum", "litecoin", "cardano"];

router.get("/", async (req, res) => {
  try {
    const ids = COINS.join(",");
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`;

    const resp = await axios.get(url);
    const prices = resp.data;

    try {
      await PriceSnapshot.create({ prices });
    } catch (e) {
      console.log("No se pudo guardar snapshot:", e.message);
    }

    res.json({ success: true, prices });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Error obteniendo precios" });
  }
});

module.exports = router;
