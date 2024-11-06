import CryptoCard from "./CryptoCard";
import { useState, useEffect } from "react";

const Watchlist = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    //Fetching watchlist items from the database
    const response = await fetch("http://localhost:3000/watchlist");
    const data = await response.json();
    console.log(data);
    console.log(localStorage.getItem("list"));

    const list = JSON.parse(localStorage.getItem("list"));

    if (list) {
      const watchListWithData = [];
      data.forEach((element) => {
        const found = list.find((item) => item.symbol === element.symbol);
        if (found) {
          watchListWithData.push(found);
        }
      });
      console.log({ watchListWithData });
      setItems(watchListWithData);
    }
  }

  const handleRemoveWatchlist = (itemToRemove) => {
    //Removing watchlisted item from the db by calling the delete api
    fetch("http://localhost:3000/watchlist?symbol=" + itemToRemove.symbol, {
      method: "DELETE",
    });

    const updatedItems = items.filter(
      (item) => item.symbol !== itemToRemove.symbol
    );
    setItems(updatedItems);

    localStorage.setItem(
      "watchlist",
      JSON.stringify(updatedItems.map((item) => item.symbol))
    );
  };

  return (
    <div>
      <h1>Watchlist</h1>
      <div className="crypto-container">
        {items.length > 0 ? (
          items.map((item, index) => (
            <CryptoCard
              key={index}
              {...item}
              hideIcon
              onRemove={() => handleRemoveWatchlist(item)}
            />
          ))
        ) : (
          <p className="empty-watchlist">Your watchlist is empty.</p>
        )}
      </div>
    </div>
  );
};

export default Watchlist;
