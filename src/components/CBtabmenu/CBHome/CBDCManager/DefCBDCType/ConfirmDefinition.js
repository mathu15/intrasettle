import React, { useState } from "react";
import { IssuanceService } from "../../IssuanceService";
import { Button } from "primereact/button";
// review and confirm (display) the entered user input
const ConfirmDefinition = ({ data, setData }) => {
  // using fetch from IssuanceSevice.js

  const text = data.assetid.label;

  const myArray = text.split(",");

  const issuanceService = new IssuanceService();
  const entitymintasset = async () => {
    issuanceService.entitymintasset(myArray[1], myArray[0], data.maxvalue);
  };

  // --------------------------

  return (
    <div className="card">
      <div className="flex-column align-items-center justify-content-center">
        <div className=" align-items-center border-bottom-1 pb-3 surface-border surface-overlay w-full mt-5">
          <p className="text-center text-2xl ">
            Review and confirm the cbdc asset definition
          </p>
        </div>
        <div className="flex-column align-items-center border-bottom-1 pb-3 surface-border surface-overlay w-full mt-5">
          <p className=" text-center text-2xl font-bold text-blue-300 mr-3">
            CBDC Name:{myArray[0]}
          </p>
          <p className=" text-center text-2xl font-bold text-blue-300 mr-3">
            Asset id:{myArray[1]}
          </p>
          <p className="text-center text-2xl">
            CBDC Asset decimal:{data.count}
          </p>
        </div>
        <div className=" align-items-center border-bottom-1 pb-3 surface-border surface-overlay w-full mt-5">
          <p className=" text-center text-2xl font-bold text-blue-300 ">
            compliance controls configured
          </p>
        </div>
        <div className="flex-column align-items-center pb-3 border-bottom-1 surface-border surface-overlay w-full mt-5">
          <p className="text-center text-2xl font-bold text-blue-300">
            Notary:{data.notary}
          </p>
          <p className="text-center text-2xl">
            {" "}
            {data.access === true
              ? " Member Access state is requied to hold this CBDC"
              : " Member Access state is not requied"}
          </p>
          <p className="text-center text-2xl">Maximum Value:{data.maxvalue}</p>
        </div>

        <div className=" text-white font-bold flex align-items-center justify-content-around  m-5">
          <Button
            label="CREATE ASSET"
            onClick={() => {
              entitymintasset();
            }}
            // className="text-center text-2xl m-8 align-self-center"
          ></Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDefinition;
