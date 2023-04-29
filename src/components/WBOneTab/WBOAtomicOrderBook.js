import React, { useState, useEffect } from "react";

import WBOAtomicSellOB from "./AtomicOrderbook/WBOAtomicSellOB";
import { IssuanceServiceWBOB } from "./AtomicOrderbook/issuanceServiceWBOB";
import { TabMenu } from "primereact/tabmenu";
import WBOAtomicmarketDepth from "./AtomicOrderbook/WBOAtomicmarketDepth";

import WBOAtomicVolume from "./AtomicOrderbook/WBOAtomicVolume";
import WBOAtomicMatchHistory from "./AtomicOrderbook/WBOAtomicMatchHistory";
import WBOAtomicBuyOrder from "./AtomicOrderbook/WBOAtomicBuyOrder";
import WBOAtomicOpensellOrder from "./AtomicOrderbook/WBOAtomicOpensellOrder";
import WBOAtomicOpenbuyOrder from "./AtomicOrderbook/WBOAtomicOpenbuyOrder";
import WBOAtomicCompleted from "./AtomicOrderbook/WBOAtomicCompleted";
import WBOAtomicSellOrder from "./AtomicOrderbook/WBOAtomicSellOrder";
import WBOAtomicBuyOB from "./AtomicOrderbook/WBOAtomicBuyOB";
import { LoginService }  from '../devlogin/LoginService';

import { useToken }  from '../App/useToken';




