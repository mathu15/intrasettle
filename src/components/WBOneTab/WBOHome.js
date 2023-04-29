import React, { useState, useEffect } from "react";

import { TabMenu } from "primereact/tabmenu";

import WBTransferCBDC from "./HomeWBO/WBTransferCBDC";
import WBTransferforeign from "./HomeWBO/WBTransferforeign";
import WBRequestDVP from "./HomeWBO/WBRequestDVP";
import WBCBDCAssets from "./HomeWBO/WBCBDCAssets";
import WBBonds from "./HomeWBO/WBBonds";
import WBCbdcStates from "./HomeWBO/WBCbdcStates";
import WBMAC from "./HomeWBO/WBMAC";
import { WB01IssuanceService } from './HomeWBO/WB01IssuanceService';


const WBOHome = ({ data, setData }) => {
  const [activeone, setActiveone] = useState(0);
  const [activetwo, setActivetwo] = useState(0);
  const [activethree, setActivethree] = useState(0);
  const [accountowners, setAccountowners] = useState([]);
  const [transactionhappened, setTransactionhappened] = useState(false);


const issuanceservice = new WB01IssuanceService();

  useEffect(() => {
        issuanceservice.getaccountowners().then(data=> {
	var yy = data.list.filter(xx=> {
		 if(!(xx.centralenable == 'disabled' || xx.subenable == 'disabled')) return true;
		});
        setAccountowners(yy ) ;       
        });
  }, []);


  const DisplayOne = () => {
    if (activeone === 0) {
      return <WBTransferCBDC data={data} setData={setData} accountowners={accountowners}  setTransactionhappened={setTransactionhappened} />;
    } else if (activeone === 1) {
      return <WBTransferforeign data={data} setData={setData} accountowners={accountowners} setTransactionhappened={setTransactionhappened}  />;
    }
  };
  const DisplayTwo = () => {
    if (activetwo === 0) {
      return <WBCBDCAssets transactionhappened={transactionhappened}  />;
    } else if (activetwo === 1) {
      return <WBBonds data={data} setData={setData} />;
    }
  };
  const DisplayThree = () => {
    if (activethree === 0) {
      return <WBCbdcStates accountowners={accountowners} transactionhappened={transactionhappened} setTransactionhappened={setTransactionhappened} />;
    } else if (activethree === 1) {
      return <WBMAC data={data} setData={setData} />;
    }
  };

  const wizardItems = [
    {
      label: "TRANSFER CBDC",
      icon: "pi pi-fw pi-arrow-right-arrow-left",
    },

    {
      label: "FOREIGN TRANSFER",
      icon: "pi pi-fw pi-arrows-alt",
    },

  ];

  const dataItems = [
    {
      label: "CBDC ASSETS",
      icon: "pi pi-fw pi-dollar",
    },
/*
    {
      label: "BONDS",
      icon: "pi pi-fw pi-sun",
    },
*/
  ];

  const dataStates = [
    {
      label: "CBDC TRANSACTIONs",
      icon: "pi pi-fw pi-user",
    },
/*
    {
      label: "MEMBER ACCESS STATES",
      icon: "pi pi-fw pi-user",
    },
*/
  ];

  return (
    <>
      <div className="grid p-fluid p-5">
        <div className="row-12  col-6 md:col-6 p-5">
          <div className="  card card-w-title border-1 border-100  ">
            <TabMenu
              model={wizardItems}
              activeIndex={activeone}
              onTabChange={(e) => setActiveone(e.index)}
              style={{ fontSize: "1.2rem" }}
            />
            {DisplayOne()}
          </div>
        </div>
        <div className="row-12  col-12 md:col-6 p-5">
          <div className=" card card-w-title border-1 border-100 ">
            <TabMenu
              model={dataItems}
              activeIndex={activetwo}
              onTabChange={(e) => setActivetwo(e.index)}
              style={{ fontSize: "1.2rem" }}
            />
            {DisplayTwo()}
          </div>
        </div>
      </div>
      <div className="row-12  col-12  p-6">
        <div className="card card-w-title border-1 border-100 ">
          <TabMenu
            model={dataStates}
            activeIndex={activethree}
            onTabChange={(e) => setActivethree(e.index)}
            style={{ fontSize: "1.2rem" }}
          />
          {DisplayThree()}
        </div>
      </div>
    </>
  );
};

export default WBOHome;
