import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncLoadPerson } from "../store/actions/personActions";
import {
  useNavigate,
  useParams,
  Link,
  useLocation,
  Outlet,
} from "react-router-dom";
import { removeperson } from "../store/reducers/personSlice";
import Loading from "./Loading";
import TopNav from "./partials/TopNav";
import HorizontalCards from "./partials/HorizontalCards";
import Dropdown from "./partials/Dropdown";

function PersonDetails() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.person);
  const dispatch = useDispatch();

  const [category, setCategory] = useState("movie");

  useEffect(() => {
    dispatch(asyncLoadPerson(id));
    return () => {
      dispatch(removeperson());
    };
  }, [id]);

  return info ? (
    <div className="w-screen h-screen overflow-x-hidden overflow-y-auto px-[10%] pt-5 relative">
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
        </div>
        <div className="right-nav">
          <TopNav className="w-40" />
        </div>
      </nav>

      <div className="w-full flex gap-x-20">
        {/* Part 2 left Poster and Details */}
        <div className="w-[20%]">
          <img
            className="h-[40vh] object-cover object-center shadow-[8px_17px_38px_2px_rgba(0,0,0,0.9)] hover:shadow-[8px_17px_38px_2px_rgb(101,86,205,0.3)]"
            src={`https://image.tmdb.org/t/p/original/${info.detail.profile_path}`}
            alt=""
          />
          <hr className="mt-10 mb-5 border-none h-[2px] bg-zinc-500" />
          <div className="text-2xl justify-center flex gap-x-6">
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
              href={`https://www.facebook.com/${info.externalId.facebook_id}`}
            >
              <i class="ri-facebook-box-fill"></i>
            </a>
            <a
              className="hover:text-white text-zinc-300"
              target="_blank"
              href={`https://www.instagram.com/${info.externalId.instagram_id}`}
            >
              <i class="ri-instagram-fill"></i>
            </a>
            <a
              className="hover:text-white text-zinc-300"
              target="_blank"
              href={`https://www.twitter.com/${info.externalId.twitter_id}`}
            >
              <i class="ri-twitter-x-fill"></i>
            </a>
          </div>

          {/* Personal Info */}

          <h2 className="text-xl my-5 text-center text-zinc-400 font-semibold">
            Personal Information
          </h2>
          <h3 className="text-zinc-400 my-1">
            Known for: {info.detail.known_for_department}
          </h3>
          <h3 className="text-zinc-400 my-1">
            Gender: {info.detail.gender === 2 ? "Male" : "Female"}
          </h3>
          <h3 className="text-zinc-400 my-1">
            Birthday: {info.detail.birthday}
          </h3>
          <h3 className="text-zinc-400 my-1">
            Place of Birth: {info.detail.place_of_birth}
          </h3>
          <h3 className="text-zinc-400 my-1">
            Also Known as:
            <br />
            {info.detail.also_known_as.join(", ")}
          </h3>
        </div>
        {/* Part 3 Right Details and Info */}
        <div className="w-[85%]">
          <h1 className="text-white font-black text-6xl mb-10">
            {info.detail.name}
          </h1>
          <h2 className="text-white text-3xl italic">Biography</h2>
          <p className="text-white my-4">{info.detail.biography}</p>

          <hr className="my-10 opacity-50" />

          <h2 className="text-white text-3xl italic">Known For</h2>
          <HorizontalCards data={info.combinedCredits.cast} />

          <div className="w-full flex justify-between">
            <h2 className="mt-5 text-xl text-zinc-400 font-semibold">Acting</h2>
            <Dropdown
              title={"Category"}
              options={["tv", "movie"]}
              func={(e) => setCategory(e.target.value)}
            />
          </div>

          <div className="list-disc text-zinc-400 w-full h-[50vh] shadow-lg shadow-[rgba(255,255,255,.3)] border-2 border-zinc-700 my-10 p-10">
            <h3 className="h-[20%]">
              <span className="inline-block w-[30vw] text-3xl text-white">
                {category.charAt(0).toUpperCase()}
                {category.substring(1).toLowerCase()} Name
              </span>
              <span className="w-[30vw] inline-block text-3xl text-white text-left">
                Character Played
              </span>
            </h3>

            <div className="h-[80%] overflow-x-hidden overflow-y-auto">
              {info[category + "Credits"].cast.map((cast, i) => (
                <h4 className="hover:text-white w-80">
                  <Link
                    to={`/${category}/details/${cast.id}`}
                    className="w-[60vw] flex hover:bg-zinc-800"
                  >
                    <span className="w-[30vw] inline-block items-center">
                      <span className="text-3xl">•</span>
                      {cast.name ||
                        cast.title ||
                        cast.original_name ||
                        cast.original_title}
                    </span>

                    <span className="w-[30vw] text-left flex items-center">
                      {cast.character ? cast.character : "N.A."}
                    </span>
                  </Link>
                </h4>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
}
export default PersonDetails;
