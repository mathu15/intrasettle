import { TabMenu } from "primereact/tabmenu";
import React, { useState } from "react";
import { Route, useHistory } from "react-router-dom";

import IssueRequestCB from "./CBHome/CBIncomingRequest/IssueRequestCB";
import MARequestCB from "./CBHome/CBIncomingRequest/MARequestCB";
import RedemptionRequest from "./CBHome/CBIncomingRequest/RedemptionRequest";

const CBIncomingRequest = () => {
  const [activeIndex, setActiveIndex] = useState();

  const history = useHistory();
  const wizardItems = [
    {
      label: "CBDC ISSUANCE",
      icon: "pi text-xl pi-fw pi-dollar",
      command: () => history.push("/central-bank/incoming-requests"),
    },
    {
      label: "REDEMPTION REQUESTS",
      icon: "pi text-xl pi-fw pi-refresh",
      command: () =>
        history.push("/central-bank/incoming-requests/redemption-request"),
    },
    {
      label: "MEMBER ACCESS REQUEST",
      icon: "pi text-xl pi-fw pi-user",
      command: () =>
        history.push("/central-bank/incoming-requests/member-access-request"),
    },
  ];

  return (
    <div className="card ">
      <h5 className="text-5xl p-5">Incoming Requests</h5>
      <TabMenu
        model={wizardItems}
        activeIndex={activeIndex}
        onTabChange={(e) => setActiveIndex(e.index)}
        readOnly={false}
        style={{ fontSize: "1.3rem" }}
      />
      <Route
        exact
        path={"/central-bank/incoming-requests"}
        component={IssueRequestCB}
      />
      <Route
        path={"/central-bank/incoming-requests/redemption-request"}
        component={RedemptionRequest}
      />
      <Route
        path={"/central-bank/incoming-requests/member-access-request"}
        component={MARequestCB}
      />
    </div>
  );
};

export default CBIncomingRequest;
