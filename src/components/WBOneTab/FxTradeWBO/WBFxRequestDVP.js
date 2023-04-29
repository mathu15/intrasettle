import React, { useEffect, useRef, useState } from "react";

import { Steps } from "primereact/steps";
import { Button } from "primereact/button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import InformationSubmitted from "../../CBtabmenu/CBHome/CBDCManager/DefCBDCType/InformationSubmitted";

import { IssuanceServiceWBFx } from "./IssuanceServiceWBFx";

import WBOFxReqSelecAsset from "./WBOFxRequest/WBOFxReqSelecAsset";
import WBOFxReqEnterAmount from "./WBOFxRequest/WBOFxReqEnterAmount";
import WBOFxReqSelectExRate from "./WBOFxRequest/WBOFxReqSelectExRate";
import WBOFxReqConfirmTransfer from "./WBOFxRequest/WBOFxReqConfirmTransfer";
import WBOFxSelectParticipant from "./WBOFxRequest/WBOFxReqSelectParticipant";
const WBFxRequestDVP = () => {
  //curent page for  steps is set to default index 0
  const [activeIndex, setActiveIndex] = useState(0);
	const issuanceservice = new IssuanceServiceWBFx();


  //initial state fo user input
  const [data, setData] = useState({
    assetid: "",
    assetid1: "",
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
    rate: 1,
  });
  const [data1, setData1] = useState({
    assetid: "",
    assetid1: "",
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
    rate: 1,
  });

  const [giveassets, setGiveassets] = useState([]);
  const [getassets, setGetassets] = useState([]);
  const [entityaccounts, setEntityaccounts] = useState([]);

    useEffect(() => {

      issuanceservice.getassets().then(data => {

            var xx = data.map(function (value) {
                  return { label: value.issuetype ,
                         id: value.id, entityid: value.entityid,
                         issueaccountnumber : value.issueaccountnumber,
                         assetid : value.assetid,
                         issuetype : value.issuetype,
                         amount : value.amount
                         };
            });

            setGiveassets(xx)
            setGetassets(xx)

          });
	
	  issuanceservice.getentityaccounts().then(async (data)  => {

            var subscribers = data.centralaccounts;
            var xx = subscribers.map(function (value) {
                  return { label: value.accountnumber,
                        id : value.id,
                        accountholder : value.accountholder,
                        accountnumber : value.accountnumber,
                         };
            });

        var thesubaccount = await issuanceservice.getsubscriberaccount();

     var allowedlist = xx.filter(function (val) {
       if(val.accountnumber != thesubaccount.accountnumber  ) return val;
     });

            setEntityaccounts(allowedlist);


          });



   }, []); //
 
  //setting active index tab for steps pages
  const pageDisplay = () => {
    if (activeIndex === 0) {
      return <WBOFxReqSelecAsset data={data} setData={setData} giveassets={giveassets} getassets={getassets} />;
    } else if (activeIndex === 1) {
      return <WBOFxSelectParticipant data={data} setData={setData}  entityaccounts={entityaccounts} />;
    } else if (activeIndex === 2) {
      return <WBOFxReqEnterAmount data={data} setData={setData} />;
    } else if (activeIndex === 3) {
      return <WBOFxReqSelectExRate data={data} setData={setData} />;
    } else if (activeIndex === 4) {
      return <WBOFxReqConfirmTransfer data={data} setData={setData} />;
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
  const subscriber = data.notary.label;
  const myArray = text || text !== undefined ? text.split(",") : "";
  const wholesale =
    subscriber || subscriber !== undefined ? subscriber.split(",") : "";
  const text1 = data.assetid1.label;
  const myArray1 = text1 || text1 !== undefined ? text1.split(",") : "";
  // const account = 'CAC-SUB901-0001';
  const issuanceServiceWBFx = new IssuanceServiceWBFx();
  const sendsubscribertosubscriber = async () => {
    issuanceServiceWBFx.sendsubscribertosubscriber(
      myArray[1],
      myArray[0],
      wholesale[1],
      data.amount * data.rate[`${myArray1[2]}`]
      // account
    );
  };

  const showSuccess = () => {
    toast.success("created successfully", {
      // position: "top-right",
      // autoClose: 5000,
      // hideProgressBar: false,
      // closeOnClick: true,
      // pauseOnHover: true,
      // draggable: true,
      // progress: undefined,
      // theme: "colored",
      // theme: "dark",
    });
  };

  const clickHandler = () => {
    showSuccess();
    setActiveIndex(wizardItems.length);
    sendsubscribertosubscriber();
    setData(data1);
  };

  const wizardItems = [
    { label: "Select Asset" },
    { label: "Select participant" },
    {
      label: "Enter Amount",
    },
    {
      label: "ExRate",
    },
    {
      label: "Confirm Request",
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

export default WBFxRequestDVP;
