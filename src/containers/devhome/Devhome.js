import React , {useState} from "react";

import { AppTopbar } from "../../components/Header/AppTopbar";
import { TabMenu } from "primereact/tabmenu";

import "primereact/resources/primereact.css";
import "primeicons/primeicons.css";
import "../../../src/assets/layout/layout.scss";
import Login from "../../components/devlogin/Login";
import Wblogin from "../../components/devwblogin/Wblogin";
import Wbconfigure from "../../components/devwblogin/Wbconfigure";
import Centralbanksetup from "../../components/devlogin/Centralbanksetup";
import Autoconfigure from "../../components/devlogin/Autoconfigure";
import Autoconfigurewb from "../../components/devwblogin/Autoconfigurewb";
import Createassets from "../../components/devlogin/Createassets";
import Transmitassets from "../../components/devlogin/Transmitassets";
import Createpairname from "../../components/devwblogin/Createpairname";
import TabMenubar from "../../components/tabmenubar/TabMenubar";
import Hero from "../../components/hero/Hero";

//      <Hero />

const Devhome = () => {
 const [activeone, setActiveone] = useState(0);
  const [activetwo, setActivetwo] = useState(0);
	
const wizardItems = [
    {
      label: "Login ",
      icon: "pi text-2xl pi-fw pi-sort-amount-up-alt",
    },
    {
      label: "Auto Configure ",
      icon: "pi text-2xl pi-fw pi-sort-amount-up-alt",
    },

    {
      label: "Configure ",
      icon: "pi text-2xl pi-fw pi-sort-amount-up-alt",
    },
    {
      label: "Create assets ",
      icon: "pi text-2xl pi-fw pi-sort-amount-up-alt",
    },
    {
      label: "Transmit assets ",
      icon: "pi text-2xl pi-fw pi-sort-amount-up-alt",
    },
  ];

const wizardItems2 = [
    {
      label: "Wblogin ",
      icon: "pi text-2xl pi-fw pi-sort-amount-up-alt",
    },
    {
      label: "Auto Configure ",
      icon: "pi text-2xl pi-fw pi-sort-amount-up-alt",
    },

    {
      label: "Configure ",
      icon: "pi text-2xl pi-fw pi-sort-amount-up-alt",
    },

    {
      label: "Createpair ",
      icon: "pi text-2xl pi-fw pi-sort-amount-up-alt",
    },


];

const ToggleOne = () => {
    if (activeone === 0) {
      return <Login />
    }
    if (activeone === 1) {
      return <Autoconfigure />
    }
    if (activeone === 2) {
      return <Centralbanksetup />
    }
    if (activeone === 3) {
      return <Createassets />
    }
    if (activeone === 4) {
      return <Transmitassets />
      //return <Createassets />
    }
  };

const ToggleTwo = () => {
    if (activetwo === 0) {
      return <Wblogin />
    }
    if (activetwo === 1) {
      return <Autoconfigurewb />
    //  return <Wbconfigure />
    }
    if (activetwo === 2) {
    //  return <Autoconfigurewb />
      return <Wbconfigure />
    }
    if (activetwo === 3) {
    //  return <Autoconfigurewb />
      return <Createpairname />
    }

  };

  return (
       <div className="grid p-fluid p-5">
        <div className="row-12  col-6 md:col-6 p-5">
          <div className="card card-w-title border-1 border-100 h-full">
	    <TabMenu
              model={wizardItems}
              activeIndex={activeone}
              onTabChange={(e) => setActiveone(e.index)}
              id={wizardItems.id}
              style={{ fontSize: "1.2rem" }}
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
            />

              {ToggleTwo()}

          </div>
        </div>
      </div>

  );
};

export default Devhome;
