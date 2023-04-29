import { TabMenu } from "primereact/tabmenu";
import React, { useState } from "react";
import { Route, useHistory } from "react-router-dom";

import AvailableCBDCWBO from "./WBOCbdcManager/AvailableCBDCWBO";
import RequestCBDCWBO from "./WBOCbdcManager/RequestCBDCWBO";
import RequestCrossSwapWBO from "./WBOCbdcManager/RequestCrossSwapWBO";
import TransferCBDCWBO from "./WBOCbdcManager/TransferCBDCWBO";

const WBOCbdcManager = () => {
  const [activeIndex, setActiveIndex] = useState();
  const history = useHistory();
  const wizardItems = [
    {
      label: "AVAILABLE CBDC",
      icon: "pi pi-fw pi-th-large",
      command: () => history.push("/wholesale-bank-one/cbdc-manager"),
    },
    {
      label: "REQUEST CBDC",
      icon: "pi pi-fw pi-dollar",
      command: () => history.push("/wholesale-bank-one/cbdc-manager/cbdc-type"),
    },
    {
      label: "TRANSFER CBDC",
      icon: "pi pi-fw pi-arrow-right-arrow-left",
      command: () =>
        history.push("/wholesale-bank-one/cbdc-manager/transfer-cbdc"),
    },
    {
      label: "REDEEM CBDC",
      icon: "pi pi-fw pi-sync",
      // command: () =>
      // history.push("/wholesale-bank-one/cbdc-manager/issue-cbdc"),
    },
    {
      label: "REQUEST DVP",
      icon: "pi pi-fw pi-sort-amount-up-alt",
      // command: () =>
      // history.push("/wholesale-bank-one/cbdc-manager/issue-cbdc"),
    },
    {
      label: "REQUEST CROSS CHAIN SWAP",
      icon: "pi pi-fw pi-times",
      command: () =>
        history.push("/wholesale-bank-one/cbdc-manager/cross-chain-swap"),
    },
  ];

  return (
    <div className="card">
      <h5 className="text-5xl p-4">CBDC Manager</h5>
      <TabMenu
        model={wizardItems}
        activeIndex={activeIndex}
        onTabChange={(e) => setActiveIndex(e.index)}
        readOnly={false}
        style={{ fontSize: "1.2rem" }}
      />
      <Route
        exact
        path={"/wholesale-bank-one/cbdc-manager"}
        component={AvailableCBDCWBO}
      />
      <Route
        path={"/wholesale-bank-one/cbdc-manager/cbdc-type"}
        component={RequestCBDCWBO}
      />
      <Route
        path={"/wholesale-bank-one/cbdc-manager/transfer-cbdc"}
        component={TransferCBDCWBO}
      />
      {/* <Route
        path={"/wholesale-bank-one/cbdc-manager/issue-cbdc"}
        component={IssueCBDCs}
      /> */}
      {/* <Route
        path={"/wholesale-bank-one/cbdc-manager/issue-cbdc"}
        component={IssueCBDCs}
      /> */}
      <Route
        path={"/wholesale-bank-one/cbdc-manager/cross-chain-swap"}
        component={RequestCrossSwapWBO}
      />
    </div>
  );
};

export default WBOCbdcManager;
