import React, { useEffect, useState } from "react";
import axios from "../utils/axios";

import SideNav from "./partials/SideNav";
import TopNav from "./partials/TopNav";
import Header from "./partials/Header";
import HorizontalCards from "./partials/HorizontalCards";
import Dropdown from "./partials/Dropdown";
import Loading from "./Loading";

function Home() {
  document.title = "Sakura DB | Home";
  const [wallpaper, setWallpaper] = useState(null);
  const [trending, setTrending] = useState([]);
  const [category, setCategory] = useState("all");

  const getHeaderWallpaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      let randomData = data.results[(Math.random() * data.results.length) | 0]; // Math.random() * length returns a floating number, bitwise OR with 0 to floor it
      setWallpaper(randomData);
    } catch (err) {
      console.log("Error: " + err);
    }
  };

  const getTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);
      setTrending(data.results);
    } catch (err) {
      console.log("Error: " + err);
    }
  };

  useEffect(() => {
    getTrending();
    !wallpaper && getHeaderWallpaper();
  }, [category]);

  return wallpaper && trending.length > 0 ? (
    <>
      <div className="w-full h-full overflow-hidden overflow-y-auto">
        <Header data={wallpaper} />

        <div className="p-5 flex justify-between">
          <h1 className="text-3xl text-zinc-400 font-semibold">Trending</h1>
          <Dropdown
            title="Filter"
            options={["tv", "movie", "all"]}
            func={(e) => {
              setCategory(e.target.value);
            }}
          />
        </div>

        <HorizontalCards data={trending} />
      </div>
    </>
  ) : (
    <Loading />
  );
}

export default Home;
