import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncLoadtv } from "../store/actions/tvActions";
import {
  useNavigate,
  useParams,
  Link,
  useLocation,
  Outlet,
} from "react-router-dom";
import { removetv } from "../store/reducers/tvSlice";
import Loading from "./Loading";
import TopNav from "./partials/TopNav";
import HorizontalCards from "./partials/HorizontalCards";

function tvDetails() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.tv);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncLoadtv(id));
    return () => {
      dispatch(removetv());
    };
  }, [id]);

  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.2), rgba(0,0,0,.4), rgba(0,0,0,0.6)), url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
        backgroundPosition: "top-[10%]",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="w-screen h-screen overflow-x-hidden overflow-y-auto px-[10%] pt-5 relative"
    >
      {/* Part 1 Navbar */}
      <nav className="w-full h-[7vh] text-zinc-100 text-2xl py-3 px-16 mb-16 bg-[#6556CD] rounded-full flex justify-between items-center shadow-[0_10px_20px_2px_rgba(0,0,0,0.5)]">
        <div className="left-nav flex items-center gap-10">
          <Link
            to={"/"}
            className="hover:text-white text-zinc-300 pr-3 ri-home-2-fill scale-125"
          ></Link>
          <Link
            onClick={() => navigate(-1)}
            className="hover:text-white text-zinc-300 pr-3 ri-arrow-left-line scale-150 mr-10"
          ></Link>
          <a
            className="hover:text-white text-zinc-300"
            target="_blank"
            href={info.detail.homepage}
          >
            <i className="ri-external-link-line"></i>
          </a>
          <a
            className="hover:text-white text-zinc-300"
            target="_blank"
            href={`https://www.wikidata.org/wiki/${info.externalId.wikidata_id}`}
          >
            <i className="ri-earth-fill"></i>
          </a>
          <a
            className="hover:text-white text-zinc-300"
            target="_blank"
            href={`https://www.imdb.com/title/${info.externalId.imdb_id}`}
          >
            imdb
          </a>
        </div>
        <div className="right-nav">
          <TopNav className="w-40" />
        </div>
      </nav>

      <div className="flex">
        {/* Part 2 Poster and details */}
        <div className="w-full">
          <img
            className="h-[45vh] object-cover object-center shadow-[8px_17px_38px_2px_rgba(0,0,0,0.9)] hover:shadow-[8px_17px_38px_2px_rgb(101,86,205,0.3)]"
            src={`https://image.tmdb.org/t/p/original/${
              info.detail.poster_path || info.detail.backdrop_path
            }`}
            alt=""
          />
          {/* Part 3 Platforms */}
          <div className="w-[80%] flex flex-col gap-y-5 mt-10">
            {info.watchProvider && info.watchProvider.flatrate && (
              <div className="flex gap-x-3 items-center text-white">
                <h1 className="mr-7">Streaming on</h1>
                {info.watchProvider.flatrate.map((w, i) => (
                  <img
                    key={i}
                    title={w.provider_name}
                    className="w-[3vh] h-[3vh] object-fit rounded-md"
                    src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                  />
                ))}
              </div>
            )}
            {info.watchProvider && info.watchProvider.rent && (
              <div className="flex gap-x-3 items-center text-white">
                <h1>Available for Rent</h1>
                {info.watchProvider.rent.map((w, i) => (
                  <img
                    key={i}
                    title={w.provider_name}
                    className="w-[3vh] h-[3vh] object-fit rounded-md"
                    src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                  />
                ))}
              </div>
            )}
            {info.watchProvider && info.watchProvider.rent && (
              <div className="flex gap-x-3 items-center text-white">
                <h1 className="mr-3">Available to buy</h1>
                {info.watchProvider.buy.map((w, i) => (
                  <img
                    key={i}
                    title={w.provider_name}
                    className="w-[3vh] h-[3vh] object-fit rounded-md"
                    src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="w-[250vw] content ml-[10%] bg-[rgba(31,30,36,.7)] p-10 rounded-3xl">
          <h1 className="text-5xl font-black text-white relative">
            {info.detail.title ||
              info.detail.name ||
              info.detail.original_name ||
              info.detail.original_title}
            <small className="text-xl ml-2 font-bold text-zinc-300">
              ({info.detail.first_air_date.split("-")[0]})
            </small>
            {/* <small className="absolute right-[10%] pt-8 italic text-sm text-zinc-200">
              {info.detail.in_production ? "Ongoing" : "Finished"}
            </small> */}
          </h1>

          <div className="mt-3 mb-5 flex text-white items-center gap-x-5 my-5">
            <span className="rounded-full text-xl font-semibold bg-yellow-600 text-white w-[5vh] h-[5vh] flex justify-center items-center">
              {(info.detail.vote_average * 10).toFixed()}
              <sup>%</sup>
            </span>
            <h3 className="w-[60px] font-semibold text-xl leading-6 ml-[-2%]">
              User Score
            </h3>
            <h3>{info.detail.first_air_date}</h3>
            <h3>{info.detail.genres.map((g) => g.name).join(", ")}</h3>
            <h3>{info.detail.number_of_episodes} Episodes</h3>
          </div>

          <h2 className="text-xl font-semibold italic text-zinc-200 mb-5">
            {info.detail.tagline}
          </h2>

          <h2 className="text-3xl font-semibold text-white">Overview</h2>

          <p className="text-white my-4 w-[80%]">{info.detail.overview}</p>

          <hr className="my-5" />

          <h2 className="text-2xl font-semibold text-zinc-200">
            Available Languages
          </h2>
          <p className="w-[80%] text-white text-xs mt-3 text-justify mb-10">
            {info.translations.join(", ")}
          </p>
          <Link
            to={`${pathname}/trailer`}
            className="text-white py-5 bg-[#6556CD] rounded-lg flex justify-center items-center w-40"
          >
            <i className="ri-play-fill pr-2"></i>
            Play Trailer
          </Link>
        </div>
      </div>

      {/* Part 4 Seasons */}
      <hr className="my-10" />
      <h1 className="text-3xl font-bold text-white">Seasons</h1>
      <div className="w-[100%] flex overflow-y-hidden mb-5 p-5">
        {info.detail.seasons.map((s, i) => (
          <div key={i} className="w-[15vh] mr-[10%]">
            <img
              className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] min-w-[14vw] h-[30vh] object-cover"
              src={`https://image.tmdb.org/t/p/original/${s.poster_path}`}
              alt=""
            />
            <h1 className="text-2xl text-zinc-300 mt-3 font-semibold">
              {s.name}
            </h1>
          </div>
        ))}
      </div>

      {/* Part 5 Recommendations and Similarities */}
      <hr className="my-10" />
      <h2 className="text-2xl font-semibold text-white mb-5">
        Recommendations & Similar Stuff
      </h2>
      <HorizontalCards
        data={
          info.recommendations.length
            ? info.recommendations || info.similar
            : []
        }
      />

      <br />

      <Outlet />
    </div>
  ) : (
    <Loading />
  );
}

export default tvDetails;
