import React, { useState } from "react";

import { AppTopbar } from "../../components/Header/AppTopbar";
import { TabMenu } from "primereact/tabmenu";

import "primereact/resources/primereact.css";
import "primeicons/primeicons.css";
import "../../../src/assets/layout/layout.scss";
// import Login from "../../components/login/Login";
// import Wblogin from "../../components/wblogin/Wblogin";
import Wbconfigure from "../../components/wblogin/Wbconfigure";
import Centralbanksetup from "../../components/login/Centralbanksetup";
import Admincentral from "./Admincentral";
import Adminwholesale from "./Adminwholesale";
import TabMenubar from "../../components/tabmenubar/TabMenubar";
import Hero from "../../components/hero/Hero";
import { NavLink } from "react-router-dom";

//      <Hero />

const Admin = () => {
  const [activeone, setActiveone] = useState(0);
  const [activetwo, setActivetwo] = useState(0);

  const wizardItems = [
    {
      label: "CONFIGURE CENTRALBANK ",
      // icon: "pi text-3xl pi-fw pi-sort-amount-up-alt",
    },

    {
      label: "CONFIGURE WHOLESALEBANK ",
      // icon: "pi text-3xl pi-fw pi-sort-amount-up-alt",
    },
  ];

  const ToggleOne = () => {
    if (activeone === 0) {
      return <Admincentral />;
    }
    if (activeone === 1) {
      return <Adminwholesale />;
    }
  };

  return (
    <>
      <div className="grid p-fluid p-12">
        <div className="row-12  col-8 md:col-8 p-5">
          <div className="card card-w-title border-1 border-100 h-full">
            <TabMenu
              model={wizardItems}
              activeIndex={activeone}
              onTabChange={(e) => setActiveone(e.index)}
              id={wizardItems.id}
              style={{ fontSize: "1.2rem" }}
              className="text-xl"
            />

            {ToggleOne()}
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
