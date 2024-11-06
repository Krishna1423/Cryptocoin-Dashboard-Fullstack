const watchItem = require("../models/watchItem");

const addItem = (symbol) => {
  try {
    if (!symbol) {
      console.log("symbol is not valid");
    }

    console.log(`item ${symbol} added to watchlist`);
    const item = new watchItem({
      symbol: symbol,
    });

    item.save();
  } catch (err) {
    console.log(`error adding item: ${err}`);
  }
};

const removeItem = async (symbol) => {
  try {
    if (!symbol) {
      console.log("symbol is not valid");
    }

    await watchItem.deleteOne({ symbol: symbol });
    console.log(`item ${symbol} removed from watchlist`);
  } catch (err) {
    console.log(`error removing item: ${err}`);
  }
};

const getItems = async () => {
  try {
    console.log(`watchlist items fetched`);

    const items = await watchItem.find({});

    return items;
  } catch (err) {
    console.log(`error fetching items: ${err}`);
  }
};

module.exports = {
  addItem,
  removeItem,
  getItems,
};
