import React from "react";
import { Link } from "react-router-dom";

function VerticalCards({ data, title }) {
  return (
    <div className="flex flex-wrap w-full pl-[4%] mt-[10%]">
      {data.map((card, i) => (
        <Link
          to={`/${card.media_type || title}/details/${card.id}`}
          className="w-[25vh] mr-[5%] mb-[5%] relative"
          key={i}
        >
          <img
            className="h-[40vh] object-cover object-center shadow-[8px_17px_38px_2px_rgba(0,0,0,0.9)] hover:shadow-[8px_17px_38px_2px_rgb(101,86,205,0.3)]  "
            src={`https://image.tmdb.org/t/p/original/${
              card.poster_path || card.profile_path || card.backdrop_path
            }`}
            alt=""
          />
          <h1 className="text-2xl text-zinc-300 mt-3 font-semibold">
            {card.title ||
              card.name ||
              card.original_name ||
              card.original_title}
          </h1>

          {card.vote_average && (
            <div className="absolute right-[-10%] bottom-[25%] rounded-full text-xl font-semibold bg-yellow-600 text-xs text-white w-[5vh] h-[5vh] flex justify-center items-center">
              {(card.vote_average * 10).toFixed()}
              <sup>%</sup>
            </div>
          )}
        </Link>
      ))}
      ;
    </div>
  );
}

export default VerticalCards;
