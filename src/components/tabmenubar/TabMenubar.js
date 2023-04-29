import React, { useState } from "react";
import { TabMenu } from "primereact/tabmenu";
import { Route, useHistory } from "react-router-dom";
import Hero from "../hero/Hero";
import Buttons from "../buttons/Buttons";

const TabMenubar = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const history = useHistory();

          //<Route path={"/build"} component={Buttons} />
  const wizardItems = [
    {
      label: "CURRENT USER",
      icon: "pi pi-fw text-2xl pi-user",
      command: () => history.push("/"),
    },
    {
      label: "BUILD",
      icon: "pi pi-fw text-2xl pi-pencil",
      // command: () => history.push("/build"),
    },
  ];

  return (
    <div className="card grid grid-nogutter p-fluid pt-8">
      <div className="col-12 ">
        <div className="card card-w-title ">
          <TabMenu
            model={wizardItems}
            activeIndex={activeIndex}
            onTabChange={(e) => setActiveIndex(e.index)}
            style={{ fontSize: "1.4rem" }}
          />
          <Route exact path={"/"} component={Hero} />
        </div>
      </div>
    </div>
  );
};

export default TabMenubar;
