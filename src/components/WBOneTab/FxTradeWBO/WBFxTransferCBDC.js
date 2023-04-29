import React, { useRef, useState, useEffect } from "react";

import { Steps } from "primereact/steps";
import { Button } from "primereact/button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import InformationSubmitted from "../../CBtabmenu/CBHome/CBDCManager/DefCBDCType/InformationSubmitted";

import { IssuanceServiceWBFx } from "./IssuanceServiceWBFx";
import WBOFxSelecAsset from "./WBOFxTransfer/WBOFxSelecAsset";
import WBOFxEnterAmount from "./WBOFxTransfer/WBOFxEnterAmount";
import WBOFxSelectExRate from "./WBOFxTransfer/WBOFxSelectExRate";
import WBOFxConfirmTransfer from "./WBOFxTransfer/WBOFxConfirmTransfer";
import WBOFxSelecFromAcc from "./WBOFxTransfer/WBOFxSelecFromAcc";
import WBOFxSelecToAcc from "./WBOFxTransfer/WBOFxSelecToAcc";
import { Satspertoken } from "../../App/Satspertoken";

const WBOFxTransferCBDC = () => {
  //curent page for  steps is set to default index 0
  const [activeIndex, setActiveIndex] = useState(0);
  const [assets, setAssets] = useState([]);
  const [asset, setAsset] = useState({});
  const [subscriberbalance, setSubscriberbalance] = useState([]);
  const [test, setTest] = useState([]);

  //initial state fo user input
  const [data, setData] = useState({
    assetid: "",
    asset: "",
    assetid1: "",
    decimal: 2,
    notary: "",
    amount: 0,
    total: 25000000,
    remaining: 25000000,
    option: "",
    satspertoken: 1,
    access: true,
    select: "",
    accesconrol: "",
    confirm: "",
    transvalue: "",
    maxvalue: 10000000,
    minvalue: "",
    displayvalue: "",
    fromaccount: "",
    toaccount: "",
  });
  const [data1, setData1] = useState({
    assetid: "",
    asset: "",
    assetid1: "",
    decimal: 2,
    notary: "",
    amount: 0,
    satspertoken: 1,
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
    fromaccount: "",
    toaccount: "",
  });

  const issuanceservice = new IssuanceServiceWBFx();
  const satspertoken = new Satspertoken();

  useEffect(() => {
    issuanceservice.getallentityassets().then((data) => {
      var xx = data.map(function (value) {
        return {
          label: value.issuetype,
          id: value.id,
          entityid: value.entityid,
          issueaccountnumber: value.issueaccountnumber,
          assetid: value.assetid,
          issuetype: value.issuetype,
          satspertoken: value.satspertoken,
          amount: value.amount,
        };
      });

      setAssets(xx);
    });

    issuanceservice.getsubscribebankbalance().then((data) => {
      var xx = data.balance.map(function (value) {
        return {
          label: value.issuetype,
          issuetype: value.issuetype,
          satspertoken: value.satspertoken,
          amount: satspertoken.wrap(value.satspertoken, value.amount),
        };
      });
      console.log(xx);
      setSubscriberbalance(xx);
      setTest(xx);
      console.log(subscriberbalance);
      console.log(test);
    });
  }, []); //

  useEffect(() => {
    var selectedasset = subscriberbalance.filter(function (val) {
      if (val.label === data.assetid.label) return val;
    });

    if (selectedasset.length > 0) {
      console.log(selectedasset[0]);
      setData({
        ...data,
        maxvalue: satspertoken.wrap(
          selectedasset[0].satspertoken,
          selectedasset[0].amount
        ),
        satspertoken: selectedasset[0].satspertoken,
      });
    }
  }, [asset]); //

  //setting active index tab for steps pages
  const pageDisplay = () => {
    if (activeIndex === 0) {
      return <WBOFxSelecFromAcc data={data} setData={setData} />;
    } else if (activeIndex === 1) {
      return <WBOFxSelecToAcc data={data} setData={setData} />;
    } else if (activeIndex === 2) {
      return (
        <WBOFxSelecAsset
          data={data}
          setData={setData}
          assets={assets}
          setAsset={setAsset}
        />
      );
    } else if (activeIndex === 3) {
      return <WBOFxEnterAmount data={data} setData={setData} />;
    } else if (activeIndex === 4) {
      return <WBOFxConfirmTransfer data={data} setData={setData} />;
    } else if (activeIndex === wizardItems.length) {
      return (
        <InformationSubmitted
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
      );
    }
  };

  const text = data.assetid.label;
  // const subscriber = data.notary.label;
  const myArray = text || text !== undefined ? text.split(",") : "";
  // const wholesale =
  //   subscriber || subscriber !== undefined ? subscriber.split(",") : "";
  // const account = 'CAC-SUB901-0001';
  const issuanceServiceWBFx = new IssuanceServiceWBFx();
  const transferassets = async () => {
    //if (data.fromaccount.label === "Operation Account") {
    var ret = await issuanceServiceWBFx.sendoperationtotrader(
      asset.assetid,
      asset.issuetype,
      data.amount
    );

    if (ret && ret.code == -1) {
      ret = await issuanceServiceWBFx.sendoperationtotrader(
        asset.assetid,
        asset.issuetype,
        data.amount
      );
    }
  };

  const showSuccess = () => {
    toast.success(
      `Successfully transfered ${data.amount} ${myArray[0]} form ${data.fromaccount.label} to ${data.toaccount.label}`,
      {
        // position: "top-right",
        // autoClose: 5000,
        // hideProgressBar: false,
        // closeOnClick: true,
        // pauseOnHover: true,
        // draggable: true,
        // progress: undefined,
        // theme: "colored",
        // theme: "dark",
      }
    );
  };

  const clickHandler = () => {
    showSuccess();
    setActiveIndex(wizardItems.length);
    transferassets();
    setData(data1);
  };

  const wizardItems = [
    { label: "From Account" },
    { label: "To Account" },
    { label: "Select Asset" },
    {
      label: "Enter Amount",
    },
    {
      label: "Confirm Transfer",
    },
  ];
  return (
    <div className="col-12 ">
      <div className="card border-1 border-100 bg-gray-800 card-w-title">
        {/* implementing steps */}

        <Steps
          model={wizardItems}
          activeIndex={activeIndex}
          onSelect={(e) => setActiveIndex(e.index)}
          readOnly={false}
          style={{ fontSize: "1.4rem" }}
          className="p-5 m-3 text-2xl"
        />
      </div>
      <div className="card justify-content-center align-items-center pb-6">
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
            <ToastContainer
              // position="top-right"
              // autoClose={5000}
              // hideProgressBar={false}
              // newestOnTop={false}
              // closeOnClick
              // rtl={false}
              // pauseOnFocusLoss
              // draggable
              // pauseOnHover
              // theme="colored"
              className="text-2xl"
              style={{ width: "70rem" }}
            />
            <Button
              onClick={() => {
                if (activeIndex === wizardItems.length) {
                  <InformationSubmitted
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                  />;
                } else if (activeIndex === wizardItems.length - 1) {
                  clickHandler();
                } else {
                  setActiveIndex((curPage) => curPage + 1);
                }
              }}
              label={activeIndex === wizardItems.length - 1 ? "SEND" : "NEXT"}
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

export default WBOFxTransferCBDC;
