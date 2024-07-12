import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import NotFound from "../NotFound";
import Loading from "../Loading";

function Trailer() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const ytvideo = useSelector((state) => state[category].info?.videos);
  console.log(pathname.slice(0, -8));

  const handleNavigate = () => {
    navigate(pathname.slice(0, -8));
  };

  return (
    <div className="top-0 left-0 fixed w-screen h-screen flex items-center justify-center">
      <div
        onClick={handleNavigate}
        className="bg-[rgba(0,0,0,.7)] w-screen h-screen absolute z-[100]"
      />
      {ytvideo ? (
        <ReactPlayer
          height={540}
          width={860}
          className="absolute z-[1000]"
          url={`https://www.youtube.com/watch?v=${ytvideo.key}`}
        />
      ) : (
        <NotFound />
      )}
    </div>
  );
}

export default Trailer;
