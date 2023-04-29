import React, { useState } from "react";

import { IssuanceService } from "../IssuanceService";

import { Steps } from "primereact/steps";
import { Button } from "primereact/button";
import CBName from "./DefCBDCType/CBName";
import NotarySel from "./DefCBDCType/NotarySel";
import MAC from "./DefCBDCType/MAC";
import TranscationControl from "./DefCBDCType/TranscationControl";
import AssetControl from "./DefCBDCType/AssetControl";
import ConfirmDefinition from "./DefCBDCType/ConfirmDefinition";
import InformationSubmitted from "./DefCBDCType/InformationSubmitted";

const DefCBDCType = () => {
  //curent page for  steps is set to default index 0
  const [activeIndex, setActiveIndex] = useState(0);

  //initial state fo user input
  const [data, setData] = useState({
    // issuetype: "",
    count: {},
    option: "",
    access: true,
    select: "",
    accesconrol: "",
    confirm: "",
    transvalue: "",
    maxvalue: "",
    minvalue: "",
    amount: "",
    issuer: "",
    assetid: "",
    skip: "(skip this step if no controls are required)",
  });

  console.log(data);

  const wizardItems = [
    {
      label: "CBDC Name & Decimal",
    },
    {
      label: "Notary Selection",
    },
    {
      label: "Member Access control",
    },
    {
      label: "Tansaction Contracts",
    },
    {
      label: "Asset Controls",
    },
    {
      label: "Confirm Definition",
    },
  ];

  //setting active index tab for steps pages
  const pageDisplay = () => {
    if (activeIndex === 0) {
      return <CBName data={data} setData={setData} />;
    } else if (activeIndex === 1) {
      return <NotarySel data={data} setData={setData} />;
    } else if (activeIndex === 2) {
      return <MAC data={data} setData={setData} />;
    } else if (activeIndex === 3) {
      return <TranscationControl data={data} setData={setData} />;
    } else if (activeIndex === 4) {
      return <AssetControl data={data} setData={setData} />;
    } else if (activeIndex === 5) {
      return <ConfirmDefinition data={data} setData={setData} />;
    } else if (activeIndex === wizardItems.length) {
      return (
        <InformationSubmitted
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
      );
    }
  };

  const [centralaccount, setCentralaccount] = useState("cash_INR");
  const issuanceService = new IssuanceService();

  const centralasset = async () => {
    issuanceService.centralasset(data.assetid, centralaccount, data.maxvalue);
  };
  // centralasset();

  return (
    <div className="col-12 p-5">
      <div className="card card-w-title border-1 border-300 bg-gray-800 ">
        {/* implementing steps */}
        <Steps
          model={wizardItems}
          activeIndex={activeIndex}
          onSelect={(e) => setActiveIndex(e.index)}
          readOnly={false}
          style={{ fontSize: "1.4rem" }}
          className="p-5 m-3 text-3xl"
        />
      </div>

      <div className="card justify-content-center align-items-center pb-6">
        {
          //display the steps pages CBName,NotaySelect, MAC, TranscationControl,AssetControl,ConfirmDefinition

          pageDisplay()
        }
      </div>

      <div className="p-5">
        <div className="flex align-items-center justify-content-between">
          <div className="w-6rem h-5rem  text-white font-bold flex align-items-center justify-content-center   mr-3">
            <Button
              disabled={activeIndex === 0}
              onClick={() => {
                setActiveIndex((curPage) => curPage - 1);
              }}
              label="BACK"
              style={{
                display: activeIndex === wizardItems.length ? "none" : "block",
              }}
            />
          </div>
          <div className="w-6rem  text-white font-bold flex align-items-center justify-content-center   mr-3">
            <Button
              onClick={() => {
                if (activeIndex === wizardItems.length) {
                  <InformationSubmitted
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                  />;
                } else {
                  setActiveIndex((curPage) => curPage + 1);
                }
              }}
              label={activeIndex === wizardItems.length - 1 ? "SUBMIT" : "NEXT"}
              style={{
                display: activeIndex === wizardItems.length ? "none" : "block",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefCBDCType;
