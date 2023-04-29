import React, { useRef, useState } from "react";
import { Steps } from "primereact/steps";
import { Button } from "primereact/button";

import { Toast } from "primereact/toast";
import MASelectAsset from "./CBMACIssuance/MASelectAsset";
import MASelectParticipant from "./CBMACIssuance/MASelectParticipant";
import MAConfirm from "./CBMACIssuance/MAConfirm";
import InformationSubmitted from "../CBDCManager/DefCBDCType/InformationSubmitted";

const CBMCIssue = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const toast = useRef(null);
  const [data, setData] = useState({
    assetvalue: "",
    participant: "",
  });

  const wizardItems = [
    {
      label: "Select Asset",
    },
    {
      label: "Select Participant",
    },
    {
      label: "Confirm Member Access State Issuance",
    },
  ];

  const pageDisplay = () => {
    if (activeIndex === 0) {
      return <MASelectAsset data={data} setData={setData} />;
    } else if (activeIndex === 1) {
      return <MASelectParticipant data={data} setData={setData} />;
    } else if (activeIndex === 2) {
      return <MAConfirm data={data} setData={setData} />;
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
      detail: "You info submitted",
      life: 3000,
    });
  };

  return (
    <div className="col-12 ">
      <div className="card card-w-title">
        {/* steps to issue the requested asset from he wholesale bank */}

        <Steps
          model={wizardItems}
          activeIndex={activeIndex}
          onSelect={(e) => setActiveIndex(e.index)}
          readOnly={false}
          style={{ fontSize: "1.4rem" }}
        />
      </div>
      <div className="card">
        {
          //display the steps pages CBName,NotaySelect, MAC, TranscationControl,AssetControl,ConfirmDefinition
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

export default CBMCIssue;
