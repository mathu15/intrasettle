import React, { useRef, useState } from "react";

import { Steps } from "primereact/steps";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

import InformationSubmitted from "../../CBtabmenu/CBHome/CBDCManager/DefCBDCType/InformationSubmitted";

import SelectParWBOCross from "./RequestCrossSwapWBO/SelectParWBOCross";
import SelectAssWBOCross from "./RequestCrossSwapWBO/SelectAssWBOCross";
import AssetAmtWBOCross from "./RequestCrossSwapWBO/AssetAmtWBOCross";
import RevReqWBOCross from "./RequestCrossSwapWBO/RevReqWBOCross";

const RequestCrossSwapWBO = () => {
  //curent page for  steps is set to default index 0
  const [activeIndex, setActiveIndex] = useState(0);
  const toast = useRef(null);
  //initial state fo user input
  const [data, setData] = useState({
    asset: "",
    asset2: "",
    decimal: 2,
    notary: "",
    amount: 0,
    amount2: 0,
    total: 25000000,
    remaining: 25000000,
    option: "",
    access: true,
    select: "",
    accesconrol: "",
    confirm: "",
    transvalue: "",
    maxvalue: 10000000,
    minvalue: "",
    displayvalue: "",
    initial: " ",
  });

  //setting active index tab for steps pages
  const pageDisplay = () => {
    if (activeIndex === 0) {
      return <SelectParWBOCross data={data} setData={setData} />;
    } else if (activeIndex === 1) {
      return <SelectAssWBOCross data={data} setData={setData} />;
    } else if (activeIndex === 2) {
      return <AssetAmtWBOCross data={data} setData={setData} />;
    } else if (activeIndex === 3) {
      return <RevReqWBOCross data={data} setData={setData} />;
    } else if (activeIndex === wizardItems.length) {
      return (
        <InformationSubmitted
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
      );
    }
  };

  const accept = () => {
    toast.current.show({
      severity: "info",
      summary: "Confirmed",
      detail: "You have accepted",
      life: 3000,
    });
    // InformationSubmitted();
  };

  const wizardItems = [
    { label: "Select Participant" },
    {
      label: "Select Asset",
    },
    {
      label: "Asset Amounts",
    },
    {
      label: "Request Review",
    },
  ];
  return (
    <div className="justify-content-around p-8 ml-8 ">
      <div className="card card-w-title">
        {/* implementing steps */}

        <Steps
          model={wizardItems}
          activeIndex={activeIndex}
          onSelect={(e) => setActiveIndex(e.index)}
          readOnly={false}
          style={{ fontSize: "1.4rem" }}
          className="p-5 m-3"
        />
      </div>
      <div className="card">
        {
          //display the steps pages Select Asset, Select Participant, Enter Amount, Confirm Transfer
          pageDisplay()
        }
      </div>
      <div className="p-5">
        <div className="flex align-items-center justify-content-between">
          <div className="w-6rem h-5rem text-white font-bold flex align-items-center justify-content-center   mr-3">
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
            <Toast ref={toast} />
            <Button
              onClick={() => {
                if (activeIndex === wizardItems.length) {
                  accept();
                } else {
                  setActiveIndex((curPage) => curPage + 1);
                }
              }}
              label={activeIndex === wizardItems.length - 1 ? "ISSUE" : "NEXT"}
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

export default RequestCrossSwapWBO;
