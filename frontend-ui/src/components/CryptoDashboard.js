import { useEffect, useState, useSyncExternalStore } from "react";
import CryptoCard from "./CryptoCard";
import SearchPanel from "./SearchPanel";

const CryptoDashBoard = () => {
  const [cryptoCoins, setCryptoCoins] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [sortType, setSortType] = useState("market_cap");

  async function getData() {
    const res = await fetch("http://localhost:3000/list?sort=" + sortType);
    const data = await res.json();
    console.log({ data });
    localStorage.setItem("list", JSON.stringify(data));

    const watchlistData = await (
      await fetch("http://localhost:3000/watchlist")
    ).json();

    localStorage.setItem(
      "watchlist",
      JSON.stringify(watchlistData.map((item) => item.symbol))
    );

    setCryptoCoins(data);
    setFilterData(data);
    return res.data;
  }

  useEffect(() => {
    getData();
  }, [sortType]);

  const handleSortType = (sortType) => {
    setSortType(sortType);
  };

  const handleSearch = (searchText) => {
    if (searchText === "") {
      setFilterData(cryptoCoins);
      return;
    }
    console.log({ cryptoCoins });
    const filterCoins = cryptoCoins.filter((coin) =>
      coin.name.toLowerCase().includes(searchText.toLowerCase())
    );
    console.log(filterCoins);
    setFilterData(filterCoins);
  };

  return (
    <div className="app">
      <h1>Crypto Coin Tracker</h1>
      <SearchPanel
        searchCallback={handleSearch}
        sortTypeCallback={handleSortType}
      />
      <div className="crypto-container">
        {filterData.map((currentCoin, index) => {
          return <CryptoCard key={index} {...currentCoin} />;
        })}
      </div>
    </div>
  );
};

export default CryptoDashBoard;
