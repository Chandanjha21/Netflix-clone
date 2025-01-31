import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import Header from "./Components/Header/Header";
import TvShows from "./Components/TvShows/Tvshows";
import Movies from "./Components/Movies/Movies";
import RecentlyAdded from "./Components/RecentlyAdded/RecentlyAdded";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tvshows" element={<TvShows />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/recent" element={<RecentlyAdded />} />
      </Routes>
    </Router>
  );
}

export default App;
