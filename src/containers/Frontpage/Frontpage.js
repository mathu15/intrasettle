import React from "react";
import "/node_modules/primeflex/primeflex.css";
import { NavLink } from "react-router-dom";

// import Buttons from "../buttons/Buttons";
import { BsBank2, BsGlobe2 } from "react-icons/bs";
import { BsBank } from "react-icons/bs";
import { RiAdminLine } from "react-icons/ri";
// import { IconName } from "react-icons/ai";
// import Transfer from "../buttons/Transfer";
// import Holdings from "../buttons/Holdings";
// import TransactionIssue from "./transactionIssue/TransactionIssue";
// import { BankOutlined, GlobalOutlined } from "@ant-design/icons";
const Frontpage = () => {
  return (
    <>
      <div className="flex-column justify-content-center     w-full p-5 pt-2 pb-8">
        {/* <p className=" text-center text-2xl line-height-2  ">
          Links below will take you to the sandbox!
        </p> */}
        <img
          className="h-8rem w-full"
          src={"images/intrasettle_White.svg"}
          alt="logo"
        />
        {/* <p className="line-height-2  text-xl text-center">
        *(if the build just finished it may take a few more moments fo the web
        api services to come online)
      </p> */}
      </div>
      {/* <div className="card"> */}
      <div className="flex justify-content-between flex-wrap m-8 ">
        {/* <div className="col-12  ">
          <NavLink to="/central-bank">
          <div className="card mb-0 border-1 border-100 bg-gray-800   transition-colors transition-duration-500   hover:bg-gray-900 text-white hover:text-gray-900 ">
            <div className=" flex flex-column align-items-center mb-3">
              <div>
                <span className="block text-900 font-medium text-4xl mb-3">
                  RESERVE BANK OF INDIA
                </span>
              </div>
              <div
                className="flex align-items-center justify-content-center bg-gray-900 border-round "
                style={{ width: "8rem", height: "7rem" }}
              >
                <BsGlobe2 className="text-8xl text-blue-500" />
              </div>
            </div>
            <div className="flex align-items-center justify-content-center text-center">
              <span className="text-green-500 text-xl font-medium">New </span>
                <span className="text-500 text-xl">Updated</span>
             
              <Buttons />
              <Transfer />
            </div>
          </div>
          </NavLink>
        </div> */}
        <div className="col-12 lg:col-6  w-2">
          <div className="card mb-0 border-1 border-100 bg-gray-800 bg-gray-800  transition-colors transition-duration-500  hover:bg-gray-900 text-white hover:text-gray-900">
            <div className="flex flex-column align-items-center mb-3">
              <div>
                <span className="block text-900 font-medium text-2xl mb-3">
                  CENTRAL BANK
                </span>
              </div>
              <div
                className="flex align-items-center justify-content-center bg-gray-900 border-round"
                style={{ width: "8rem", height: "7rem" }}
              >
                <BsGlobe2 className="text-8xl text-center text-blue-500" />
              </div>
            </div>
            <div className="text-center">
              <NavLink to="/cb-login">
                <span className="text-green-500 text-2xl font-medium">
                  Click{" "}
                </span>
                <span className="text-500 text-2xl">here</span>
              </NavLink>
            </div>
          </div>

          {/* <div className="text-500 text-2xl text-center">
            Already Registered?
            <NavLink to="/cblogin">Login </NavLink>
          </div> */}
        </div>
        <div className="col-12 lg:col-6  w-2">
          <div className="card mb-0 border-1 border-100 bg-gray-800 bg-gray-800  transition-colors transition-duration-500  hover:bg-gray-900 text-white hover:text-gray-900">
            <div className="flex flex-column align-items-center mb-3">
              <div>
                <span className="block text-900 font-medium text-2xl mb-3">
                  ADMIN
                </span>
              </div>
              <div
                className="flex align-items-center justify-content-center bg-gray-900 border-round"
                style={{ width: "8rem", height: "7rem" }}
              >
                {/* <BsBank className="text-7xl text-yellow-600" /> */}
                <RiAdminLine className="text-7xl text-cyan-500" />
              </div>
            </div>
            <div className="text-center">
              <NavLink to="/admin">
                <span className="text-green-500 text-2xl font-medium">
                  Click{" "}
                </span>
                <span className="text-500 text-2xl">here</span>
              </NavLink>
            </div>
          </div>

          {/* <div className="text-500 text-2xl text-center">
            Already Registered?
            <NavLink to="/">Login </NavLink>
          </div> */}
        </div>
        <div className="col-12 lg:col-6  w-2">
          <div className="card mb-0 border-1 border-100 bg-gray-800 bg-gray-800  transition-colors transition-duration-500  hover:bg-gray-900 text-white hover:text-gray-900">
            <div className="flex flex-column align-items-center mb-3">
              <div>
                <span className="block text-900 font-medium text-2xl mb-3">
                  WHOLESALE BANK
                </span>
              </div>
              <div
                className="flex align-items-center justify-content-center bg-gray-900 border-round"
                style={{ width: "8rem", height: "7rem" }}
              >
                <BsBank className="text-7xl text-yellow-600" />
              </div>
            </div>
            <div className="text-center">
              <NavLink to="/wb-login">
                <span className="text-green-500 text-2xl font-medium">
                  Click{" "}
                </span>
                <span className="text-500 text-2xl">here</span>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Frontpage;
