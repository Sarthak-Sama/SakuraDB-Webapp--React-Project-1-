import React from "react";

function About() {
  return (
    <div className="px-[10%] py-[5%] text-white relative">
      <h1 className="font-black text-6xl">About this Website...</h1>
      <p className="text-lg mt-10">
        Welcome to my very first React project, where you can embark on an epic
        quest to discover and search for your favorite movies and series! Dive
        into a treasure trove of cinematic gems and binge-worthy shows, armed
        with all the info you need to impress your friends and win trivia night.
        Grab your popcorn, and let's get this show on the road! 🎬🍿
      </p>

      <img
        className="mx-[20%] my-[10%] rounded-lg"
        src="https://66.media.tumblr.com/5625b65e58ca7e58e227ac4ed4d8ab6e/beac65286062eb98-8c/s500x750/c215f9cfb3d97be515483ede60e7737a9ad466ea.gif"
        alt=""
      />
    </div>
  );
}

export default About;
