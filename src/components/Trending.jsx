import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dropdown from "./partials/Dropdown";
import axios from "../utils/axios";
import VerticalCards from "./partials/VerticalCards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

function Trending() {
  document.title = "Sakura TV | Trending";
  const navigate = useNavigate();
  const [category, setCategory] = useState("all");
  const [duration, setDuration] = useState("day");
  const [trending, setTrending] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const getTrending = async (reset = false) => {
    try {
      const { data } = await axios.get(
        `/trending/${category}/${duration}?page=${page}`
      );
      if (data.results.length === 0) {
        setHasMore(false);
      } else {
        setTrending((prevState) =>
          reset ? data.results : [...prevState, ...data.results]
        );
        setPage((prevPage) => prevPage + 1);
      }
    } catch (err) {
      console.log("Error: " + err);
    }
  };

  const refreshHandler = () => {
    setPage(1);
    setTrending([]);
    setHasMore(true);
    getTrending(true);
  };

  useEffect(() => {
    refreshHandler();
  }, [category, duration]);

  useEffect(() => {
    if (page > 1) {
      getTrending();
    }
  }, [page]);

  return trending.length > 0 ? (
    <div className="w-[100%] h-screen overflow-hidden overflow-y-auto p-10">
      <div className="px-[3%] w-full flex items-center justify-between gap-[25%]">
        <h1 className="text-2xl text-zinc-400 font-semibold">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] pr-3 ri-arrow-left-line"
          ></i>
          Trending
        </h1>
        <div className="flex items-center w-[80%]">
          <Dropdown
            title="Category"
            options={["all", "tv", "movie"]}
            func={(e) => setCategory(e.target.value)}
            selectedOption={category}
          />
          <div className="w-[2%]"></div>
          <Dropdown
            title="Duration"
            options={["week", "day"]}
            func={(e) => setDuration(e.target.value)}
            selectedOption={duration}
          />
        </div>
      </div>

      <InfiniteScroll
        loader={<h1>Loading</h1>}
        dataLength={trending.length}
        next={() => setPage((prevPage) => prevPage + 1)}
        hasMore={hasMore}
      >
        <VerticalCards data={trending} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
}

export default Trending;
