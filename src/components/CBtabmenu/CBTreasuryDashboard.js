import { TabMenu } from "primereact/tabmenu";
import React, { useState } from "react";
import { Route, useHistory } from "react-router-dom";

import CBTDBonds from "./CBHome/CBTreasuryDashboard/CBTDBonds";
import CBTDcbdcassets from "./CBHome/CBTreasuryDashboard/CBTDcbdcassets";
import CBTDMoneySupply from "./CBHome/CBTreasuryDashboard/CBTDMoneySupply";

const CBTreasuryDashboard = () => {
  const [activeIndex, setActiveIndex] = useState();
  const history = useHistory();
  const wizardItems = [
    {
      label: "BONDS",
      icon: "pi text-xl pi-fw pi-check",
      command: () => history.push("/central-bank/treasury-dashboard"),
    },
    {
      label: "CBDC ASSETS",
      icon: "pi text-xl pi-fw pi-user",
      command: () =>
        history.push("/central-bank/treasury-dashboard/cbdc-assets"),
    },
    {
      label: "MONEY SUPPLY",
      icon: "pi text-xl pi-fw pi-user",
      command: () =>
        history.push("/central-bank/treasury-dashboard/money-supply"),
    },
  ];

  return (
    <div className="card ">
      <h5 className="text-3xl p-5">Member Controls</h5>
      <TabMenu
        model={wizardItems}
        activeIndex={activeIndex}
        onTabChange={(e) => setActiveIndex(e.index)}
        readOnly={false}
        style={{ fontSize: "1.3rem" }}
      />
      <Route
        exact
        path={"/central-bank/treasury-dashboard"}
        component={CBTDBonds}
      />
      <Route
        path={"/central-bank/treasury-dashboard/cbdc-assets"}
        component={CBTDcbdcassets}
      />
      <Route
        path={"/central-bank/treasury-dashboard/money-supply"}
        component={CBTDMoneySupply}
      />
    </div>
  );
};

export default CBTreasuryDashboard;
