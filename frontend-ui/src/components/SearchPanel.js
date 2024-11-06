import { useState } from "react";

const SearchPanel = (props) => {
  const [searchText, setSearchText] = useState("");

  const handleClick = () => {
    props.searchCallback(searchText);
  };

  const handleSortTypeChange = (event) => {
    props.sortTypeCallback(event.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      props.searchCallback(searchText);
    }
  };

  const handleOnChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <>
      <input
        name="search"
        onKeyDown={handleKeyDown}
        onChange={handleOnChange}
        type="text"
        placeholder="Search Cryptocurrency"
        value={searchText}
      />
      <select name="sortType" onChange={handleSortTypeChange}>
        <option value="market_cap">Market Cap</option>
        <option value="price">Price</option>
        <option value="volume_24h">24h Volume</option>
        <option value="percent_change_24h">24h Change</option>
      </select>
      <button onClick={handleClick}>Search</button>
    </>
  );
};

export default SearchPanel;
