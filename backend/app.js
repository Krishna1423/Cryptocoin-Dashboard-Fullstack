const cors = require("cors");
const express = require("express");
const { connectToDb } = require("./connector");

const app = new express();
const watchlistModule = require("./modules/watchlistModule");
const { getDetails } = require("./modules/getCryptoListings");

const port = 3000;

app.use(cors());

//Routes for watchlist
app.get("/watchlist", async (req, res) => {
  const items = await watchlistModule.getItems();
  res.send(items);
});

app.post("/watchlist", async (req, res) => {
  const { symbol } = req.query;
  console.log(JSON.stringify(req.query));

  await watchlistModule.addItem(symbol);
  res.send();
});

app.delete("/watchlist", async (req, res) => {
  console.log("DELETE - watchlist item called");

  const { symbol } = req.query;

  await watchlistModule.removeItem(symbol);
  res.send();
});

//API to fetch real data from coinmaketcap
app.get("/list", (req, res) => {
  getDetails(req.query.sort).then((data) => res.json(data));
});

connectToDb().catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`server started on ${port}`);
});
