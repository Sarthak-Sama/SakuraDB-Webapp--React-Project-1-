// import React from "react";
// import loader from "/loader.gif";

// function Loading() {
//   return (
//     <div className="w-screen h-screen flex justify-center items-center bg-[#6556cd]">
//       <img className="mix-blend-lighten" src={loader} alt="" />
//     </div>
//   );
// }

// export default Loading;

import React from "react";
import "../../public/Loader.css";

function Loading() {
  return (
    <div className="scale-[2] absolute left-[50%] top-[45%]">
      <div className="relative w-20 h-12">
        <span className="absolute top-0 text-purple-300 text-xs tracking-wider animate-text">
          loading
        </span>
        <span className="absolute bottom-0 bg-purple-600 rounded-full w-4 h-4 transform translate-x-16 animate-load before:content-[''] before:absolute before:w-full before:h-full before:bg-purple-300 before:rounded-full before:animate-loadBefore"></span>
      </div>
    </div>
  );
}

export default Loading;
