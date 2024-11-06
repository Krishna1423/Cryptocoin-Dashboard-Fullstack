import "./Dashboard.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CryptoDashBoard from "./components/CryptoDashboard";
import Navigation from "./components/Navigation";
import Watchlist from "./components/Watchlist";

function App() {
  return (
    <>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<CryptoDashBoard />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
