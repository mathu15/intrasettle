import React from "react";
import "/node_modules/primeflex/primeflex.css";
import { NavLink } from "react-router-dom";

import Buttons from "../buttons/Buttons";

const Hero = () => {
  return (
    <>
      <div className="flex justify-content-center flex-wrap card-container yellow-container pt-8 ">
        {/* <div className="border-round bg-blue-100 w-12rem h-6rem p-3 m-3">
          </div> */}
        <div className="col-12 lg:col-6 xl:col-3 ">
        </div>
        <div className="col-12 lg:col-6 xl:col-3">
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default Hero;
