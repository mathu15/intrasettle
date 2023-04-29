import React, { useRef, useState } from "react";

import { Steps } from "primereact/steps";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

import SelectWBOTransCBDC from "./WBOTransferCBDC/PushTransfer/SelectWBOTransCBDC";
import ParticipantWBOTrans from "./WBOTransferCBDC/PushTransfer/ParticipantWBOTrans";
import EnterAmountWBOTrans from "./WBOTransferCBDC/PushTransfer/EnterAmountWBOTrans";
import ConfirmWBOTrans from "./WBOTransferCBDC/PushTransfer/ConfirmWBOTrans";
import InformationSubmitted from "../../CBtabmenu/CBHome/CBDCManager/DefCBDCType/InformationSubmitted";

import WBOPullSelAsset from "./WBOTransferCBDC/PullTransfer/WBOPullSelAsset";
import WBOPullSelParticipant from "./WBOTransferCBDC/PullTransfer/WBOPullSelParticipant";
import WBOPullEnterAmount from "./WBOTransferCBDC/PullTransfer/WBOPullEnterAmount";
import WBOPullConfirmReq from "./WBOTransferCBDC/PullTransfer/WBOPullConfirmReq";

const TransferCBDCWBO = () => {
  //curent page for  steps is set to default index 0
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeOne, setActiveOne] = useState(0);
  const toast = useRef(null);

  //initial state fo user input
  const [data, setData] = useState({
    asset: "",
    decimal: 2,
    notary: "",
    amount: 0,
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
  });

  const [data2, setData2] = useState({
    asset: "",
    decimal: 2,
    notary: "",
    amount: 0,
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
  });
  //setting active index tab for steps pages
  const pageDisplay = () => {
    if (activeIndex === 0) {
      return <SelectWBOTransCBDC data={data} setData={setData} />;
    } else if (activeIndex === 1) {
      return <ParticipantWBOTrans data={data} setData={setData} />;
    } else if (activeIndex === 2) {
      return <EnterAmountWBOTrans data={data} setData={setData} />;
    } else if (activeIndex === 3) {
      return <ConfirmWBOTrans data={data} setData={setData} />;
    } else if (activeIndex === wizardItems.length) {
      return (
        <InformationSubmitted
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
      );
    }
  };
  const pageDisplayOne = () => {
    if (activeOne === 0) {
      return <WBOPullSelAsset data={data2} setData={setData2} />;
    } else if (activeOne === 1) {
      return <WBOPullSelParticipant data={data2} setData={setData2} />;
    } else if (activeOne === 2) {
      return <WBOPullEnterAmount data={data2} setData={setData2} />;
    } else if (activeOne === 3) {
      return <WBOPullConfirmReq data={data2} setData={setData2} />;
    } else if (activeOne === wizardItems.length) {
      return (
        <InformationSubmitted
          activeIndex={activeOne}
          setActiveIndex={setActiveOne}
        />
      );
    }
  };

  const wizardItems = [
    { label: "Select Asset" },
    {
      label: "Select Participant",
    },
    {
      label: "Enter Amount",
    },
    {
      label: "Confirm Transfer",
    },
  ];

  const items = [
    { label: "Select Asset" },
    {
      label: "Select Participant",
    },
    {
      label: "Enter Amount",
    },
    {
      label: "Confirm Request",
    },
  ];

  const accept = () => {
    toast.current.show({
      severity: "info",
      summary: "Confirmed",
      detail: "You have accepted",
      life: 3000,
    });
    // InformationSubmitted();
  };

  return (
    <>
      <div className="flex align-items-center justify-content-around mb-5 mt-5">
        <Button
          label="Push Transfer"
          className="p-button-outlined  mb-3 text-2xl"
        />

        <Button
          label="Pull Transfer(Request CBDC)"
          className="p-button-outlined mr-2 mb-3 text-2xl"
        />
      </div>
      <div className="grid p-fluid p-5 ">
        <div className="col-12 lg:col-6 card p-8 border-1 border-100 ">
          <div className="card border-1 border-100 bg-gray-800 mb-5">
            {/* implementing steps to push transfer*/}
            <Steps
              model={wizardItems}
              activeIndex={activeIndex}
              onSelect={(e) => setActiveIndex(e.index)}
              readOnly={false}
              key={1}
              style={{ fontSize: "1.4rem" }}
              className="p-5 m-3 text-2xl"
            />
          </div>
          <div className="mt-5">
            {
              //display the steps pages Select Asset, Select Participant, Enter Amount, Confirm Transfer
              pageDisplay()
            }
          </div>
          <div className="mt-5">
            <div className="flex align-items-center justify-content-between">
              <div className="w-6rem h-5rem text-white font-bold flex align-items-center justify-content-center   mr-3">
                <Button
                  disabled={activeIndex === 0}
                  onClick={() => {
                    setActiveIndex((curPage) => curPage - 1);
                  }}
                  label="BACK"
                  style={{
                    display:
                      activeIndex === wizardItems.length ? "none" : "block",
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
                  label={
                    activeIndex === wizardItems.length - 1 ? "TRANSFER" : "NEXT"
                  }
                  style={{
                    display:
                      activeIndex === wizardItems.length ? "none" : "block",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 ml-0 lg:col-6 card p-8 border-1 border-100 ">
          <div className="card border-1 border-100 bg-gray-800 mb-5">
            {/* implementing steps pull transfer*/}
            <Steps
              model={items}
              activeIndex={activeIndex}
              onSelect={(e) => setActiveOne(e.index)}
              readOnly={false}
              style={{ fontSize: "1.4rem" }}
              className="p-5 m-3 text-2xl"
            />
          </div>

          <div className="mt-5">
            {
              //display the steps pages Select Asset, Select Participant, Enter Amount, Confirm Request
              pageDisplayOne()
            }
          </div>

          <div>
            <div className="flex align-items-center justify-content-between mt-5">
              <div className="w-6rem h-5rem text-white font-bold flex align-items-center justify-content-center   mr-3">
                <Button
                  disabled={activeOne === 0}
                  onClick={() => {
                    setActiveOne((curPage) => curPage - 1);
                  }}
                  label="BACK"
                  style={{
                    display: activeOne === items.length ? "none" : "block",
                  }}
                />
              </div>
              <div className="w-6rem  text-white font-bold flex align-items-center justify-content-center   mr-3">
                <Toast ref={toast} />
                <Button
                  onClick={() => {
                    if (activeOne === items.length) {
                      accept();
                    } else {
                      setActiveOne((curPage) => curPage + 1);
                    }
                  }}
                  label={activeOne === items.length - 1 ? "SUBMIT" : "NEXT"}
                  style={{
                    display: activeOne === items.length ? "none" : "block",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransferCBDCWBO;
