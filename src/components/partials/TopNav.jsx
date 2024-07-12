import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../../utils/axios";
import noImgFound from "/noImg.png";
function TopNav() {
  const [query, setQuery] = useState("");
  const [searches, setSearches] = useState([]);

  const getSeaches = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setSearches(data.results); // Assuming 'data.results' contains the search results array
    } catch (err) {
      console.log("Error: " + err);
    }
  };

  useEffect(() => {
    if (query) {
      getSeaches();
    } else {
      setSearches([]);
    }
  }, [query]);

  return (
    <div className="w-full h-[7vh] relative flex justify-start items-center pl-[18%] py-[2%] top-0 z-[99] ">
      <i className="text-zinc-300 text-2xl ri-search-line"></i>
      <input
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        className="text-zinc-200 w-[35vw] mx-2 p-5 text outline-none border-none bg-transparent"
        type="text"
        placeholder="search anything"
      />
      {query.length > 0 && (
        <i
          onClick={() => setQuery("")}
          className="text-zinc-300 text-2xl ri-close-fill"
        ></i>
      )}

      <div className="absolute w-[37vw] max-h-[50vh] top-[100%] bg-zinc-200 overflow-auto ml-[4%] rounded">
        {searches.length > 0 &&
          searches.map((s, i) => (
            <Link
              to={`/${s.media_type}/details/${s.id}`}
              key={i}
              className="hover:text-black hover:bg-zinc-300 duration font-semibold text-zinc-600 p-10 w-[100%] flex justify-start items-center border-b-2 border-zinc-100"
            >
              <img
                className="w-[10vh] h-[10vh] object-cover rounder mr-5"
                src={
                  s.backdrop_path || s.profile_path
                    ? `https://image.tmdb.org/t/p/original/${
                        s.backdrop_path || s.profile_path
                      }`
                    : noImgFound
                }
              />
              <span>
                {s.name || s.title || s.orignal_title || s.original_name}
              </span>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default TopNav;
