import React from "react";
import { Link } from "react-router-dom";
function Header({ data }) {
  console.log(data);

  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.2), rgba(0,0,0,.4), rgba(0,0,0,0.6)), url(https://image.tmdb.org/t/p/original/${
          data.backdrop_path || data.profile_path
        })`,
        backgroundPosition: "top-[10%]",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="w-full h-[50vh] flex flex-col justify-end items-start p-[5%]"
    >
      <h1 className="w-[70%] text-5xl font-black text-white">
        {data.name || data.title || data.original_name || data.original_title}
      </h1>
      <p className="w-[70%] text-white my-3">
        {data.overview.slice(0, 200)}...{" "}
        <Link
          to={`/${data.media_type}/details/${data.id}`}
          className="text-blue-400"
        >
          more
        </Link>
      </p>
      <p className="text-white">
        {data.release_date && (
          <>
            <i className="text-yellow-500 ri-megaphone-fill mr-1"></i>
            {data.release_date}
          </>
        )}
        {data.release_date && data.media_type && <span className="ml-5"></span>}
        {data.media_type && (
          <>
            <i className="text-yellow-500 ri-clapperboard-fill mr-1"></i>
            {data.media_type.toUpperCase()}
          </>
        )}
      </p>
      <Link
        to={`${data.media_type}/details/${data.id}/trailer`}
        className="p-3 bg-[#6556CD] rounded-md text-white mt-5"
      >
        Watch Trailer
      </Link>
    </div>
  );
}

export default Header;
