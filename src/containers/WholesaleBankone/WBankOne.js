import React, { useState } from "react";
import { useToken } from "../../components/App/useToken";
import { BsBank } from "react-icons/bs";
import { NavLink, Route, useHistory } from "react-router-dom";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import items from "../../components/Header/Items";

import { TabMenu } from "primereact/tabmenu";
import WBOHome from "../../components/WBOneTab/WBOHome";
import WBOCbdcManager from "../../components/WBOneTab/WBOCbdcManager";
import WBOAccessControls from "../../components/WBOneTab/WBOAccessControls";
import WBORequests from "../../components/WBOneTab/WBORequests";
import WBOTreasury from "../../components/WBOneTab/WBOTreasury";

import WBOMoneySwipeTrans from "../../components/WBOneTab/WBOMoneySwipetrans";
import WBOFxTrade from "../../components/WBOneTab/WBOFxTrade";
import WBOOrderBook from "../../components/WBOneTab/WBOOrderBook";
import WBOAtomicOrderBook from "../../components/WBOneTab/WBOAtomicOrderBook";
import PvpAtomic from "../../components/WBOneTab/PvpAtomic";

const WBankOne = () => {
  const history = useHistory();
  const usetoken = new useToken();
  const [user, setUser] = useState(usetoken.getUser());

  const Redirectnonconfigured = () => {
    if (!user || user.marker == "") {
      alert("The system is not configured");
      history.push("/");
    }
  };

  const wizardItems = [
    {
      label: "HOME",
      icon: "pi text-2xl   text-yellow-600 pi-fw pi-th-large",
      command: () => history.push("/wholesale-bank-one"),
    },

    {
      label: "FX TRADE",
      icon: "pi text-2xl  text-yellow-600 pi-fw pi-desktop",
      command: () => history.push("/wholesale-bank-one/fx-trade"),
    },
    {
      label: "ORDER BOOK",
      icon: "pi text-2xl text-yellow-600  pi-fw pi-dollar",
      command: () => history.push("/wholesale-bank-one/order-book"),
    },
    {
      label: "ATOMIC ORDER BOOK",
      icon: "pi text-2xl text-yellow-600 pi-fw  pi-desktop",
      command: () => history.push("/wholesale-bank-one/atomic-order-book"),
    },
    {
      label: "BI SWAP ",
      icon: "pi text-2xl text-yellow-600  pi-fw pi-desktop",
      command: () => history.push("/wholesale-bank-one/pvp-bi-swap"),
    },

    {
      label: "MEMBER ACCESS",
      icon: "pi text-2xl  text-yellow-600 pi-fw pi-cog",
      command: () => history.push("/wholesale-bank-one/access-controls"),
    },
    {
      label: "TREASURY DASHBOARD",
      icon: "pi text-2xl  text-yellow-600 pi-fw pi-chart-pie",
      command: () => history.push("/wholesale-bank-one/treasury-dashboard"),
    },
  ];
  Redirectnonconfigured();

  return (
    <div>
      <Menubar
        start={
          <NavLink to="/">
            <img
              src={"https://intrasettle.com/static/img/intrasettle_white.svg"}
              alt="logo"
              style={{ width: "12rem" }}
            />
          </NavLink>
        }
        // model={items.wbone}
        end={
          <>
            <NavLink to="/wb-login">
              <BsBank className="text-3xl mr-3 text-yellow-600" />
              <span className="text-2xl text-white">
                The {user.organization} , powered by IntraSettle
              </span>
            </NavLink>
          </>
        }
        className="pt-4 pb-4 layout-topbar"
      />
      <div className=" col-12  justify-content-around pt-8 pl-7 ">
        <TabMenu
          model={wizardItems}
          activeIndex={0}
          // setActiveIndex={(e) => e.index}
          end={<Button label="noifications" icon="pi pi-bell" />}
          style={{ fontSize: "1.3rem" }}
          className="pt-4 pb-1 card text-xl"
        />
      </div>
      <Route exact path={"/wholesale-bank-one"} component={WBOHome} />
      <Route
        path={"/wholesale-bank-one/cbdc-manager"}
        component={WBOCbdcManager}
      />
      <Route path={"/wholesale-bank-one/fx-trade"} component={WBOFxTrade} />
      <Route path={"/wholesale-bank-one/order-book"} component={WBOOrderBook} />
      <Route
        path={"/wholesale-bank-one/atomic-order-book"}
        component={WBOAtomicOrderBook}
      />
      <Route path={"/wholesale-bank-one/pvp-bi-swap"} component={PvpAtomic} />

      <Route
        path={"/wholesale-bank-one/access-controls"}
        component={WBOAccessControls}
      />
      <Route path={"/wholesale-bank-one/requests"} component={WBORequests} />
      <Route
        path={"/wholesale-bank-one/treasury-dashboard"}
        component={WBOTreasury}
      />

      <Route
        path={"/wholesale-bank-one/corda-dashboard"}
        component={WBOMoneySwipeTrans}
      />
    </div>
  );
};

export default WBankOne;
