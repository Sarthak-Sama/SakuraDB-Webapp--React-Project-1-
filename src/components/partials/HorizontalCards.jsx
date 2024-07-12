import React from "react";
import { Link } from "react-router-dom";

function HorizontalCards({ data }) {
  return (
    <div className="w-full h-[60vh] text-white flex overflow-x-auto overflow-y-hidden p-5 pb-6">
      {data.length > 0 ? (
        data.map((item, i) => (
          <Link
            to={`/${item.media_type}/details/${item.id}`}
            key={i}
            className="min-w-[15%] h-[47vh] mr-5 bg-zinc-900 hover:bg-[#6556CD] overflow-y-auto"
          >
            <img
              className="w-full h-[40%] object-cover object-center rounded"
              src={`https://image.tmdb.org/t/p/original/${
                item.poster_path || item.backdrop_path
              }`}
              alt=""
            />
            <div className="p-2 ">
              <h1 className="mt-3 text-xl font-semibold">
                {item.title ||
                  item.name ||
                  item.original_name ||
                  item.original_title}
              </h1>
              <p className="text-white my-3">
                {item.overview.slice(0, 50)}...{" "}
                <span className="text-blue-400">more</span>
              </p>
            </div>
          </Link>
        ))
      ) : (
        <h1 className="text-3xl text-zinc-200 font-black text-center mt-5">
          Nothing to Show
        </h1>
      )}
    </div>
  );
}

export default HorizontalCards;
