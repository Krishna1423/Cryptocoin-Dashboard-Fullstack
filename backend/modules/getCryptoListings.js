const { COINMARKETCAP_API_KEY } = require("../config");

const DATA_URL =
  "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=" +
  COINMARKETCAP_API_KEY;

async function getDetails(sort) {
  try {
    const response = await fetch(DATA_URL + "&sort=" + sort);
    const results = await response.json();
    const details = results.data;
    return details;
  } catch (err) {
    console.error(`error fetching details from external api: ${err}`);
  }
}

module.exports = { getDetails };
