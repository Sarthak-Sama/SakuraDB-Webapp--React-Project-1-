import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Home from "./components/Home";
import Trending from "./components/Trending";
import TopNav from "./components/partials/TopNav";
import SideNav from "./components/partials/SideNav";
import Popular from "./components/Popular";
import People from "./components/People";
import Movies from "./components/Movies";
import TVShows from "./components/TVShows";

import MovieDetails from "./components/MovieDetails";
import TvDetails from "./components/TvDetails";
import PersonDetails from "./components/PersonDetails";
import Trailer from "./components/partials/Trailer";
import About from "./components/About";
import Contact from "./components/Contact";

function App() {
  const location = useLocation();
  const isDetailPage = [
    "/movie/details",
    "/tv/details",
    "/person/details",
  ].some((path) => location.pathname.startsWith(path));

  return (
    <div className="bg-[#1F1E24] w-screen h-screen flex overflow-hidden">
      {!isDetailPage && <SideNav />}
      <div className={isDetailPage ? "w-full" : "w-[80%]"}>
        {!isDetailPage && <TopNav className="relative z-[99]" />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/popular" element={<Popular />} />

          <Route path="/movies" element={<Movies />} />
          <Route path="/movie/details/:id" element={<MovieDetails />}>
            <Route path="trailer" element={<Trailer />} />
          </Route>

          <Route path="/tvshows" element={<TVShows />} />
          <Route path="/tv/details/:id" element={<TvDetails />}>
            <Route path="trailer" element={<Trailer />} />
          </Route>

          <Route path="/person" element={<People />} />
          <Route path="/person/details/:id" element={<PersonDetails />} />

          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
