import React, { useState, useEffect } from "react";

import WBOAtomicSellOB from "./AtomicOrderbook/WBOAtomicSellOB";
import { IssuanceServiceWBOB } from "./AtomicOrderbook/issuanceServiceWBOB";
import { TabMenu } from "primereact/tabmenu";
import WBOAtomicmarketDepth from "./AtomicOrderbook/WBOAtomicmarketDepth";

import WBOAtomicVolume from "./AtomicOrderbook/WBOAtomicVolume";
import WBOAtomicMatchHistory from "./AtomicOrderbook/WBOAtomicMatchHistory";
import PvpTradehistory from "./AtomicOrderbook/PvpTradehistory";
import PvpPlacedhistory from "./AtomicOrderbook/PvpPlacedhistory";
import Pvpsellproposals from "./AtomicOrderbook/Pvpsellproposals";
import Pvpbuyproposals from "./AtomicOrderbook/Pvpbuyproposals";
import WBOAtomicBuyOrder from "./AtomicOrderbook/WBOAtomicBuyOrder";
import PvpBuyorder from "./AtomicOrderbook/PvpBuyorder";
import WBOAtomicOpensellOrder from "./AtomicOrderbook/WBOAtomicOpensellOrder";
import WBOAtomicOpenbuyOrder from "./AtomicOrderbook/WBOAtomicOpenbuyOrder";
import WBOAtomicCompleted from "./AtomicOrderbook/WBOAtomicCompleted";
import WBOAtomicSellOrder from "./AtomicOrderbook/WBOAtomicSellOrder";
import PvpSellorder from "./AtomicOrderbook/PvpSellorder";
import WBOAtomicBuyOB from "./AtomicOrderbook/WBOAtomicBuyOB";
import { LoginService } from "../devlogin/LoginService";
import * as _ from "lodash";

import { useToken } from "../App/useToken";

