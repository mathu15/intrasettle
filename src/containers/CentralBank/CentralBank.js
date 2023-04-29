import React, { useState }  from "react";
import { NavLink, Route, useHistory } from "react-router-dom";
import { Menubar } from "primereact/menubar";
import { BsBank, BsGlobe2 } from "react-icons/bs";
import { TabMenu } from "primereact/tabmenu";
import { useToken } from "../../components/App/useToken";
import CBHome from "../../components/CBtabmenu/CBHome";
import CbdcManager from "../../components/CBtabmenu/CbdcManager";
import CbMenbercontrols from "../../components/CBtabmenu/CbMenbercontrols";
import CBIncomingRequest from "../../components/CBtabmenu/CBIncomingRequest";
import CBTreasuryDashboard from "../../components/CBtabmenu/CBTreasuryDashboard";
import CBMoneySwipeDash from "../../components/CBtabmenu/CBMoneySwipeDash";
import CBRefernceModal from "../../components/CBtabmenu/CBRefernceModal";
import CBVisiblity from "../../components/CBtabmenu/CBVisiblity";

const CentralBank = () => {
  const history = useHistory();
//  if(useToken.getUser().marker)
  const usetoken = new useToken();
  const [user, setUser] = useState(usetoken.getUser());

  const Redirectnonconfigured = () => {
     if(!user || user.marker == ''){
	     alert ("The system is not configured");
      history.push("/");
     }
  };

  const wizardItems = [
    {
      label: "HOME",
      icon: "pi text-2xl text-blue-500 pi-fw pi-th-large",
      command: () => history.push("/central-bank"),
    },
    {
      label: "CBDC MANAGER",
      icon: "pi text-2xl text-blue-500  pi-fw pi-dollar",
      command: () => history.push("/central-bank/cbdc-manager"),
    },
    {
      label: "MEMBER CONTROLS",
      icon: "pi text-2xl text-blue-500  pi-fw pi-cog",
      command: () => history.push("/central-bank/member-controls"),
    },
    {
      label: "INCOMING REQUESTS",
      icon: "pi text-2xl text-blue-500  pi-fw pi-download",
      command: () => history.push("/central-bank/incoming-requests"),
    },
    {
      label: "TREASURY DASHBOARD",
      icon: "pi text-2xl text-blue-500  pi-fw pi-chart-pie",
      command: () => history.push("/central-bank/treasury-dashboard"),
    },
    {
      label: "TRANSACTION DASHBOARD",
      icon: "pi text-2xl text-blue-500  pi-fw pi-book",
      command: () => history.push("/central-bank/moneyswipe-dashboard"),
    },
    {
      label: "TOPUP ISSUANCE",
      icon: "pi text-2xl text-blue-500  pi-fw pi-eye",
      command: () => history.push("/central-bank/visibility-reissuance"),
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
        // model={items.cbank}
        end={
          <>

     <NavLink to="/cb-login">
              <BsGlobe2 className="text-3xl mr-3 text-blue-500" />
              <span className="text-2xl text-white">
                The {user.organization} , powered by IntraSettle
              </span>
            </NavLink>


          </>
        }
        // style={{ fontSize: "1.4rem" }}
        className="pt-4 pb-4 layout-topbar"
      />
      <div className=" col-12  justify-content-around pt-8 pl-7">
        <TabMenu
          model={wizardItems}
          style={{ fontSize: "1.3rem" }}
          className="pt-4 pb-1 card text-xl"
          // , position: "fixed", zIndex: "10"
        />
      </div>
      <Route exact path={"/central-bank"} component={CBHome} />
      <Route path={"/central-bank/cbdc-manager"} component={CbdcManager} />
      <Route
        path={"/central-bank/member-controls"}
        component={CbMenbercontrols}
      />
      <Route
        path={"/central-bank/incoming-requests"}
        component={CBIncomingRequest}
      />
      <Route
        path={"/central-bank/treasury-dashboard"}
        component={CBTreasuryDashboard}
      />
      <Route
        path={"/central-bank/moneyswipe-dashboard"}
        component={CBMoneySwipeDash}
      />
      <Route
        path={"/central-bank/reference-modals"}
        component={CBRefernceModal}
      />
      <Route
        path={"/central-bank/visibility-reissuance"}
        component={CBVisiblity}
      />
    </div>
  );
};

export default CentralBank;
