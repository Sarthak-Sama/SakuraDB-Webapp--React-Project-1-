import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import VerticalCards from "./partials/VerticalCards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

function People() {
  document.title = "Sakura DB | People";
  const navigate = useNavigate();
  const [people, setPeople] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const getPeople = async (reset = false) => {
    try {
      const { data } = await axios.get(`/person/popular?page=${page}`);
      if (data.results.length === 0) {
        setHasMore(false);
      } else {
        setPeople((prevState) =>
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
    setPeople([]);
    setHasMore(true);
    getPeople(true);
  };

  useEffect(() => {
    refreshHandler();
  }, []);

  useEffect(() => {
    if (page > 1) {
      getPeople();
    }
  }, [page]);

  return people.length > 0 ? (
    <div className="w-[100%] h-screen overflow-hidden overflow-y-auto p-10">
      <div className="px-[3%] w-full flex items-center justify-between gap-[25%]">
        <h1 className="text-2xl text-zinc-400 font-semibold">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] pr-3 ri-arrow-left-line"
          ></i>
          People
        </h1>
        <div className="flex items-center w-[80%]">
          <div className="w-[2%]"></div>
        </div>
      </div>

      <InfiniteScroll
        loader={<h1>Loading</h1>}
        dataLength={people.length}
        next={() => setPage((prevPage) => prevPage + 1)}
        hasMore={hasMore}
      >
        <VerticalCards data={people} title="person" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
}

export default People;
