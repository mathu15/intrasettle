import { TabMenu } from "primereact/tabmenu";
import React, { useState } from "react";
import { Route, useHistory } from "react-router-dom";

import AvailableCBDC from "./CBHome/CBDCManager/AvailableCBDC";
import DefCBDCType from "./CBHome/CBDCManager/DefCBDCType";
import MintedCBDC from "./CBHome/CBDCManager/MintedCBDC";

const CbdcManager = () => {
  const [activeIndex, setActiveIndex] = useState();
  const history = useHistory();
  const wizardItems = [
    {
      label: "DEFINE CBDC TYPE",
      icon: "pi pi-fw text-2xl pi-th-large",
      command: () => history.push("/central-bank/cbdc-manager"),
    },
    {
      label: "DEFINED CBDC",
      icon: "pi pi-fw text-2xl pi-ticket",
      command: () => history.push("/central-bank/cbdc-manager/defined-cbdc"),
    },
    {
      label: "ISSUE CBDC",
      icon: "pi pi-fw text-2xl pi-dollar",
      command: () => history.push("/central-bank/cbdc-manager/minted-cbdc"),
    },
  ];

  return (
    <div>
      <div className="card  ">
        <h5 className="text-5xl p-4">Entity CBDC Manager</h5>
        <TabMenu
          model={wizardItems}
          activeIndex={activeIndex}
          onTabChange={(e) => setActiveIndex(e.index)}
          readOnly={false}
          style={{ fontSize: "1.2rem" }}
        />

        <div className="card bg-gray-900">
          <Route
            exact
            path={"/central-bank/cbdc-manager"}
            component={DefCBDCType}
          />
          <Route
            path={"/central-bank/cbdc-manager/defined-cbdc"}
            component={AvailableCBDC}
          />
          <Route
            path={"/central-bank/cbdc-manager/minted-cbdc"}
            component={MintedCBDC}
          />
        </div>
      </div>
    </div>
  );
};

export default CbdcManager;
