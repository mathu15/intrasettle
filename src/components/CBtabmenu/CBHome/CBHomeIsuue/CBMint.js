import React, { useEffect, useState } from "react";
import { IssuanceService } from "../IssuanceService";

import SelectPaticipant from "./CBMint/SelectPaticipant";
import SelectAsset from "./CBMint/SelectAsset";
import EnterAmount from "./CBMint/EnterAmount";
import ConfirmIssuance from "./CBMint/ConfirmIssuance";
import { Steps } from "primereact/steps";
import { Button } from "primereact/button";
import { Satspertoken } from "../../../App/Satspertoken";

import InformationSubmitted from "../CBDCManager/DefCBDCType/InformationSubmitted";
import * as _ from "lodash";

/*
function satisfy( assets, symbol, balance) {
        console.log(assets);
        var pp = assets.filter(xx=>{
          if(xx.issuetype == symbol) return true;
        });
       console.log(pp);
       console.log(symbol);
	if(pp[0] && Number.isInteger(pp[0].satspertoken)) {
          return wrap(pp[0].satspertoken, balance);
        } else {
          return wrap(1, balance);
        }
}
function wrap( sat, thenumber){
          if(sat == 100) return (thenumber/sat).toFixed(2);
          if(sat == 10) return (thenumber/sat).toFixed(1);
          if(sat == 1) return (thenumber/sat).toFixed(0);
}
*/
const CBMint = () => {
  //curent page for  steps is set to default index 0
  const [activeIndex, setActiveIndex] = useState(0);
  const satspertoken = new Satspertoken();
  //initial state fo user input
  const [data, setData] = useState({
    asset: "",
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
  });

  const [tokenuser, setTokenuser] = useState(false);
  const [updateasset, setUpdateasset] = useState("");
  const [assets, setAssets] = useState([]);
  const [entitybalance, setEntitybalance] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [centralaccount, setCentralaccount] = useState({});
  const [entityaccount, setEntityaccount] = useState({});
  const [user, setUser] = useState({});

  const issuanceService = new IssuanceService();

  useEffect(() => {
    issuanceService.getentityaccount().then((data) => {
      setEntityaccount(data);
    });

    setUser(issuanceService.getuser());

    issuanceService.getcentralaccount().then((data) => {
      setCentralaccount(data);
    });

    issuanceService.getassets().then((data) => {
      var xx = data.map(function (value) {
        return {
          label: value.issuetype,
          id: value.id,
          entityid: value.entityid,
          issueaccountnumber: value.issueaccountnumber,
          assetid: value.assetid,
          satspertoken: value.satspertoken,
          amount: value.amount,
        };
      });

      setAssets(xx);
    });

    issuanceService.getentitybalance().then((data) => {
      var xx = data.balance.map(function (value) {
        return {
          label: value.issuetype,
          issuetype: value.issuetype,
          satspertoken: value.satspertoken,
          amount: satspertoken.wrap(value.satspertoken, value.amount),
        };
      });

      setEntitybalance(xx);
    });

    issuanceService.getsubscribers().then((data) => {
      var subscribers = data[0].subscribers;
      var xx = subscribers.map(function (value) {
        return {
          label: value.subscribername,
          id: value.id,
          entityid: value.entityid,
        };
      });
      setSubscribers(xx);
    });
  }, []); //

  useEffect(() => {
    var selectedasset = entitybalance.filter(function (val) {
      if (val.label === data.asset.label) return val;
    });

    if (selectedasset.length > 0) {
      console.log(selectedasset[0]);
      setData({
        ...data,
        maxvalue: selectedasset[0].amount,
        satspertoken: selectedasset[0].satspertoken,
      });
    }
  }, [updateasset]); //

  const mintasset = async () => {
    console.log("minting");
    var selectedasset = assets.filter(function (val) {
      if (val.label === data.asset.label) return val;
    });

    if (selectedasset.length > 0) {
      console.log(selectedasset[0]);

      // This should send from entity account to ledger account
      var ret = issuanceService.mintasset(
        selectedasset[0],
        user.entityaccountnumber,
        user.centralaccountnumber,
        data.amount
      );

      if (_.has(ret, "error")) {
        alert("Request failed ");
      }

      if (_.has(ret, "transactionid")) {
        alert("Request success");
      }
    }
  };

  // const url =
  // datas.id? "https://thebsv.tech/centralbank/getassets/" + datas.id:
  // "https://thebsv.tech/centralbank/createcentralasset";
  //     "https://thebsv.tech/centralbank/makeassetavailableincentralbank";
  //   fetch(url, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json; charset-UTF-8",
  //     },
  //     body: JSON.stringify(datas),
  //   })
  //     .then((response) => response.json())
  //     .then((response) => {
  //       console.log(response);
  //       alert("success");
  //       setDatas(response);
  //     })

  //     .catch((e) => {
  //       console.log("e", e);
  //     });
  // };
  // console.log(datas);

  //setting active index tab for steps pages
  const pageDisplay = () => {
    if (activeIndex === 0) {
      return (
        <SelectAsset
          data={data}
          setData={setData}
          entitybalance={entitybalance}
          setUpdateasset={setUpdateasset}
        />
      );
      // } else if (activeIndex === 1) {
      //   return <SelectPaticipant data={data} setData={setData} />;
    } else if (activeIndex === 1) {
      return <EnterAmount data={data} setData={setData} />;
    } else if (activeIndex === 2) {
      return <ConfirmIssuance data={data} setData={setData} />;
    } else if (activeIndex === wizardItems.length) {
      return (
        <InformationSubmitted
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
      );
    }
  };

  const wizardItems = [
    { label: "Select Asset" },
    // {
    //   label: "Select Participant",
    // },
    {
      label: "Enter Amount",
    },
    {
      label: "Confirm Minting",
    },
  ];
  return (
    <div className="col-12  ">
      <div className="card border-1 border-300 bg-gray-800 card-w-title">
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
          //display the steps pages SelectAsset, SelectPaticipant, EnterAmount, ConfirmIssuance
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
            <Button
              onClick={() => {
                if (activeIndex === wizardItems.length - 1) {
                  mintasset();
                }

                if (activeIndex === wizardItems.length) {
                } else {
                  setActiveIndex((curPage) => curPage + 1);
                }
              }}
              label={activeIndex === wizardItems.length - 1 ? "MINT" : "NEXT"}
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

export default CBMint;
