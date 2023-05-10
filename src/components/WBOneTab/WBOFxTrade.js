import React, { useState } from "react";

import { TabMenu } from "primereact/tabmenu";

import WBOFxTransferCBDC from "./FxTradeWBO/WBFxTransferCBDC";
import WBFxRequestDVP from "./FxTradeWBO/WBFxRequestDVP";
import WBFxTraderAssets from "./FxTradeWBO/WBFxTraderAssets";
import WBFxCbdcStates from "./FxTradeWBO/WBFxCbdcStates";
import WBOpCbdcStates from "./FxTradeWBO/WBOpCbdcStates";
import WBFxMAC from "./FxTradeWBO/WBFxMAC";
import WBFxOperationAssets from "./FxTradeWBO/WBFxOperationAssets";

const WBOFxTrade = ({ data, setData }) => {
  const [activeone, setActiveone] = useState(0);
  const [activetwo, setActivetwo] = useState(0);
  const [activethree, setActivethree] = useState(0);
  const [assets, setAssets] = useState([]);
  const [transacted, setTransacted] = useState({
    operation: false,
    trader: false,
  });

  // Center operate
  const DisplayOne = () => {
    if (activeone === 0) {
      return (
        <WBOFxTransferCBDC
          transacted={transacted}
          setTransacted={setTransacted}
        />
      );
    } else if (activeone === 1) {
      return <WBFxRequestDVP data={data} setData={setData} />;
    }
  };

  // Right side display
  const DisplayTwo = () => {
    if (activetwo === 0) {
      return (
        <WBFxOperationAssets
          assets={assets}
          transacted={transacted}
          setTransacted={setTransacted}
        />
      );
    } else if (activetwo === 1) {
      return (
        <WBFxTraderAssets
          assets={assets}
          transacted={transacted}
          setTransacted={setTransacted}
        />
      );
    }
  };

  // Transactions
  const DisplayThree = () => {
    if (activethree === 0) {
      return <WBFxCbdcStates data={data} setData={setData} />;
    } else if (activethree === 1) {
      return <WBOpCbdcStates data={data} setData={setData} />;
    }
  };

  const wizardItems = [
    {
      label: "TRANSFER ASSETS",
      icon: "pi pi-fw text-yellow-500 pi-arrow-right-arrow-left",
    },
  ];

  const dataItems = [
    {
      label: "OPERATION ASSETS",
      icon: "pi pi-fw text-yellow-500 pi-box",
    },
    {
      label: "TRADER ASSETS",
      icon: "pi pi-fw text-yellow-500 pi-wallet",
    },
  ];

  const dataStates = [
    {
      label: "Operation transactions",
      icon: "pi text-2xl pi-fw pi-sort-alt",
    },
    {
      label: "Trader transactions",
      icon: "pi text-2xl pi-fw pi-user",
    },
  ];

  return (
    <>
      <div className="grid p-fluid p-5">
        <div className="row-12  col-6 md:col-6 p-5">
          <div className="  card card-w-title border-1 border-100 h-full  ">
            <TabMenu
              model={wizardItems}
              activeIndex={activeone}
              onTabChange={(e) => setActiveone(e.index)}
              style={{ fontSize: "1.2rem" }}
            />
            {DisplayOne()}
          </div>
        </div>
        <div className="row-12  col-12 md:col-6 p-5">
          <div className=" card card-w-title border-1 border-100 ">
            <TabMenu
              model={dataItems}
              activeIndex={activetwo}
              onTabChange={(e) => setActivetwo(e.index)}
              style={{ fontSize: "1.2rem" }}
            />
            {DisplayTwo()}
          </div>
        </div>
      </div>
      <div className="row-12  col-12  p-6">
        <div className="card card-w-title border-1 border-100 ">
          <TabMenu
            model={dataStates}
            id={dataStates.id}
            activeIndex={activethree}
            onTabChange={(e) => setActivethree(e.index)}
            style={{ fontSize: "1.2rem" }}
          />

          {DisplayThree()}
        </div>
      </div>
    </>
  );
};

export default WBOFxTrade;