const WBOAtomicOrderBook = ({ data, setData }) => {


  const [currencies, setcurrencies] = useState([]);
//  const [testuser, setTestuser] = useState(theuser);
  const [pairs, setpairs] = useState("");
  const [chosenpair, setChosenpair] = useState("ABCD-DEFG");
  const [price, setprice] = useState([]);
  const [pastData, setpastData] = useState([]);
  const [sellData, setsellData] = useState([]);
  const [buyobData, setbuyobData] = useState([]);
  const [sellobData, setsellobData] = useState([]);
  const [allSellData, setallSellData] = useState([]);
  const [allBuyData, setallBuyData] = useState([]);

  const [activeone, setActiveone] = useState(0);
  const [activetwo, setActivetwo] = useState(0);
  const [activethree, setActivethree] = useState(0);
  const [activefour, setActivefour] = useState(0);
  const [activefive, setActivefive] = useState(0);
  const [activesix, setActivesix] = useState(0);
  // const text = data.assetid.label;

const usetoken = new useToken();
  const [user, setUser] = useState(usetoken.getUser());

  const url = "https://sailsg1.thebsv.tech/atomicexchange/getpairs";
  let ratesURL = `https://api.exchangerate.host/latest?base=USD&symbols=INR`;

  const loginservice = new LoginService();

  const issuanceservice = new IssuanceServiceWBOB();
  
  useEffect(() => {

  //  refresh();

//    setUser(issuanceservice.getuser());
    console.log(user);
    setChosenpair('CREA_CINR-CREA_USD');

  }, []);

/*
  const refresh = async () => {

    const tokendata = await loginservice.getlatestuser();
      console.log(tokendata.user);
      if(tokendata.token) {
      //usetoken.saveToken(tokendata);
      const theuser = {
	      centralaccountnumber: tokendata.user.centralaccountnumber,
            entityaccountnumber: tokendata.user.entityaccountnumber,
            subcentralaccountnumber: tokendata.user.subcentralaccountnumber,
      };
      setTestuser(theuser );
      console.log(testuser);
      }
  }

*/
  useEffect(() => {

//    setpairs('Digital_USD-Digital_INR');
//    setpairs('CREA_CINR-CREA_CUSD');
    // let ratesURL = `https://api.exchangerate.host/latest?base=USD&symbols=INR`;
    const fetchRatesData = async () => {
      let ratesArr = [];
      await fetch(ratesURL)
        .then((res) => res.json())
        .then((data) => (ratesArr = data.rates.INR));

      setprice(ratesArr);
      console.log(ratesArr);
    };

    fetchRatesData();

    let pairs = [];

    const apiCall = async () => {
      await fetch(url)
        .then((res) => res.json())
        .then((data) => (pairs = data));

      let filtered = pairs.sort((a, b) => {
        if (a < b) {
          return -1;
        }
        if (a > b) {
          return 1;
        }
        return 0;
      });

      setcurrencies(filtered);
      let currencypair = pairs.map((cur, idx) => {
        return cur.pairname;
      });
      setpairs(currencypair);
      // let amount = pairs.map((cur, idx) => {
      //   return cur.count;
      // });
      // setprice(amount);
    };

    apiCall();
  }, []);

  useEffect(() => {
    console.log(chosenpair);
    let historicalDataURL = `https://sailsg1.thebsv.tech/atomicexchange/getbuyorders/${chosenpair}`;
    const fetchHistoricalData = async () => {
      let dataArr = [];
      await fetch(historicalDataURL)
        .then((res) => res.json())
        .then((data) => (dataArr = data.buysideorders));
      const last1 = dataArr.slice(-10).sort((a, b) => {
        return a > b ? 1 : -1;
      });

      setpastData(last1);
    };

    fetchHistoricalData();

    let sellersURL = `https://sailsg1.thebsv.tech/atomicexchange/getsellorders/${chosenpair}`;
    const fetchSellersData = async () => {
      let datasellArr = [];
      await fetch(sellersURL)
        .then((res) => res.json())
        .then((data) => (datasellArr = data.sellsideorders));

      const last1 = datasellArr.slice(-10).sort((a, b) => {
        return a > b ? 1 : -1;
      });

      setsellData(last1);
    };

    fetchSellersData();

    let buyobURL = `https://sailsg1.thebsv.tech/atomicexchange/getbuyorders/${chosenpair}`
    const fetchBuyOrderbookData = async () => {
      let dataArr = [];
      let ordersArr = [];
      await fetch(buyobURL)
        .then((res) => res?.json())
        .then((data) => (dataArr = data.buysideorders));
      const last1 = dataArr.slice(-10).sort((a, b) => {
        return a > b ? 1 : -1;
      });

 
      setbuyobData(last1);
    };

    fetchBuyOrderbookData();

      let sellobURL = `https://sailsg1.thebsv.tech/atomicexchange/getsellorders/${chosenpair}`
    const fetchSellOrderbookData = async () => {
      let ordersArr = [];
      let dataArr = [];
      await fetch(sellobURL)
        .then((res) => res?.json())
          .then((data) => (dataArr = data.sellsideorders));

      const last1 = dataArr.slice(-10).sort((a, b) => {
        return a > b ? 1 : -1;
      });


      setsellobData(last1);
    };

    fetchSellOrderbookData();



    let ordersURL = `https://sailsg1.thebsv.tech/atomicexchange/getorders/${chosenpair}`;
    let transactionsURL = "https://sailsg1.thebsv.tech/atomicexchange/getordertransactions/"+ user.subcentralaccountnumber ;
    const fetchOrdersData = async () => {
      let ordersArr = [];
      await fetch(transactionsURL)
        .then((res) => res.json())
        .then((data) => (ordersArr = data));
      const sorted1 = ordersArr;
      const last1 = sorted1
        .sort((a, b) => {
          return a > b ? -1 : 1;
        })
        .slice(0, 10);
      // const sorted2 = ordersArr.sellsideorders;
      // const last2 = sorted2.slice(-10).sort((a, b) => {
      //   return a > b ? 1 : -1;
      // });
      // const last3 = last1.concat(last2);
      setallBuyData(last1);
      // setallSellData(last2);
      // console.log(last3);
    };

    fetchOrdersData();
  }, [chosenpair]);

  const handleSelect = (e) => {
    setpairs(e.target.value);
    setChosenpair(e.target.value);
  };

  const DisplayOne = () => {
/*
    if (activeone === 0) {
      return <WBOAtomicmarketDepth buy={pastData} sell={sellData} />;
    } else if (activeone === 1) {
      return <WBOAtomicVolume buy={pastData} sell={sellData} />;
    }
*/
  };
  const DisplayTwo = () => {
    if (activetwo === 0) {
      return <WBOAtomicMatchHistory buy={pastData} sell={sellData} chosenpair={chosenpair} />;
    }
  };
  const DisplayThree = () => {
    if (activethree === 0) {
      return <WBOAtomicBuyOB data={buyobData}  chosenpair={chosenpair}/>;
    } else if (activethree === 1) {
      return <WBOAtomicSellOB data={sellobData}  chosenpair={chosenpair}/>;
    }
  };

  const DisplayFour = () => {
      return <WBOAtomicCompleted data={allBuyData}  chosenpair={chosenpair}/>;
/*
    if (activefour === 0) {
      return <WBOAtomicOpenbuyOrder data={pastData} />;
    } else if (activefour === 1) {
      return <WBOAtomicOpensellOrder data={pastData} />;
    } else if (activefour === 2) {
      return <WBOAtomicCompleted data={allBuyData} />;
    }
*/
  };

  const DisplayFive = () => {
    if (activefive === 0) {
      return <WBOAtomicBuyOrder price={price}  chosenpair={chosenpair}/>;
    } else if (activefive === 1) {
      return <WBOAtomicSellOrder price={price}  chosenpair={chosenpair}/>;
    }
  };

  const wizardItems = [
    {
      label: "MARKET DEPTH",
      icon: "pi pi-fw pi-arrow-right-arrow-left",
    },
    {
      label: "ORDER VOLUME",
      icon: "pi pi-fw pi-upload",
    },
  ];

  const dataItems = [
    {
      label: "MATCH HISTORY",
      icon: "pi pi-fw pi-box",
    },
  ];

  const dataStates = [
    {
      label: "BUY ORDERS",
      icon: "pi text-2xl pi-fw pi-sort-alt",
    },
    {
      label: "SELL ORDERS",
      icon: "pi text-2xl pi-fw pi-user",
    },
  ];

  const dataOrders = [
    {
      label: "COMPLETED ORDERS",
      icon: "pi text-2xl pi-fw pi-user",
    },
  ];

  const buySell = [
    {
      label: "BUY",
      icon: "pi text-2xl pi-fw pi-sort-alt",
    },
    {
      label: "SELL",
      icon: "pi text-2xl pi-fw pi-user",
    },
  ];

  return (
    <div class="grid pl-7">
      <div class="col-12 ">
        <div class="grid gap-4">
          <div class="card col-4 border-1 border-100 ">
            <TabMenu
              model={wizardItems}
              id={wizardItems.id}
              activeIndex={activeone}
              onTabChange={(e) => setActiveone(e.index)}
              style={{ fontSize: "1.2rem" }}
            />
            {DisplayOne()}
          </div>
          <div class="card col-4 border-1 border-100">
            <TabMenu
              model={dataItems}
              id={dataItems.id}
              activeIndex={activetwo}
              onTabChange={(e) => setActivetwo(e.index)}
              style={{ fontSize: "1.2rem" }}
            />

            {DisplayTwo()}
          </div>

          <div class="card col-3 border-1 border-100">
            <div class="flex border-1 border-300 bg-gray-800 card justify-content-between">
              {
                <select
                  name="currency"
                  className="px-1 bg-blue-600 border-round-xl border-none font-bold text-2xl "
                  value={chosenpair}
                  onChange={handleSelect}
                >
                  {currencies.map((cur, idx) => {
                    return (
                      <option
                        key={idx}
                        className="p-1 bg-blue-600 border-round-lg  font-bold text-2xl "
                        value={cur.id}
                      >
                        {cur.pairname}
                      </option>
                    );
                  })}
                </select>
              }

              {
                <h2 className="p-2 bg-blue-300 border-round-xl border-none font-bold text-2xl ">
                  {price}
                </h2>
              }
            </div>
            <h2 className=" py-4 text-center">P2P Markets</h2>
            <p className="text-center text-xl pb-4 border-bottom-1">
              Use Intrasettle P2P when you want to buy any currency to trade
              your currenct, or when you want to sell other currency and cash
              out to your currency. It's safe and hassle free!
            </p>
            <p class="text-center text-lg">How it works</p>
            <div class="text-xl pl-6">
              <li>Pay directly to participant bank</li>
              <li>Participant confirms the payment</li>
              <li>Amount transfered</li>
            </div>
          </div>
          <div className="card col-4 border-1 border-100">
            <TabMenu
              model={dataStates}
              id={dataStates.id}
              activeIndex={activethree}
              onTabChange={(e) => setActivethree(e.index)}
              style={{ fontSize: "1.2rem" }}
            />

            {DisplayThree()}
          </div>
          <div className="card col-4 border-1 border-100">
            <TabMenu
              model={dataOrders}
              id={dataOrders.id}
              activeIndex={activefour}
              onTabChange={(e) => setActivefour(e.index)}
              style={{ fontSize: "1.2rem" }}
            />

            {DisplayFour()}
          </div>

          <div className="card col-3 border-1 border-100">
            <TabMenu
              model={buySell}
              id={buySell.id}
              activeIndex={activefive}
              onTabChange={(e) => setActivefive(e.index)}
              style={{ fontSize: "1.2rem" }}
            />

            {DisplayFive()}
          </div>
        </div>
      </div>

      {/* <div class=" card col-4">
      <div class="flex flex-column card-container">
        {
          <select name="currency" value={pair} onChange={handleSelect}>
            {currencies.map((cur, idx) => {
              return (
                <option key={idx} value={cur.id}>
                  {cur.pairname}
                </option>
              );
            })}
          </select>
        }
        {<h2>{price}</h2>}
        <div class="w-full">
          <TabMenu
            model={buySell}
            id={buySell.id}
            activeIndex={activefive}
            onTabChange={(e) => setActivefive(e.index)}
            style={{ fontSize: '1.2rem' }}
          />
          {DisplayFive()}
        </div>
      </div>
    </div> */}
    </div>
  );
};

export default WBOAtomicOrderBook;
