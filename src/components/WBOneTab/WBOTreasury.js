import { TabMenu } from "primereact/tabmenu";
import React, { useState } from "react";
import { Route, useHistory } from "react-router-dom";

import WBOTreaCBDCAssets from "./WBOTreasury/WBOTreaCBDCAssets";
import WBOTreasureBonds from "./WBOTreasury/WBOTreasureBonds";
import WTreauryBOT from "./WBOTreasury/WTreauryBOT";

const WBOTreasury = () => {
  const [activeIndex, setActiveIndex] = useState();
  const history = useHistory();
  const wizardItems = [
    {
      label: "CBDC ASSETS",
      icon: "pi text-xl pi-fw pi-dollar",
      command: () => history.push("/wholesale-bank-one/treasury-dashboard"),
    },
    {
      label: "BALANCE OVER TIME",
      icon: "pi text-xl pi-fw pi-calendar",
      command: () =>
        history.push(
          "/wholesale-bank-one/treasury-dashboard/balance-over-time"
        ),
    },
    {
      label: "BONDS",
      icon: "pi text-xl pi-fw pi-dollar",
      command: () =>
        history.push("/wholesale-bank-one/treasury-dashboard/bonds"),
    },
  ];

  return (
    <div className="card ">
      <h5 className="text-3xl p-4">Treasury Board</h5>
      <TabMenu
        model={wizardItems}
        activeIndex={activeIndex}
        onTabChange={(e) => setActiveIndex(e.index)}
        readOnly={false}
        style={{ fontSize: "1.2rem" }}
      />
      <Route
        exact
        path={"/wholesale-bank-one/treasury-dashboard"}
        component={WBOTreaCBDCAssets}
      />
      <Route
        path={"/wholesale-bank-one/treasury-dashboard/balance-over-time"}
        component={WTreauryBOT}
      />
      <Route
        path={"/wholesale-bank-one/treasury-dashboard/bonds"}
        component={WBOTreasureBonds}
      />
    </div>
  );
};

export default WBOTreasury;
