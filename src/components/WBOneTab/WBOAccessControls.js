import { TabMenu } from "primereact/tabmenu";
import React, { useState } from "react";
import { Route, useHistory } from "react-router-dom";
import WBOACList from "./WBOAccessControl/WBOACList";
import WBOACReqAccess from "./WBOAccessControl/WBOACReqAccess";

const WBOAccessControl = () => {
  const [activeIndex, setActiveIndex] = useState();
  const history = useHistory();
  const wizardItems = [
    {
      label: "LIST",
      icon: "pi pi-fw pi-check",
      command: () => history.push("/wholesale-bank-one/access-controls"),
    },
    {
      label: "REQUEST ACESS",
      icon: "pi pi-fw pi-user",
      command: () =>
        history.push("/wholesale-bank-one/access-controls/request-access"),
    },
  ];

  return (
    <div className="card ">
      <h5 className="text-3xl p-4">Member Controls</h5>
      <TabMenu
        model={wizardItems}
        activeIndex={activeIndex}
        onTabChange={(e) => setActiveIndex(e.index)}
        readOnly={false}
        style={{ fontSize: "1.2rem" }}
      />
      <Route
        exact
        path={"/wholesale-bank-one/access-controls"}
        component={WBOACList}
      />
      <Route
        path={"/wholesale-bank-one/access-controls/request-access"}
        component={WBOACReqAccess}
      />
    </div>
  );
};

export default WBOAccessControl;
