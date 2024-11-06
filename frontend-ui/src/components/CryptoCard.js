import { useEffect, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

const CryptoCard = (props) => {
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("watchlist"));
    if (items) {
      const status = items.some((item) => item.symbol === props.symbol);
      setIsLiked(status);
    }
  }, []);

  const handleAddWatchList = () => {
    setIsLiked(true);
    let localWatchlist = JSON.parse(localStorage.getItem("watchlist"));

    if (localWatchlist) {
      const doesExist = localWatchlist.some((item) => item === props.symbol);
      if (doesExist) return;
      localWatchlist = [...localWatchlist, props.symbol];
      localStorage.setItem("watchlist", JSON.stringify(localWatchlist));
    } else {
      localStorage.setItem("watchlist", JSON.stringify([props.symbol]));
    }

    //Posting the newly watchlisted item in database by calling the api
    fetch("http://localhost:3000/watchlist?symbol=" + props.symbol, {
      method: "POST",
    });
  };

  const buttonStyle = !isLiked ? { color: "black" } : { color: "red" };
  return (
    <>
      <div className="crypto-card">
        <img
          src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${props.id}.png`}
          alt={props.name}
          width="32"
          height="32"
        />
        <h2>{props.name}</h2>
        <p>Current Price: ${props?.quote?.USD?.price?.toFixed(4)}</p>
        <p>Market Cap: ${props?.quote?.USD?.market_cap?.toFixed(2)}</p>
        <p>24h Volume: ${props?.quote?.USD?.volume_24h}</p>
        <p>24h Change: {props?.quote?.USD?.volume_change_24h}</p>
        {!props.hideIcon ? (
          <button
            style={{ height: 40, width: 40, ...buttonStyle }}
            onClick={handleAddWatchList}
          >
            <i className="fa-solid fa-heart"></i>
          </button>
        ) : (
          <button style={{ height: 40, width: 40 }} onClick={props.onRemove}>
            <i className="fa-solid fa-trash" style={{}}></i>
          </button>
        )}
      </div>
    </>
  );
};

export default CryptoCard;
