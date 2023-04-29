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
import Autoconfigure from "../../components/login/Autoconfigure";
import Autoconfigurewb from "../../components/wblogin/Autoconfigurewb";
import Createassets from "../../components/login/Createassets";
import Transmitassets from "../../components/login/Transmitassets";
import TabMenubar from "../../components/tabmenubar/TabMenubar";
import Hero from "../../components/hero/Hero";
import { NavLink } from "react-router-dom";

//      <Hero />

const Admin = () => {
  const [activeone, setActiveone] = useState(0);
  const [activetwo, setActivetwo] = useState(0);

  const wizardItems = [
    {
      label: "AUTO CONFIGURE ",
      // icon: "pi text-3xl pi-fw pi-sort-amount-up-alt",
    },

    {
      label: "CONFIGURE ",
      // icon: "pi text-3xl pi-fw pi-sort-amount-up-alt",
    },
    {
      label: "CREATE ASSETS ",
      // icon: "pi text-3xl pi-fw pi-sort-amount-up-alt",
    },
    {
      label: "TRANSMIT ASSETS",
      // icon: "pi text-3xl pi-fw pi-sort-amount-up-alt",
    },
  ];

  const wizardItems2 = [
    {
      label: "AUTO CONFIGURE ",
      // icon: "pi text-3xl pi-fw pi-sort-amount-up-alt",
    },

    {
      label: "CONFIGURE ",
      // icon: "pi text-3xl pi-fw pi-sort-amount-up-alt",
    },
  ];

  const ToggleOne = () => {
    if (activeone === 0) {
      return <Autoconfigure />;
    }
    if (activeone === 1) {
      return <Centralbanksetup />;
    }
    if (activeone === 2) {
      return <Createassets />;
    }
    if (activeone === 3) {
      return <Transmitassets />;
      //return <Createassets />
    }
  };

  const ToggleTwo = () => {
    if (activetwo === 0) {
      return <Autoconfigurewb />;
      //  return <Wbconfigure />
    }
    if (activetwo === 1) {
      //  return <Autoconfigurewb />
      return <Wbconfigure />;
    }
  };

  return (
    <>
      <div>
        <NavLink to="/">
          <img
            className="h-8rem w-full"
            src={"images/intrasettle_White.svg"}
            alt="logo"
          />
        </NavLink>
      </div>

      <div className="grid p-fluid p-5">
        <div className="row-12  col-6 md:col-6 p-5">
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
        <div className="row-12  col-12 md:col-6 p-5">
          <div className="card card-w-title border-1 border-100 ">
            <TabMenu
              model={wizardItems2}
              activeIndex={activetwo}
              onTabChange={(e) => setActivetwo(e.index)}
              id={wizardItems2.id}
              style={{ fontSize: "1.2rem" }}
              className="text-xl"
            />

            {ToggleTwo()}
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
