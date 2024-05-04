const axios = require('axios');
const cron = require('node-cron');
const EtherPrice = require("../models/etherPriceSchema")
let cachedPrice = null;

async function fetchPrice() {
    try {
        let price = await axios.get("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr");
        price = price.data.ethereum.inr;
        cachedPrice = price;
        EtherPrice.insertMany({price});
    } catch (e) {
        console.error(e);
    }
}
cron.schedule('*/10 * * * *', fetchPrice);

async function getCachedPrice() {
    if (cachedPrice == null) {
        await fetchPrice();
    }
    return cachedPrice;
}

// Export the function to get the cached Ethereum price
module.exports = { getCachedPrice };