const PvpAtomic = ({ data, setData }) => {
  const [currencies, setCurrencies] = useState([]);
  //const [testuser, setTestuser] = useState(theuser);
  const [pairs, setpairs] = useState("");
  const [firstcurrency, setFirstcurrency] = useState("");
  const [secondcurrency, setSecondcurrency] = useState("");
  const [chosenpair, setChosenpair] = useState("ABCD-DEFG");
  const [price, setprice] = useState([]);
  const [pastData, setpastData] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [transactionsplaced, setTransactionsplaced] = useState([]);
  const [transactionstraded, setTransactionstraded] = useState([]);
  const [sellData, setsellData] = useState([]);
  const [buyobData, setbuyobData] = useState([]);
  const [sellobData, setsellobData] = useState([]);
  const [allSellData, setallSellData] = useState([]);
  const [allBuyData, setallBuyData] = useState([]);

  const [orderplacedbuy, setOrderplacedbuy] = useState(false);
  const [orderplacedsell, setOrderplacedsell] = useState(false);
  const [activepvp, setActivepvp] = useState(0);
  const [activeone, setActiveone] = useState(0);
  const [activetwo, setActivetwo] = useState(0);
  const [activethree, setActivethree] = useState(0);
  const [activefour, setActivefour] = useState(0);
  const [activefive, setActivefive] = useState(0);
  const [activesix, setActivesix] = useState(0);
  const [fraction, setFraction] = useState({
    first: 1,
    second: 2,
  });
  // const text = data.assetid.label;

  const usetoken = new useToken();
  const [user, setUser] = useState(usetoken.getUser());

  const url = "https://sailsg1.thebsv.tech/atomicexchange/getpairs";
  let ratesURL = `https://api.exchangerate.host/latest?base=GBP&symbols=INR`;

  const loginservice = new LoginService();

  const issuanceservice = new IssuanceServiceWBOB();

  useEffect(() => {
    //  refresh();

    //    setUser(issuanceservice.getuser());
    console.log(user);
    //setChosenpair('CREA_CINR-CREA_USD');
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

      setCurrencies(filtered);
      let currencypair = pairs.map((cur, idx) => {
        return cur.pairname;
      });
      setChosenpair(currencypair[0]);
      setFirstcurrency(filtered[0].firstissuetype);
      setSecondcurrency(filtered[0].secondissuetype);
      setFraction({
        first: filtered[0].firstfraction,
        second: filtered[0].secondfraction,
      });

      // let amount = pairs.map((cur, idx) => {
      //   return cur.count;
      // });
      // setprice(amount);
    };

    apiCall();
  }, []);

  useEffect(() => {
    console.log(chosenpair);

    /*
    const fetchHistoricalData = async () => {
    let historicalDataURL = "https://sailsg1.thebsv.tech/atomicexchange/getbuyorders/"+chosenpair;
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
*/
    /*
    const fetchSellersData = async () => {
    let sellersURL = `https://sailsg1.thebsv.tech/atomicexchange/getsellorders/${chosenpair}`;
      let datasellArr = [];
      await fetch(sellersURL)
        .then((res) => res.json())
        .then((data) => (data?(datasellArr = data.sellsideorders): (datasellArr= [])));
      const last1 = datasellArr.slice(-10).sort((a, b) => {
        return a > b ? 1 : -1;
      });
      setsellData(last1);
    };
    fetchSellersData();
*/

    const fetchBuyOrderbookData = async () => {
      let buyobURL = `https://sailsg1.thebsv.tech/atomicexchange/getbuyorders/${chosenpair}`;
      let dataArr = [];
      let ordersArr = [];
      await fetch(buyobURL)
        .then((res) => res?.json())
        .then((data) =>
          data ? (dataArr = data.buysideorders) : (dataArr = [])
        );
      const last1 = dataArr.slice(-10).sort((a, b) => {
        return a > b ? 1 : -1;
      });

      setbuyobData(last1);
      setOrderplacedbuy(false);
    };

    fetchBuyOrderbookData();

    const fetchSellOrderbookData = async () => {
      let sellobURL = `https://sailsg1.thebsv.tech/atomicexchange/getsellorders/${chosenpair}`;
      let ordersArr = [];
      let dataArr = [];
      await fetch(sellobURL)
        .then((res) => res?.json())
        .then((data) =>
          data ? (dataArr = data.sellsideorders) : (dataArr = [])
        );

      const last1 = dataArr.slice(-10).sort((a, b) => {
        return a > b ? 1 : -1;
      });

      setsellobData(last1);
      setOrderplacedsell(false);
    };

    fetchSellOrderbookData();

    const fetchOrderstradedData = async () => {
      let ordersURL = `https://sailsg1.thebsv.tech/atomicexchange/getorders/${chosenpair}`;
      let transactionsURL =
        "https://sailsg1.thebsv.tech/atomicexchange/getordertradedtransactions/" +
        user.subcentralaccountnumber;
      let ordersArr = [];
      await fetch(transactionsURL)
        .then((res) => res.json())
        .then((data) => (ordersArr = data));

      const forsorting = _.uniqBy(ordersArr, "transactionid"); //json.transactions;
      var last = _.sortBy(forsorting, "updatedat"); //.reverse();
      /*
      const sorted1 = ordersArr;
      const last1 = sorted1
        .sort((a, b) => {
          return a > b ? -1 : 1;
        })
        .slice(0, 10); */
      // const sorted2 = ordersArr.sellsideorders;
      // const last2 = sorted2.slice(-10).sort((a, b) => {
      //   return a > b ? 1 : -1;
      // });
      // const last3 = last1.concat(last2);
      setTransactionstraded(last);
      // setallSellData(last2);
      // console.log(last3);
    };

    fetchOrderstradedData();

    const fetchOrdersplacedData = async () => {
      let ordersURL = `https://sailsg1.thebsv.tech/atomicexchange/getorders/${chosenpair}`;
      let transactionsURL =
        "https://sailsg1.thebsv.tech/atomicexchange/getorderplacedtransactions/" +
        user.subcentralaccountnumber;
      let ordersArr = [];
      await fetch(transactionsURL)
        .then((res) => res.json())
        .then((data) => (ordersArr = data));

      const forsorting = _.uniqBy(ordersArr, "transactionid"); //json.transactions;
      var last = _.sortBy(forsorting, "updatedat").reverse();
      /*
      const sorted1 = ordersArr;
      const last1 = sorted1
        .sort((a, b) => {
          return a > b ? -1 : 1;
        })
        .slice(0, 10);
	    */
      // const sorted2 = ordersArr.sellsideorders;
      // const last2 = sorted2.slice(-10).sort((a, b) => {
      //   return a > b ? 1 : -1;
      // });
      // const last3 = last1.concat(last2);
      setTransactionsplaced(last);
      // setallSellData(last2);
      // console.log(last3);
    };

    fetchOrdersplacedData();

    const fetchOrdersData = async () => {
      let ordersURL = `https://sailsg1.thebsv.tech/atomicexchange/getorders/${chosenpair}`;
      let transactionsURL =
        "https://sailsg1.thebsv.tech/atomicexchange/getordertransactions/" +
        user.subcentralaccountnumber;
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
      setTransactions(last1);
      // setallSellData(last2);
      // console.log(last3);
    };

    fetchOrdersData();
  }, [chosenpair, orderplacedbuy, orderplacedsell]);

  const handleSelect = (e) => {
    //setpairs(e);
    console.log(e.target.value);
    var thepair = e.target.value;
    setChosenpair(e.target.value);
    var selected = currencies.filter((xx) => {
      if (thepair == xx.pairname) {
        return true;
      }
    });

    console.log(selected[0]);
    if (selected[0]) {
      setFirstcurrency(selected[0].firstissuetype);
      setSecondcurrency(selected[0].secondissuetype);
      setFraction({
        first: selected[0].firstfraction, //filtered
        second: selected[0].secondfraction, //filtered
      });
    }
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
      return (
        <PvpPlacedhistory
          transactionsplaced={transactionsplaced}
          buy={pastData}
          sell={sellData}
          firstcurrency={firstcurrency}
          secondcurrency={secondcurrency}
          chosenpair={chosenpair}
        />
      );
    }
    if (activetwo === 1) {
      return (
        <PvpTradehistory
          transactionstraded={transactionstraded}
          buy={pastData}
          sell={sellData}
          firstcurrency={firstcurrency}
          secondcurrency={secondcurrency}
          chosenpair={chosenpair}
        />
      );
    }
  };

  const DisplayPvp = () => {
    if (activepvp === 0) {
      return (
        <Pvpbuyproposals
          user={user}
          buy={buyobData}
          sell={sellobData}
          firstcurrency={firstcurrency}
          secondcurrency={secondcurrency}
          chosenpair={chosenpair}
          setOrderplacedbuy={setOrderplacedbuy}
          setOrderplacedsell={setOrderplacedsell}
        />
      );
    }
    if (activepvp === 1) {
      return (
        <Pvpsellproposals
          user={user}
          buy={buyobData}
          sell={sellobData}
          firstcurrency={firstcurrency}
          secondcurrency={secondcurrency}
          chosenpair={chosenpair}
          setOrderplacedbuy={setOrderplacedbuy}
          setOrderplacedsell={setOrderplacedsell}
        />
      );
    }
  };

  const DisplayThree = () => {
    if (activethree === 0) {
      return <WBOAtomicBuyOB data={buyobData} chosenpair={chosenpair} />;
    } else if (activethree === 1) {
      return <WBOAtomicSellOB data={sellobData} chosenpair={chosenpair} />;
    }
  };

  const DisplayFour = () => {
    return <WBOAtomicCompleted data={allBuyData} chosenpair={chosenpair} />;
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
      return (
        <PvpBuyorder
          user={user}
          price={price}
          fraction={fraction}
          firstcurrency={firstcurrency}
          secondcurrency={secondcurrency}
          chosenpair={chosenpair}
          setOrderplacedbuy={setOrderplacedbuy}
        />
      );
    } else if (activefive === 1) {
      return (
        <PvpSellorder
          user={user}
          price={price}
          fraction={fraction}
          firstcurrency={firstcurrency}
          secondcurrency={secondcurrency}
          chosenpair={chosenpair}
          setOrderplacedsell={setOrderplacedsell}
        />
      );
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
      label: "PLACED ",
      icon: "pi pi-fw pi-box",
    },
    {
      label: "BI-SWAPS ",
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
  const pvpwizz = [
    {
      label: "Buy PVP",
      icon: "pi text-2xl pi-fw pi-sort-alt",
    },
    {
      label: "Sell PVP",
      icon: "pi text-2xl pi-fw pi-sort-alt",
    },
  ];

  return (
    <div class="grid pl-7">
      <div class="col-12 ">
        <div class="grid gap-4">
          <div class="card col-5 border-1 border-100 ">
            <TabMenu
              model={pvpwizz}
              id={wizardItems.id}
              activeIndex={activepvp}
              onTabChange={(e) => setActivepvp(e.index)}
              style={{ fontSize: "1.2rem" }}
            />
            {DisplayPvp()}
          </div>

          <div class="card col-3 border-1 border-100">
            <div class="flex border-1 border-300 bg-gray-800 card justify-content-between">
              {
                <select
                  name="currency"
                  className="px-1 bg-blue-600 border-round-xl border-none font-bold text-2xl "
                  value={chosenpair}
                  onChange={(e) => handleSelect(e)}
                >
                  {currencies.map((cur, idx) => {
                    return (
                      <option
                        key={idx}
                        className="p-1 bg-blue-600 border-round-lg  font-bold text-2xl "
                        value={cur.pairname}
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
            <h2 className=" py-4 text-center">P2P Bi-SWAP</h2>
            <p className="text-center text-xl pb-4 border-bottom-1">
              Use Intrasettle P2P Bi-SWAP allows swap of currencies between
              banks. It's safe and hassle free!
            </p>
            <p class="text-center text-lg">How it works</p>
            <div class="text-xl pl-6">
              <li>Choose the participant bank</li>
              <li>Propose swap </li>
              <li>The participant accepts the proposal </li>
              <li>The swap happens atomically </li>
            </div>
          </div>

          <div className="card col-5 border-1 border-100">
            <TabMenu
              model={dataItems}
              id={dataItems.id}
              activeIndex={activetwo}
              onTabChange={(e) => setActivetwo(e.index)}
              style={{ fontSize: "1.2rem" }}
            />

            {DisplayTwo()}
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

export default PvpAtomic;
