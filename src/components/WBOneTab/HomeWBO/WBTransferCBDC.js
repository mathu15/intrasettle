import React, { useRef, useEffect, useState } from "react";

import { WB01IssuanceService } from "./WB01IssuanceService";

import { Steps } from "primereact/steps";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

import InformationSubmitted from "../../CBtabmenu/CBHome/CBDCManager/DefCBDCType/InformationSubmitted";
import WBOTSelectAsset from "./WBOTransfer/WBOTSelecAsset";
import WBOTSelectParticipant from "./WBOTransfer/WBOTSelectParticipant";
import WBOTEnterAmount from "./WBOTransfer/WBOTEnterAmount";
import WBOTConfirmTransfer from "./WBOTransfer/WBOTConfirmTransfer";
import { Satspertoken } from "../../App/Satspertoken";
import * as _ from "lodash";

function getsubname(accountowners, accountnumber) {
  //
  // it should return doc for valid account numbers
  return accountowners.filter((xx) => {
    if (
      !(xx.entityaccountnumber == accountnumber) &&
      (xx.subcentralaccountnumber == accountnumber ||
        xx.centralaccountnumber == accountnumber)
    )
      return true;
  });
}

const WBOTransferCBDC = ({
  data1,
  setData1,
  accountowners,
  setTransactionhappened,
}) => {
  //curent page for  steps is set to default index 0
  const [activeIndex, setActiveIndex] = useState(0);
  const toast = useRef(null);
  //initial state fo user input
  const [data, setData] = useState({
    asset: "",
    decimal: 2,
    notary: "",
    participant: "",
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
  const [participant, setParticipant] = useState("");
  const [assets, setAssets] = useState([]);
  const [centralbalance, setCentralbalance] = useState([]);
  const [subscriberbalance, setSubscriberbalance] = useState([]);
  const [entityaccounts, setEntityaccounts] = useState([]);
  const [foreignentityaccounts, setForeignentityaccounts] = useState([]);
  const [centralaccount, setCentralaccount] = useState({});
  const [subscriberaccount, setSubscriberaccount] = useState({});
  const [user, setUser] = useState({});

  const satspertoken = new Satspertoken();

  const issuanceService = new WB01IssuanceService();

  useEffect(() => {
    setUser(issuanceService.getuser());

    issuanceService.getsubscriberaccount().then((data) => {
      setSubscriberaccount(data);
    });

    issuanceService.getcentralaccount().then((data) => {
      setCentralaccount(data);
    });

    issuanceService.getallentityassets().then((data) => {
      var xx = data.map(function (value) {
        return {
          label: value.issuetype,
          id: value.id,
          entityid: value.entityid,
          issueaccountnumber: value.issueaccountnumber,
          assetid: value.assetid,
          satspertoken: value.satspertoken,
          issuetype: value.issuetype,
          amount: value.amount,
        };
      });

      setAssets(xx);
    });

    issuanceService.getsubscribebankbalance().then((data) => {
      var xx = data.balance.map(function (value) {
        return {
          label: value.issuetype,
          issuetype: value.issuetype,
          satspertoken: value.satspertoken,
          amount: satspertoken.satisfy(assets, value.issuetype, value.amount),
        };
      });

      console.log(xx);
      setSubscriberbalance(xx);
      console.log(subscriberbalance);
    });
  }, []); //

  useEffect(() => {
    issuanceService.getentityaccounts().then(async (data) => {
      console.log(accountowners);

      var subscribers = data.centralaccounts;
      var xx = subscribers.map(function (value) {
        var subname = getsubname(accountowners, value.accountnumber);

        var organization = subname[0] ? subname[0].organization : "";

        return {
          label: value.accountnumber,
          id: value.id,
          organization: organization,
          accountholder: value.accountholder,
          accountnumber: value.accountnumber,
        };
      });

      var thesubaccount = await issuanceService.getsubscriberaccount();
      console.log(xx);

      var allowedlist = xx.filter(function (val) {
        if (
          !(val.accountnumber == thesubaccount.accountnumber) &&
          xx.organization != ""
        )
          return true;
      });

      setEntityaccounts(allowedlist);
    });
  }, [accountowners]); //

  useEffect(() => {
    var selectedasset = subscriberbalance.filter(function (val) {
      if (val.label === data.asset.label) return val;
    });

    if (selectedasset.length > 0) {
      console.log(selectedasset[0]);
      setData({
        ...data,
        maxvalue: satspertoken.satisfy(
          assets,
          selectedasset[0].issuetype,
          selectedasset[0].amount
        ),
        satspertoken: selectedasset[0].satspertoken,
      });
    }
  }, [updateasset]); //

  const sendassetcentral = async () => {
    console.log("sending");
    var selectedasset = assets.filter(function (val) {
      if (val.label === data.asset.label) return val;
    });

    if (selectedasset.length > 0) {
      console.log(selectedasset[0]);

      var selectedparticipant = entityaccounts.filter(function (val) {
        if (val.label === data.participant.label) return val;
      });

      console.log("selectedparticipant");
      console.log(selectedparticipant);
      var ret;

      if (
        selectedparticipant[0] &&
        selectedparticipant[0].accountholder == "central"
      ) {
        ret = await issuanceService.sendsubscribertocentral(
          selectedasset[0],
          subscriberaccount,
          selectedparticipant[0],
          data.amount
        );
        if (ret && ret.code == -1) {
          ret = await issuanceService.sendsubscribertocentral(
            selectedasset[0],
            subscriberaccount,
            selectedparticipant[0],
            data.amount
          );
        }
        setTransactionhappened(true);
      } else {
        ret = await issuanceService.sendsubscribertosubscriber(
          selectedasset[0],
          subscriberaccount,
          selectedparticipant[0],
          data.amount
        );
        if (ret && ret.code == -1) {
          ret = await issuanceService.sendsubscribertosubscriber(
            selectedasset[0],
            subscriberaccount,
            selectedparticipant[0],
            data.amount
          );
        }

        if (_.has(ret, "error")) {
          alert("Request failed ");
        }

        if (_.has(ret, "transactionid")) {
          alert("Request success");
        }

        setTransactionhappened(true);
      }
    }
  };

  //setting active index tab for steps pages
  const pageDisplay = () => {
    if (activeIndex === 0) {
      return (
        <WBOTSelectAsset
          data={data}
          setData={setData}
          subscriberbalance={subscriberbalance}
          setUpdateasset={setUpdateasset}
        />
      );
    } else if (activeIndex === 1) {
      return (
        <WBOTSelectParticipant
          data={data}
          setData={setData}
          entityaccounts={entityaccounts}
          foreignentityaccounts={foreignentityaccounts}
        />
      );
    } else if (activeIndex === 2) {
      return <WBOTEnterAmount data={data} setData={setData} />;
    } else if (activeIndex === 3) {
      return <WBOTConfirmTransfer data={data} setData={setData} />;
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
  return (
    <div className="col-12 ">
      <div className="card card-w-title">
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
                if (activeIndex === wizardItems.length - 1) {
                  sendassetcentral();
                }
                if (activeIndex === wizardItems.length) {
                } else {
                  setActiveIndex((curPage) => curPage + 1);
                }
              }}
              label={
                activeIndex === wizardItems.length - 1 ? "TRANSFER" : "NEXT"
              }
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

export default WBOTransferCBDC;
