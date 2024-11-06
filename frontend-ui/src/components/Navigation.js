import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <>
      <div className="navigation-container">
        <ul>
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/watchlist">Watchlist</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navigation;
