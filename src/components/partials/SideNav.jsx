import React from "react";
import { Link } from "react-router-dom";

function SideNav() {
  return (
    <div className="w-[20%] h-full border-r-2 border-zinc-400 p-10">
      <Link to="/" className="text-2xl text-white font-bold">
        <i className="text-[#6556CD] ri-tv-fill"></i>
        <span>Sakura DB</span>
      </Link>
      <nav className="flex flex-col text-zinc-400 gap-2">
        <h1 className="text-white font-semibold text-xl mt-10 mb-5">
          New Feeds
        </h1>
        <Link
          to="/trending"
          className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-md p-5"
        >
          <i className="ri-fire-fill"></i> Trending
        </Link>
        <Link
          to="/popular"
          className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-md p-5"
        >
          <i className="ri-bar-chart-fill"></i> Popular
        </Link>
        <Link
          to="/movies"
          className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-md p-5"
        >
          <i className="ri-movie-fill"></i> Movies
        </Link>
        <Link
          to="/tvshows"
          className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-md p-5"
        >
          <i className="ri-tv-2-fill"></i> TV Shows
        </Link>
        <Link
          to="person"
          className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-md p-5"
        >
          <i className="ri-team-fill"></i> People
        </Link>
      </nav>
      <hr className="border-none h-[0.5px] mt-5 mb-1 bg-zinc-100" />
      <nav className="flex flex-col text-zinc-400 text-s">
        <h1 className="text-white text-xl mt-10 mb-5">Website Info</h1>
        <Link
          to={"/about"}
          className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-md p-2"
        >
          <i className="ri-information-fill"></i> About 'Sakura DB'
        </Link>
        <Link
          to={"/contact"}
          className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-md p-2"
        >
          <i className="ri-phone-fill"></i> Contact Us
        </Link>
      </nav>
    </div>
  );
}

export default SideNav;
